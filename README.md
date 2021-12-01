
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# Tarefas com SOLID

A brief description of what this project does and who it's for

## Objetivo

O objetivo é visar as boas práticas de um projeto SOLID.

O SOLID é um acrônimo dos cinco primeiros princípios da programação orientada a objetos e design de código identificados por Robert C. Martin [refere-se ao Livro Código Limpo] conhecido como Uncle Bob.

Entre eles teremos com mais frequência o **(S)** Princípio da Responsabilidade Única e **(I)** Princípio da Segregação da Interface e **(D)** Princípio da inversão da dependência.

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

Requer o docker instalado, Não tem instalado?

Documentação: https://docs.docker.com/desktop/

Requer o node instalado, Não tem instalado?

Documentação: https://nodejs.org/pt-br/download/

**O processo da instalação deve ser feito no terminal na respectiva pastas do projeto.**

### BackEnd

```bash
  npm install
```
    
#### Docker compose

```bash
  ...
```

#### Execute as migrations

```bash
  npm run migrate:up
```

### FrontEnd

```bash
  npm install
```

## Execução

**Obervação, caso queira executar outros scripts, você pode conferir no arquivo package.json de cada projeto.**

### Postgres

```bash
  docker ps -a -q
  docker start 'id do container'
```

### BackEnd

```bash
  npm run dev
```

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

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Autores

- [@charleslana](https://github.com/charleslana)
- [@brunomenezes29](https://github.com/brunomenezes29)
- [@MatheusMGL](https://github.com/MatheusMGL)
- [@FlavitoAdr](https://github.com/FlavitoAdr)
- [@JoaoVitorDeFreitas](https://github.com/JoaoVitorDeFreitas)
- [@IzabelleNMP](https://github.com/IzabelleNMP)


## Licença

[MIT](https://github.com/charleslana/tasks/blob/master/LICENSE)

