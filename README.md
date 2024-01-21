Este é um desafio tecnico desenvolvido por mim [Ruan Portella](https://github.com/Ruan-Portella).

Desenvolvi uma aplicação full Stack para você cadastrar pessoas físicas.

## Ferramentas :wrench:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [React](https://pt-br.reactjs.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Sequelize](https://sequelize.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Recursos :sparkles:

- Criação de usuário e login
- Criação de pessoa física
- Deleção de pessoa física
- Edição de pessoa física

## Metodologias e Design Patterns :pencil2:

- Arquitetura em camadas
- Princípios de SOLID

## Como executar a aplicação :computer:

Para executar a aplicação, você precisará ter instalada em sua máquina as seguintes ferramentas:

- Localmente: Node.js e MySQL
- Com Containers: Docker

<details>
<summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>

## 👉 Com Docker


### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/cadastro_pessoa_fisica.git && cd cadastro_pessoa_fisica
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta server e preencha as variáveis de ambiente com as informações do seu banco de dados.
`

### 3 - Suba o container do banco de dados, front e back.

```sh
docker-compose up -d
```

### 5 - Acesse a aplicação

`
Pronto! Agora é só acessar o [localhost:5173](http://localhost:5173) e se divertir!
`

## 👉 Sem Docker

### 1 - Clone o repositório e entre na pasta da aplicação

```sh
git clone git@github.com:Ruan-Portella/cadastro_pessoa_fisica.git && cd cadastro_pessoa_fisica
```

### 2 - Configure as variáveis de ambiente

`
 Altere o .env.example para .env na pasta server e preencha as variáveis de ambiente com as informações do seu banco de dados.
`

### 3 - Instale as dependências

```sh
cd client && npm install && cd ../server && npm install
```

### 3 - Faça o build do backend

```sh
npm run build
```

### 5 - Crie sua conexão do banco de dados e altere no arquivo database.ts na pasta server

`Para continuar sem o Docker você precisa criar uma conexão com o banco de dados mysql.`

`OU`

`Rode o comando abaixo para subir o container do banco de dados`

```sh
docker-compose up db -d
```

### 6 - Suba a aplicação front e back

```sh
cd .. && cd client && npm run dev
```

`Crie outro terminal e rode o comando abaixo`

```sh
cd .. && cd server && npm run dev
```

### 6 - Acesse a aplicação

`
Pronto! Agora é só acessar o [localhost:5173](http://localhost:5173) e se divertir!
`

</details>

## Aplicação no Ar

<img src='https://i.imgur.com/YSDy8lZ.png' alt='Aplicação No Ar' /> 
