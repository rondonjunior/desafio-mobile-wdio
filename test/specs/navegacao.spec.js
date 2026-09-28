import { expect } from 'chai';
import TabBar from '../pageobjects/tabbar.page.js';

describe('Navegação entre telas', () => {
    it('CT06 - deve navegar por todas as abas do menu inferior', async () => {
        for (const aba of TabBar.nomesDasAbas) {
            await TabBar.abrirAba(aba);

            expect(await TabBar.telaEstaVisivel(aba), `A tela ${aba} deveria estar visível`)
                .to.equal(true);
        }
    });
});