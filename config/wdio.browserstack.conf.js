import path from 'node:path';
import { config as shared, reportersComAmbiente } from './wdio.shared.conf.js';

// Localmente lê as credenciais do .env. No CI elas vêm dos secrets do GitHub.
try {
    process.loadEnvFile();
} catch {
    // Sem .env: segue com as variáveis de ambiente já existentes
}

const DISPOSITIVO = process.env.BS_DEVICE_NAME || 'Google Pixel 8';
const VERSAO_ANDROID = process.env.BS_PLATFORM_VERSION || '14.0';

export const config = {
    ...shared,

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',

    services: [
        ['browserstack', {
            app: path.resolve('apps/android.wdio.native.app.v1.0.8.apk'),
            browserstackLocal: false,
        }],
    ],

    capabilities: [{
        platformName: 'android',
        'appium:deviceName': DISPOSITIVO,
        'appium:platformVersion': VERSAO_ANDROID,
        'appium:automationName': 'UiAutomator2',
        'appium:autoGrantPermissions': true,
        'bstack:options': {
            projectName: 'Desafio Mobile Verity',
            buildName: `native-demo-app - Android real - ${new Date().toLocaleDateString('pt-BR')}`,
            debug: true,
        },
    }],

    reporters: reportersComAmbiente({
        Plataforma: 'Android (dispositivo real)',
        Versao_Android: VERSAO_ANDROID,
        Dispositivo: DISPOSITIVO,
        Automacao: 'BrowserStack App Automate + UiAutomator2',
        App: 'native-demo-app v1.0.8',
    }),
};