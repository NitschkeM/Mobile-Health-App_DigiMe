package com.inittsproject;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;

import me.digi.sdk.core.DigiMeClient;
import me.digi.sdk.core.errorhandling.DigiMeClientException;
import me.digi.sdk.core.errorhandling.SDKException;
import me.digi.sdk.core.SDKListener;
import me.digi.sdk.core.entities.CAAccounts;
import me.digi.sdk.core.entities.CAFileResponse;
import me.digi.sdk.core.entities.CAFiles;
import me.digi.sdk.core.internal.AuthorizationException;
import me.digi.sdk.core.session.CASession;

/**
 * Created by Oli on 29/11/2017.
 */

public class NativeBridge extends ReactContextBaseJavaModule implements SDKListener {
    private static final String TAG = "NativeBridge";
    // private static final String TAG = "ReactNative";

    public NativeBridge(ReactApplicationContext reactContext) {
        super(reactContext);

        try {
            DigiMeClient.checkClientInitialized();
        } catch (DigiMeClientException ex) {
            DigiMeClient.init(getCurrentActivity());
        }
        DigiMeClient.getInstance().addListener(this);
    }

    private void sendEvent(String eventName) {
        sendEvent(eventName, null);
    }

    private void sendEvent(String eventName, @Nullable String data) {
        super.getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }

    // https://facebook.github.io/react-native/docs/native-modules-android 
    // ReactContextBaseJaveModule requires that a method called getName is implemented.
    // The purpose of this method is to return the string name of the NativeModule which represents this class in JavaScript.
    // So here we will call this ToastExample so that we can access it through React.NativeModules.ToastExample in JavaScript.
    @Override
    public String getName() {
        return "NativeBridge";
    }

    // To expose a method to JavaScript a Java method must be annotated using @ReactMethod.
    // The return type of bridge methods is always void. React Native bridge is async, so the only
    // way to pass a result to JavaScript is by using callbacks or emitting events.
    @ReactMethod
    public void initSDK() {
        Log.d(TAG, "initSDK");
        if (getCurrentActivity() != null) {
            // 1. start authorization process.
            // The digi.me app will be opened at this point. onActivityResult method in MainActivity is required to get back into our app.
            // sessionCreated and authorizeSucceeded will be called if all goes well.
            DigiMeClient.getInstance().authorize(getCurrentActivity(), null);
        } else {
            Log.d(TAG, "initSDK: Can't Authorize - Current Activity not set");
        }
    }

    //
    // SDK LISTENER FUNCTIONS
    //
    // 2. A session with digi.me API has been initialized.
    public void sessionCreated(CASession session) {
        Log.d(TAG, "SessionCreated. Token: " + session.getSessionKey());
    }

    public void sessionCreateFailed(SDKException reason) {
        Log.d(TAG, "sessionCreateFailed. " + reason.getMessage());
    }
    // 3. A session with the digi.me app has been authorized.
    public void authorizeSucceeded(CASession session) {
        Log.d(TAG, "authorizeSucceeded. Token: " + session.getSessionKey());
        sendEvent("userAuthAccept");
    // 4. We can now request the fileList.
        DigiMeClient.getInstance().getFileList(null);
    }

    public void authorizeDenied(AuthorizationException reason) {
        Log.d(TAG, "authorizeDenied. Failed to authorize session; Reason " + reason.getThrowReason().name());
        sendEvent("userAuthReject");
    }

    public void authorizeFailedWithWrongRequestCode() {
        Log.d(TAG, "authorizeFailedWithWrongRequestCode.");
    }

//    // 5. We retrieved the fileList: It holds a list of fileIDs / fileNames.
//    public void clientRetrievedFileList(CAFiles files) {
//        Number downloaded = files.fileIds.size();
//        Log.d(TAG, "clientRetrievedFileList: downloaded "+downloaded+" files");
//    // 6. Use the fileIDs to request specific files.
//        for (final String fileId :files.fileIds) {
//            Log.d(TAG, "clientRetrievedFileList. getting JSON for fileId" + fileId);
//            DigiMeClient.getInstance().getFileJSON(fileId, null);
////            Log.d(TAG, "clientRetrievedFileList. getting Content for fileId" + fileId);
////            DigiMeClient.getInstance().getFileContent(fileId, null);
//        }
//    }

    // 5. We retrieved the fileList: It holds a list of fileIDs / fileNames.
    public void clientRetrievedFileList(CAFiles files) {
        Number downloaded = files.fileIds.size();
        ArrayList<String> healthAndFitnessIds = new ArrayList<>();
        Log.d(TAG, "clientRetrievedFileList: downloaded "+downloaded+" files");

        healthAndFitnessIds = removeIdsNotEqualToHealthAndFitness(files.fileIds);

        // 6. Use the fileIDs to request specific files.
        for (final String fileId : healthAndFitnessIds) {
            Log.d(TAG, "clientRetrievedFileList. getting JSON for fileId" + fileId);
            DigiMeClient.getInstance().getFileJSON(fileId, null);
//            Log.d(TAG, "clientRetrievedFileList. getting Content for fileId" + fileId);
//            DigiMeClient.getInstance().getFileContent(fileId, null);
        }
    }

    public void clientFailedOnFileList(SDKException reason) {
        Log.d(TAG, "clientFailedOnFileList. Failed to retrieve file list: " + reason.getMessage());
    }

    // 7. Retrieve Content here.
    public void contentRetrievedForFile(String fileId, CAFileResponse content) {
        Log.d(TAG, "contentRetrievedForFile: ");
    }
    // 7. Retrieve JSON here.
    public void jsonRetrievedForFile(String fileId, JsonElement content) {
        Log.d(TAG, "jsonRetrievedForFile. " + content.toString());
        String data = ((JsonObject) content).get("fileContent").toString();
        // 8. Send retrieved data back to JavaScript code.
        sendEvent("fileData", fileId + data);
    }

    public void contentRetrieveFailed(String fileId, SDKException reason) {
        Log.d(TAG, "contentRetrieveFailed. Failed to retrieve file content for file: " + fileId + "; Reason: " + reason);
    }

    public void accountsRetrieveFailed(SDKException var1) {
        Log.d(TAG, "accountsRetrieveFailed. " + var1.toString());
    }

    public void accountsRetrieved(CAAccounts var1) {
        Log.d(TAG, "accountsRetrieved. " + var1.toString());
    }



    private ArrayList<String> removeIdsNotEqualToHealthAndFitness(List<String> allFileIds){
        ArrayList<String> healthAndFitnessIds = new ArrayList<>();
        for(String fileId : allFileIds){
            int i = 0;
            while (fileId.charAt(i) != '_'){
                i++;
            }
            // TODO: Hardcoded serviceGroup ID (4). Assumes: There exists no other service group starting with 4 (41, 434, etc.)
            if (fileId.charAt(i+1) == '4'){
                healthAndFitnessIds.add(fileId);
            }
        }
        return healthAndFitnessIds;
    }


}