import BasePage from './base.page.js';

class AlertPage extends BasePage {
    get titulo() {
        return driver.isIOS
            ? $('-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[1]')
            : $('id=android:id/alertTitle');
    }

    get mensagem() {
        return driver.isIOS
            ? $('-ios class chain:**/XCUIElementTypeAlert/**/XCUIElementTypeStaticText[2]')
            : $('id=android:id/message');
    }

    get botaoOk() {
        return driver.isIOS ? $('~OK') : $('id=android:id/button1');
    }

    async obterTitulo() {
        return this.obterTexto(this.titulo);
    }

    async obterMensagem() {
        return this.obterTexto(this.mensagem);
    }

    async estaAberto(timeout = 5000) {
        return this.estaVisivel(this.titulo, timeout);
    }

    async fechar() {
        await this.clicar(this.botaoOk);
    }
}

export default new AlertPage();