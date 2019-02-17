package com.inittsproject;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Oli on 29/11/2017.
 */
public class NativeBridgePackage implements ReactPackage {

    // Note: This class is basically identical to the one in the ToastExample below:
    // https://facebook.github.io/react-native/docs/native-modules-android
    // The last step within Java is t oregister the Module; this happens in the 
    // createNativeModules method of your apps package.

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new NativeBridge(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}