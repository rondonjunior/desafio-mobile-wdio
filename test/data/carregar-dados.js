import fs from 'node:fs';

/**
 * Lê um arquivo JSON da pasta test/data e devolve o conteúdo
 */
export function carregarDados(arquivo) {
    const caminho = new URL(`./${arquivo}`, import.meta.url);
    return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
}