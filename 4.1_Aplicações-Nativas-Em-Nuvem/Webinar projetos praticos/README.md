# Webinar Set Up Projects Like a PRO

## NPM

extensions: ESlint, GitLens, Material Icon Theme.

- npm: Gerenciador de pacotes do Node.js.

## Linting
- Lint: Ferramenta de analise de código estático.
```
    npm init @eslint/config
    //verifica se esta errado
    npx esl init . --fix
```

## Git Hooks
```
npx esl init .
```
husky: Ferramenta para executar scripts antes de um commit ou push.
```
npm install husky --save-dev
npm pkg set scripts prepare "husky install"
npm run prepare
```
lint-Staged: Ferramenta para executar scripts em arquivos que foram alterados.
```
npm install lint-staged --save-dev 
```

## GitIgnore
Ignorar arquivos e pastas que não devem ser versionados.
Exemplos:
- node_modules: pasta com os pacotes do node.
- Credentials: Arquivos com credenciais de acesso.
- Arquivos Grandes: Arquivos grandes que não são necessários para o projeto.

## Variáveis de Ambiente

- dotenv: Pacote para carregar as variáveis de ambiente.
```
npm install -D --prefix ./api dotenv
```
- .env: Arquivo com as variáveis de ambiente.

chamar o dotenv no arquivo index.js
```javascript
require('dotenv').config();
//configurar para localhost
if(process.env.NODE_ENV == IS.LOCALHOST=true){
  require('dotenv').config();
}
```
script em package.json
```json
"scripts": {
    "dev": "IS.LOCALHOST=true"
  },
```

