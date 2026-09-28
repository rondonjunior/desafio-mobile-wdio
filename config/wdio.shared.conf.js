import fs from 'node:fs';
import path from 'node:path';

export const config = {
    runner: 'local',
    specs: ['../test/specs/**/*.spec.js'],
    maxInstances: 1,

    logLevel: 'info',
    outputDir: './logs',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true,
        }],
    ],

    // Antes de tudo: limpa resultados antigos pra cada execução começar do zero
    onPrepare: function () {
        for (const pasta of ['allure-results', 'screenshots']) {
            fs.rmSync(pasta, { recursive: true, force: true });
        }
    },

    // Depois de cada teste: tira um screenshot (passou ou falhou)
    afterTest: async function (test, context, { passed }) {
        const status = passed ? 'PASSOU' : 'FALHOU';
        const nome = `${test.parent} ${test.title}`
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .trim().replace(/\s+/g, '_');

        fs.mkdirSync('screenshots', { recursive: true });
        await browser.saveScreenshot(path.join('screenshots', `${status}_${nome}.png`));
    },
};