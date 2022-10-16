# adonis-api
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![AdonisJS](https://img.shields.io/badge/adonisjs-%23220052.svg?style=for-the-badge&logo=adonisjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Sobre
Esse é um projeto de backend utilizando o AdonisJS com a finalidade de conhecer sobre o mesmo. O projeto utiliza a conexão com banco MySQL e possui 2 níveis de acesso: usuário Administrador e usuário comum, que no caso dessa aplicação é Leitor.

## Funcionalidades
A aplicação em si possui as áreas:
- Login e Registro de usuário
- CRUD de fórums
- CRUD de tasks

## Pré-requisitos
- É necessário ter: 
  -   o NodeJS instalado na sua máquina
      `node -v`
  -    o servidor MySQL configurado. (utilizei o Docker para isso)

## Instalação 
`npm i`

## Configuração
- Migrations

    `node ace migration:run`

- Seeds (Níveis de acesso: Leitor e Administrador)

    `node ace db:seed`

- Variáveis de ambiente

    Modifique a extensão do arquivo .env.example para .env e modifique as configurações do banco de dados.

## Rodar o projeto
node ace serve --watch

## Testar a API
No repositório possui um arquivo .json com uma coleção de requisições utilizando o Postman. Você pode utilizá-lo para testar.


Se quiser, faça um fork desse repositório e dê continuidade ao projeto, como por exemplo, adicionando uma nova funcionalidade de Comentários nas tasks. 
