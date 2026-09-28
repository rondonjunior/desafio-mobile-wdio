import fs from 'node:fs';
import path from 'node:path';

const VERSAO = 'v1.0.8';
const ARQUIVO = `android.wdio.native.app.${VERSAO}.apk`;
const URL = `https://github.com/webdriverio/native-demo-app/releases/download/${VERSAO}/${ARQUIVO}`;
const DESTINO = path.resolve('apps', ARQUIVO);

if (fs.existsSync(DESTINO)) {
    console.log(`App ja existe em: ${DESTINO}`);
    process.exit(0);
}

fs.mkdirSync(path.dirname(DESTINO), { recursive: true });
console.log(`Baixando o app de: ${URL}`);

const resposta = await fetch(URL);
if (!resposta.ok) {
    console.error(`Falha no download: HTTP ${resposta.status}`);
    process.exit(1);
}

const conteudo = Buffer.from(await resposta.arrayBuffer());
fs.writeFileSync(DESTINO, conteudo);
console.log(`App salvo em: ${DESTINO} (${(conteudo.length / 1024 / 1024).toFixed(1)} MB)`);