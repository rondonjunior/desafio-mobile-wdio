import { expect } from 'chai';
import LoginPage from '../pageobjects/login.page.js';
import Alerta from '../pageobjects/alert.page.js';
import { carregarDados } from '../data/carregar-dados.js';

const loginsInvalidos = carregarDados('login-invalido.json');
const cadastrosInvalidos = carregarDados('cadastro-invalido.json');

describe('Login e Cadastro', () => {
    beforeEach(async () => {
        await LoginPage.abrir();
    });

    it('CT01 - deve fazer login com credenciais válidas', async () => {
        await LoginPage.fazerLogin('rondon.qa@teste.com', 'Senha@123');

        expect(await Alerta.obterTitulo()).to.equal('Success');
        expect(await Alerta.obterMensagem()).to.equal('You are logged in!');

        await Alerta.fechar();
    });

    loginsInvalidos.forEach(({ cenario, email, senha, mensagemEsperada }) => {
        it(`CT02 - não deve logar com ${cenario}`, async () => {
            await LoginPage.fazerLogin(email, senha);

            expect(await LoginPage.mensagemDeErroVisivel(mensagemEsperada),
                `Deveria exibir: "${mensagemEsperada}"`).to.equal(true);
            expect(await Alerta.estaAberto(2000),
                'Não deveria abrir o alerta de sucesso').to.equal(false);
        });
    });
    
    it('CT03 - deve cadastrar com dados válidos', async () => {
        await LoginPage.fazerCadastro('rondon.novo@teste.com', 'Senha@123', 'Senha@123');

        expect(await Alerta.obterTitulo()).to.equal('Signed Up!');
        expect(await Alerta.obterMensagem()).to.equal('You successfully signed up!');

        await Alerta.fechar();
    });

    cadastrosInvalidos.forEach(({ cenario, email, senha, confirmacao, mensagemEsperada }) => {
        it(`CT04 - não deve cadastrar com ${cenario}`, async () => {
            await LoginPage.fazerCadastro(email, senha, confirmacao);

            expect(await LoginPage.mensagemDeErroVisivel(mensagemEsperada),
                `Deveria exibir: "${mensagemEsperada}"`).to.equal(true);
            expect(await Alerta.estaAberto(2000),
                'Não deveria abrir o alerta de sucesso').to.equal(false);
        });
    });

    it('CT05 - deve alternar entre as abas Login e Sign up', async () => {
        await LoginPage.alternarParaCadastro();
        expect(await LoginPage.estaVisivel(LoginPage.campoConfirmarSenha),
            'No Sign up deveria ter o campo de confirmar senha').to.equal(true);

        await LoginPage.alternarParaLogin();
        expect(await LoginPage.estaVisivel(LoginPage.campoConfirmarSenha, 2000),
            'No Login não deveria ter o campo de confirmar senha').to.equal(false);
        expect(await LoginPage.estaVisivel(LoginPage.botaoLogin),
            'No Login deveria ter o botão LOGIN').to.equal(true);
    });
});