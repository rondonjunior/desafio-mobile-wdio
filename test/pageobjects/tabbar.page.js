import BasePage from './base.page.js';

// Cada aba do menu e o "crachá" da tela que ela abre
const TELAS = {
    Home: 'Home-screen',
    Login: 'Login-screen',
    Forms: 'Forms-screen',
    Swipe: 'Swipe-screen',
    Drag: 'Drag-drop-screen',
};

class TabBarPage extends BasePage {
    aba(nome) {
        return $(`~${nome}`);
    }

    tela(nome) {
        return $(`~${TELAS[nome]}`);
    }

    get nomesDasAbas() {
        return Object.keys(TELAS);
    }

    async abrirAba(nome) {
        await this.clicar(this.aba(nome));
        await this.esperarElemento(this.tela(nome));
    }

    async telaEstaVisivel(nome) {
        return this.estaVisivel(this.tela(nome));
    }
}

export default new TabBarPage();