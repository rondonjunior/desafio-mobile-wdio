import BasePage from './base.page.js';
import TabBar from './tabbar.page.js';

class FormsPage extends BasePage {
    get campoTexto() { return $('~text-input'); }
    get resultadoTexto() { return $('~input-text-result'); }
    get interruptor() { return $('~switch'); }
    get textoInterruptor() { return $('~switch-text'); }
    get dropdown() { return $('~Dropdown'); }
    get botaoAtivo() { return $('~button-Active'); }
    get botaoInativo() { return $('~button-Inactive'); }

    get valorDropdown() {
        return driver.isIOS
            ? $('-ios class chain:**/XCUIElementTypeOther[`name == "Dropdown"`]/**/XCUIElementTypeTextField')
            : $('//*[@content-desc="Dropdown"]//android.widget.EditText');
    }

    opcaoDropdown(texto) {
        return $(`android=new UiSelector().text("${texto}")`);
    }

    async abrir() {
        await TabBar.abrirAba('Forms');
    }

    async digitarTexto(texto) {
        await this.digitar(this.campoTexto, texto);
        await this.esconderTeclado();
    }

    async obterTextoDigitado() {
        return this.obterTexto(this.resultadoTexto);
    }

    async alternarInterruptor() {
        await this.clicar(this.interruptor);
    }

    async obterTextoInterruptor() {
        return this.obterTexto(this.textoInterruptor);
    }

    async selecionarOpcao(texto) {
        await this.clicar(this.dropdown);
        if (driver.isIOS) {
            const roleta = $('-ios class chain:**/XCUIElementTypePickerWheel');
            await this.esperarElemento(roleta);
            await roleta.addValue(texto);
            await this.clicar($('~done_button'));
        } else {
            await this.clicar(this.opcaoDropdown(texto));
        }
    }

    async obterOpcaoSelecionada() {
        return this.obterTexto(this.valorDropdown);
    }

    async clicarBotaoAtivo() {
        await this.clicar(this.botaoAtivo);
    }

    async clicarBotaoInativo() {
        await this.clicar(this.botaoInativo);
    }
}

export default new FormsPage();