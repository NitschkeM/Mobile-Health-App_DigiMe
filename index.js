/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry, EventEmitter, NativeEventEmitter, NativeModules } from 'react-native';

import Events from './src/events/Events';
// import { Router } from './src/routing/Router';
import { MyAppContainer } from './src/routing/Router';

const { NativeBridge } = NativeModules;
// const emitter: EventEmitter = new NativeEventEmitter(NativeBridge);
const emitter = new NativeEventEmitter(NativeBridge);

// const logEvent = (event: string): void => {
const logEvent = (event) => {
    console.log(`event: ${event}`);
}

// const init = (): void => {
const init = () => {
    /**
     * bridge event listeners
     */
    // emitter.addListener(Events.FILE_DATA, (data: any) => logEvent(Events.FILE_DATA));
    emitter.addListener(Events.FILE_DATA, (data) => logEvent(Events.FILE_DATA));
    emitter.addListener(Events.USER_AUTH_ACCEPT, () => logEvent(Events.USER_AUTH_ACCEPT));
    emitter.addListener(Events.USER_AUTH_REJECT, () => logEvent(Events.USER_AUTH_ACCEPT));

    // AppRegistry.registerComponent('CAExample', () => Router);
    // AppRegistry.registerComponent(appName, () => Router);
    AppRegistry.registerComponent(appName, () => MyAppContainer);
};

init();