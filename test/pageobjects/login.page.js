import BasePage from './base.page.js';
import TabBar from './tabbar.page.js';

class LoginPage extends BasePage {
    get abaLogin() { return $('~button-login-container'); }
    get abaCadastro() { return $('~button-sign-up-container'); }
    get campoEmail() { return $('~input-email'); }
    get campoSenha() { return $('~input-password'); }
    get campoConfirmarSenha() { return $('~input-repeat-password'); }
    get botaoLogin() { return $('~button-LOGIN'); }
    get botaoCadastrar() { return $('~button-SIGN UP'); }

    async abrir() {
        await TabBar.abrirAba('Login');
        await this.alternarParaLogin();
    }

    async alternarParaLogin() {
        await this.clicar(this.abaLogin);
        await this.esperarElemento(this.botaoLogin);
    }

    async alternarParaCadastro() {
        await this.clicar(this.abaCadastro);
        await this.esperarElemento(this.botaoCadastrar);
    }

    async fazerLogin(email, senha) {
        await this.digitar(this.campoEmail, email);
        await this.digitar(this.campoSenha, senha);
        await this.esconderTeclado();
        await this.clicar(this.botaoLogin);
    }

    async fazerCadastro(email, senha, confirmacao) {
        await this.alternarParaCadastro();
        await this.digitar(this.campoEmail, email);
        await this.digitar(this.campoSenha, senha);
        await this.digitar(this.campoConfirmarSenha, confirmacao);
        await this.esconderTeclado();
        await this.clicar(this.botaoCadastrar);
    }
    mensagemDeErro(texto) {
        return driver.isIOS
            ? $(`-ios predicate string:label == "${texto}"`)
            : $(`android=new UiSelector().text("${texto}")`);
    }

    async mensagemDeErroVisivel(texto) {
        return this.estaVisivel(this.mensagemDeErro(texto));
    }
    async esconderTeclado() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }
}

export default new LoginPage();