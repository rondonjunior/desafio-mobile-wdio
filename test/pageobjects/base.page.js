export default class BasePage {
    /**
     * Espera o elemento ficar visível na tela
     */
    async esperarElemento(elemento, timeout = 15000) {
        await elemento.waitForDisplayed({ timeout });
        return elemento;
    }

    /**
     * Espera o elemento e clica nele
     */
    async clicar(elemento) {
        await this.esperarElemento(elemento);
        await elemento.click();
    }

    /**
     * Espera o campo, limpa e digita o texto
     */
    async digitar(elemento, texto) {
        await this.esperarElemento(elemento);
        await elemento.setValue(texto);
    }

    /**
     * Espera o elemento e devolve o texto dele
     */
    async obterTexto(elemento) {
        await this.esperarElemento(elemento);
        return elemento.getText();
    }

    /**
     * Responde true/false se o elemento aparece, sem quebrar o teste
     */
    async estaVisivel(elemento, timeout = 5000) {
        try {
            await elemento.waitForDisplayed({ timeout });
            return true;
        } catch {
            return false;
        }
    }
    async esconderTeclado() {
        if (await driver.isKeyboardShown()) {
            await driver.hideKeyboard();
        }
    }
}