import { expect } from 'chai';
import FormsPage from '../pageobjects/forms.page.js';
import Alerta from '../pageobjects/alert.page.js';
import { carregarDados } from '../data/carregar-dados.js';

const opcoesDropdown = carregarDados('dropdown.json');

describe('Preenchimento de formulários', () => {
    beforeEach(async () => {
        await FormsPage.abrir();
    });

    it('CT07 - deve exibir no resultado o texto digitado', async () => {
        const texto = 'Rondon QA Verity';

        await FormsPage.digitarTexto(texto);

                expect(await FormsPage.obterTextoDigitado()).to.equal(texto);
    });

    it('CT08 - deve ligar e desligar o switch', async () => {
        expect(await FormsPage.obterTextoInterruptor()).to.equal('Click to turn the switch ON');

        await FormsPage.alternarInterruptor();
        expect(await FormsPage.obterTextoInterruptor()).to.equal('Click to turn the switch OFF');

        await FormsPage.alternarInterruptor();
        expect(await FormsPage.obterTextoInterruptor()).to.equal('Click to turn the switch ON');
    });

    opcoesDropdown.forEach((opcao) => {
        it(`CT09 - deve selecionar a opção "${opcao}" no dropdown`, async () => {
            await FormsPage.selecionarOpcao(opcao);

            expect(await FormsPage.obterOpcaoSelecionada()).to.equal(opcao);
        });
    });

    it('CT10 - botão Active deve abrir alerta e Inactive não deve reagir', async () => {
        await FormsPage.clicarBotaoAtivo();
        expect(await Alerta.obterTitulo()).to.equal('This button is');
        expect(await Alerta.obterMensagem()).to.equal('This button is active');
        await Alerta.fechar();

        await FormsPage.clicarBotaoInativo();
        expect(await Alerta.estaAberto(2000),
            'O botão Inactive não deveria abrir alerta').to.equal(false);
    });
});