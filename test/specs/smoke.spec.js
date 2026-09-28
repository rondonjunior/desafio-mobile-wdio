import { expect } from 'chai';

describe('Smoke', () => {
    it('deve abrir o app na tela Home', async () => {
        const home = await $('~Home-screen');
        await home.waitForDisplayed({ timeout: 30000 });

        expect(await home.isDisplayed()).to.equal(true);
    });
});