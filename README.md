![Logo](https://i.imgur.com/IUJPaJs.png)

![Badge](https://img.shields.io/badge/Coverage-100%-%237159c1?style=for-the-badge&logo=jest)

# Tarefas com SOLID

Que tal organizar suas tarefas de uma forma rápida e que tenha um total controle delas?

## Objetivo

O objetivo é visar as boas práticas de um projeto SOLID.

O SOLID é um acrônimo dos cinco primeiros princípios da programação orientada a objetos e design de código identificados por Robert C. Martin [refere-se ao Livro Código Limpo] conhecido como Uncle Bob.

Entre eles teremos com mais frequência o **(S)** Princípio da Responsabilidade Única, **(I)** Princípio da Segregação da Interface e **(D)** Princípio da inversão da dependência.

Vamos tratar sobre os Design Patterns (Padrões de Projeto), o Clean Code, a Inversão de dependência, a Injeção de dependência e os casos de testes automatizados.

Sobre o princípio da Inversão de dependência refere-se a uma forma específica de desacoplamento de módulos do software.

A Injeção de dependência é um padrão de desenvolvimento de programas de computadores utilizado quando é necessário manter baixo o nível de acoplamento entre diferentes módulos de um sistema.

Os testes nos auxiliam sobre o que foi tratado em nossa regra de negócios.

Além disso, vamos conhecer o poder das Framework e bibliotecas.

### Utilizando as boas práticas:

- Fácil de se manter, adaptar e se ajustar às alterações de escopo;
- Testável e de fácil entendimento;
- Extensível para alterações com o menor esforço necessário;
- Reaproveitamento;
- Máximo de tempo possível em utilização;

### Podemos evitar usando os princípios de SOLID

- Dificuldade na testabilidade / criação de testes de unidade;
- Código macarrônico, sem estrutura ou padrão;
- Dificuldades de isolar funcionalidades;
- Duplicação de código, uma alteração precisa ser feita em N pontos;
- Fragilidade, o código quebra facilmente em vários pontos após alguma mudança.

## Pré-requisitos e instalação

Requer o **docker** e **docker-compose** instalado, Não tem instalado?

Documentação: https://docs.docker.com/desktop/

Requer o node instalado, Não tem instalado?

Documentação: https://nodejs.org/pt-br/download/

**O processo da instalação deve ser feito no terminal na respectiva pastas do projeto.**

### BackEnd

Renomear o arquivo **ormconfig.example.json** para **ormconfig.json** e ajustar a seguinte opção da configuração do arquivo.

```bash
  "host": "db",
```

Após a configuração rodar o comando abaixo:

```bash
  docker-compose up
```

**Observação:** O BackEnd vai ser instalado e iniciado automaticamente.

### FrontEnd

```bash
  npm install
```

## Execução

**Obervação, caso queira executar outros scripts, você pode conferir no arquivo package.json.**

### BackEnd

#### Execução dos Testes automatizados e coverage (Jest)

```bash
  npm run test
```

### FrontEnd

```bash
  npm start
```

#### Execução dos Testes automatizados (Cypress)

```bash
  npm run cy:line
```

## Tecnologias

- JavaScript
- TypeScript
- Node
- React
- Docker
- Cypress
- HTML
- CSS
- VSCode
- ESLint
- Prettier
- Postman

## Bibliotecas

- Express
- Celebrate
- Jest
- Class-Transformer
- Cors
- TypeORM
- Tsyringe
- PrimeReact
- Axios

## Demonstração

Testes

![App Screenshot](https://i.imgur.com/V5yI506.gif)
![App Screenshot](https://i.imgur.com/8FZpXnz.gif)

## Autores

- [@charleslana](https://github.com/charleslana)
- [@brunomenezes29](https://github.com/brunomenezes29)
- [@MatheusMGL](https://github.com/MatheusMGL)
- [@FlavitoAdr](https://github.com/FlavitoAdr)
- [@JoaoVitorDeFreitas](https://github.com/JoaoVitorDeFreitas)
- [@IzabelleNMP](https://github.com/IzabelleNMP)

## Licença

[MIT](https://github.com/charleslana/tasks/blob/master/LICENSE)
