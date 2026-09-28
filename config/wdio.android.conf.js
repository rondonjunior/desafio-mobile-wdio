import path from 'node:path';
import { config as shared } from './wdio.shared.conf.js';

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
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel_7_API_34',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14',
        'appium:app': path.resolve('apps/android.wdio.native.app.v1.0.8.apk'),
        'appium:appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'appium:autoGrantPermissions': true,
        'appium:newCommandTimeout': 240,
    }],

    // Reaproveita o Allure da base e acrescenta as informações do ambiente
    reporters: shared.reporters.map((reporter) =>
        Array.isArray(reporter) && reporter[0] === 'allure'
            ? ['allure', {
                ...reporter[1],
                reportedEnvironmentVars: {
                    Plataforma: 'Android',
                    Versao_Android: process.env.ANDROID_PLATFORM_VERSION || '14',
                    Dispositivo: process.env.ANDROID_DEVICE_NAME || 'Pixel_7_API_34',
                    Automacao: 'Appium 3 + UiAutomator2',
                    App: 'native-demo-app v1.0.8',
                    Node: process.version,
                },
            }]
            : reporter
    ),
};