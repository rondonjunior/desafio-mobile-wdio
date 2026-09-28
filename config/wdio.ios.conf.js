import path from 'node:path';
import { config as shared, reportersComAmbiente } from './wdio.shared.conf.js';

// Execução em simulador iOS: requer macOS com Xcode e o driver XCUITest instalado
const DISPOSITIVO = process.env.IOS_DEVICE_NAME || 'iPhone 15';
const VERSAO_IOS = process.env.IOS_PLATFORM_VERSION || '17.5';

export const config = {
    ...shared,

    port: 4723,
    services: [
        ['appium', {
            args: { relaxedSecurity: true },
        }],
    ],

    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': DISPOSITIVO,
        'appium:platformVersion': VERSAO_IOS,
        'appium:app': path.resolve('apps/ios.simulator.wdio.native.app.v1.0.8.zip'),
        'appium:newCommandTimeout': 240,
    }],

    reporters: reportersComAmbiente({
        Plataforma: 'iOS',
        Versao_iOS: VERSAO_IOS,
        Dispositivo: DISPOSITIVO,
        Automacao: 'Appium 3 + XCUITest',
        App: 'native-demo-app v1.0.8',
    }),
};