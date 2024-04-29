# Desafio 2 (Teste serverless)

## Funcionamento

- **Teste Serverless Síncrono:**
  - Função Lambda acionada pela API Gateway no método POST através do endpoint `createUser`. O corpo da requisição é retornado como resposta de sucesso para a API Gateway.

Exemplo de body a ser enviado: 

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main Street",
    "city": "Anytown",
    "state": "NY",
    "zip": "12345"
  }
}
```

- **Teste Serverless Assíncrono:**
  - Função Lambda acionada pelo SQS.
  - Após o acionamento, a lambda envia os mesmos dados para um EventBridge.


```json
{
  "id": "866044287365636609",
  "name": "John Doe",
}
```

## Deploy
Para deploy do projeto, na pasta raiz, execute:

```bash
sam build
sam deploy --guided
```

### Testes unitários
Todos os testes da aplicação estão na pasta `tests/unit`.
Para rodar os testes, na pasta raiz do projeto, execute:

```bash
cd src
npm install
npm run test
```

## Descrição dos recursos Serverless Síncrono

### Função Lambda - SyncChallengeFunction

Esta função é responsável por sincronizar desafios. Acionada pelo API Gateway quando um usuário envia uma solicitação POST para `/createUser`.

**Detalhes:**
- **Handler**: O handler da função é exportado em `src/app.ts`.
- **Runtime**: Node.js 20.x.
- **Eventos**: A função é acionada por um evento HTTP POST.




## Descrição dos recursos Serverless Assíncrono


### Função Lambda - AsyncChallengeFunction

Esta lambda é acionada por mensagens na fila SQS `async-challenge-queue` e envia o evento para EventBridge.

**Detalhes:**
- **Handler**: O handler da função é exportado em `src/app.ts`.
- **Runtime**: Node.js 20.x.
- **Eventos**: A função é acionada por mensagens na fila SQS `async-challenge-queue`.

### Fila SQS - AsyncChallengeQueue

**Detalhes:**
- **Nome da Fila**: `async-challenge-queue`

## EventRule

Esta regra de eventos está associada ao source `challenge.async`, e foi criada com intuito de facilitar o monitoramento dos eventos com este source para debug.

