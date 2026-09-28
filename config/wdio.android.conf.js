import path from 'node:path';
import { config as shared, reportersComAmbiente } from './wdio.shared.conf.js';

const DISPOSITIVO = process.env.ANDROID_DEVICE_NAME || 'Pixel_7_API_34';
const VERSAO_ANDROID = process.env.ANDROID_PLATFORM_VERSION || '14';

export const config = {
    ...shared,

    port: 4723,
    services: [
        ['appium', {
            args: { relaxedSecurity: true },
        }],
    ],

    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': DISPOSITIVO,
        'appium:platformVersion': VERSAO_ANDROID,
        'appium:app': path.resolve('apps/android.wdio.native.app.v1.0.8.apk'),
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
    }],

    reporters: reportersComAmbiente({
        Plataforma: 'Android',
        Versao_Android: VERSAO_ANDROID,
        Dispositivo: DISPOSITIVO,
        Automacao: 'Appium 3 + UiAutomator2',
        App: 'native-demo-app v1.0.8',
    }),
};