# Desafio de Automação de Testes Mobile

[![Testes Mobile](https://github.com/rondonjunior/desafio-mobile-wdio/actions/workflows/testes-mobile.yml/badge.svg)](https://github.com/rondonjunior/desafio-mobile-wdio/actions/workflows/testes-mobile.yml)

Automação de testes do [native-demo-app](https://github.com/webdriverio/native-demo-app) (v1.0.8) do WebdriverIO, com 10 cenários cobrindo login, cadastro, navegação, formulários e mensagens de erro. Os testes rodam em emulador Android, em dispositivo Android real no BrowserStack e estão configurados para simulador iOS.

## Stack

| Ferramenta | Uso no projeto |
|---|---|
| JavaScript (Node.js 24) | Linguagem |
| WebdriverIO 9 | Framework de automação |
| Appium 3 + UiAutomator2 / XCUITest | Comunicação com Android e iOS |
| Mocha | Organização e execução dos testes |
| Chai | Asserts |
| Allure Report | Relatório com resumo, passos, screenshots, logs e ambiente |
| BrowserStack App Automate | Execução em dispositivo real |
| GitHub Actions e GitLab CI/CD | Integração contínua |

## Cenários de teste

| ID | Cenário | Tipo |
|---|---|---|
| CT01 | Login com credenciais válidas | Login |
| CT02 | Login inválido (3 variações vindas de JSON) | Login / Mensagens de erro |
| CT03 | Cadastro com dados válidos | Cadastro |
| CT04 | Cadastro inválido (3 variações vindas de JSON) | Cadastro / Mensagens de erro |
| CT05 | Alternar entre as abas Login e Sign up | Navegação |
| CT06 | Navegar por todas as abas do menu inferior | Navegação |
| CT07 | Texto digitado aparece no campo de resultado | Formulário |
| CT08 | Ligar e desligar o switch | Formulário |
| CT09 | Selecionar cada opção do dropdown (3 variações vindas de JSON) | Formulário |
| CT10 | Botão Active abre alerta e Inactive não reage | Formulário |

Os 10 cenários geram 16 execuções, porque CT02, CT04 e CT09 são data-driven: cada linha do JSON em `test/data` vira um teste. Para adicionar um caso novo, basta incluir uma linha no arquivo, sem mexer no código.

## Estrutura do projeto

```
├── .github/workflows/testes-mobile.yml   Pipeline do GitHub Actions
├── .gitlab-ci.yml                        Pipeline equivalente para GitLab
├── config/
│   ├── wdio.shared.conf.js               Configuração comum (Mocha, Allure, screenshots)
│   ├── wdio.android.conf.js              Emulador Android
│   ├── wdio.ios.conf.js                  Simulador iOS
│   └── wdio.browserstack.conf.js         Dispositivo real no BrowserStack
├── scripts/download-app.js               Baixa o app automaticamente antes dos testes
└── test/
    ├── data/                             Massas de dados em JSON
    ├── pageobjects/                      Page Objects (elementos e ações de cada tela)
    └── specs/                            Cenários de teste
```

Os Page Objects herdam de uma `BasePage` com as ações comuns (esperar, clicar, digitar, ler texto, esconder teclado). Os seletores ficam só nos Page Objects, e os specs descrevem apenas o comportamento esperado. Onde Android e iOS diferem (alertas, dropdown), o próprio Page Object escolhe o seletor certo para cada plataforma.

## Pré-requisitos

| Item | Versão usada |
|---|---|
| Node.js | 24 |
| Java (JDK) | 17, com `JAVA_HOME` configurado |
| Android Studio | Com SDK e `ANDROID_HOME` configurados |
| Emulador | Android 14 (API 34), imagem Google APIs x86_64 |

O projeto espera um emulador chamado `Pixel_7_API_34`. Para usar outro, defina as variáveis `ANDROID_DEVICE_NAME` e `ANDROID_PLATFORM_VERSION`.

## Como executar

Instale as dependências (o Appium e o driver UiAutomator2 vêm junto, instalados no próprio projeto):

```bash
npm install
```

Com o emulador ligado:

```bash
npm run test:android
```

O app é baixado sozinho na primeira execução e fica na pasta `apps`, fora do versionamento.

### BrowserStack (dispositivo real)

Copie o `.env.example` para `.env` e preencha com as credenciais do BrowserStack (App Automate, botão Access Key). O `.env` está no `.gitignore` e nunca vai para o repositório.

```bash
npm run test:browserstack
```

Por padrão roda em um Google Pixel 8 com Android 14. Para trocar, use as variáveis `BS_DEVICE_NAME` e `BS_PLATFORM_VERSION`.

### iOS (simulador)

A execução em iOS precisa de macOS com Xcode. Em um Mac:

```bash
npx appium driver install xcuitest
npm run test:ios
```

O padrão é iPhone 15 com iOS 17.5, ajustável pelas variáveis `IOS_DEVICE_NAME` e `IOS_PLATFORM_VERSION`.

## Relatório e evidências

Depois de qualquer execução:

```bash
npm run report:generate
npm run report:open
```

| Evidência | Onde encontrar |
|---|---|
| Resumo dos testes | Tela inicial do Allure |
| Passos de cada teste | Seção Execution de cada teste no Allure |
| Screenshots | Anexados em cada teste no Allure e salvos na pasta `screenshots` (prefixo `PASSOU_` ou `FALHOU_`) |
| Logs de execução | Pasta `logs` e console anexado no Allure |
| Informações do ambiente | Bloco Environment do Allure (plataforma, dispositivo, versão, app) |

O screenshot é tirado automaticamente ao final de cada teste, passando ou falhando, pelo hook `afterTest` da configuração base.

## Integração contínua

**GitHub Actions** (`.github/workflows/testes-mobile.yml`)

| Job | Quando roda |
|---|---|
| Android (emulador) | A cada push e pull request na `main` |
| Android real (BrowserStack) | Manualmente, pelo botão Run workflow |

O job do BrowserStack é manual para não consumir os minutos do plano gratuito a cada commit. As credenciais ficam nos Secrets do repositório. Relatório Allure, screenshots e logs são publicados como artefato em toda execução, inclusive quando algum teste falha.

**GitLab CI/CD** (`.gitlab-ci.yml`)

Como o repositório oficial está no GitHub, o arquivo do GitLab está pronto para uso caso o projeto seja importado. Ele roda a suíte no BrowserStack a cada commit e merge request. Optei pelo BrowserStack nesse caso porque os runners compartilhados do GitLab não oferecem aceleração KVM, que o emulador Android precisa para rodar em tempo razoável. As credenciais devem ser cadastradas em Settings > CI/CD > Variables.

## Decisões e observações

- **Textos em inglês nos asserts:** o app é de terceiros e vem em inglês. Todo o código, nomes de testes e mensagens de falha estão em português, mas os asserts comparam com o texto original exibido pelo app.
- **Aba Webview fora do CT06:** ela carrega um site externo, então o teste passaria a depender da internet e não do app.
- **iOS sem execução real:** o app do WebdriverIO só oferece build de simulador para iOS, que exige macOS. A configuração está pronta e validada (carrega sem erros), mas não foi executada por falta de um Mac.
- **Diálogo de ANR no CI:** em uma das execuções, o emulador do GitHub Actions exibiu o aviso "Pixel Launcher isn't responding" por cima do app, e todos os testes falharam. O screenshot salvo como artefato mostrou a causa na hora. A correção foi desativar os diálogos de erro do sistema antes dos testes (`hide_error_dialogs`), e o problema não voltou a ocorrer.

## Autor

**Rondon Júnior**

[GitHub](https://github.com/rondonjunior)