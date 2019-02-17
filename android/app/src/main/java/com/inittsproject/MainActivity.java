package com.inittsproject;

import com.facebook.react.ReactActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

import com.facebook.react.shell.MainReactPackage;

import me.digi.sdk.core.DigiMeClient;


// For react-navigation & react-native-gesture-handler: https://reactnavigation.org/docs/en/getting-started.html 
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


// Trying to .addPackage here, instead of returning from getPackages in a MainApplication.java file.
// Works
// import com.horcrux.svg.SvgPackage;



public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "InitTSProject";
    }

    // DigiMe: Since authorize() automatically calls into digi.me app, you'll need
    // some way of handling
    // the switch back to your app. You will accomplish this by overriding
    // onActivityResult for your Activity.
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        DigiMeClient.getInstance().getAuthManager().onActivityResult(requestCode, resultCode, data);
    }

    // For react-navigation & react-native-gesture-handler:
    // https://reactnavigation.org/docs/en/getting-started.html
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

}


// public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
//     private ReactRootView reactRootView;
//     private ReactInstanceManager reactInstanceManager;

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);

//         reactRootView = new ReactRootView(this);
//         reactInstanceManager = ReactInstanceManager.builder()
//                 .setApplication(getApplication())
//                 .setBundleAssetName("index.android.bundle")

//                 .setJSMainModulePath("./dist/index")
//                 .addPackage(new MainReactPackage())
//                 .addPackage(new NativeBridgePackage())
//                 .addPackage(new SvgPackage())
//                 .setUseDeveloperSupport(BuildConfig.DEBUG)
                
//                 .setInitialLifecycleState(LifecycleState.RESUMED)
//                 .build();

//         reactRootView.startReactApplication(reactInstanceManager, "CAExample");
//         setContentView(reactRootView);
//     }

//     @Override
//     public void onActivityResult(int requestCode, int resultCode, Intent data) {
//         super.onActivityResult(requestCode, resultCode, data);
//         DigiMeClient.getInstance().getAuthManager().onActivityResult(requestCode, resultCode, data);
//     }

//     @Override
//     public void invokeDefaultOnBackPressed() {
//         super.onBackPressed();
//     }

//     @Override
//     protected void onPause() {
//         super.onPause();
//         if (reactInstanceManager != null) {
//             reactInstanceManager.onHostPause(this);
//         }
//     }

//     @Override
//     protected void onResume() {
//         super.onResume();
//         if (reactInstanceManager != null) {
//             reactInstanceManager.onHostResume(this, this);
//         }
//     }

//     @Override
//     protected void onDestroy() {
//         super.onDestroy();
//         if (reactInstanceManager != null) {
//             reactInstanceManager.onHostDestroy(this);
//         }
//         if (reactRootView != null) {
//             reactRootView.unmountReactApplication();
//         }
//     }
//     @Override
//     public void onBackPressed() {
//         if (reactInstanceManager != null) {
//             reactInstanceManager.onBackPressed();
//         } else {
//             super.onBackPressed();
//         }
//     }
// }



