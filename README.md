## Visão Geral
Aplicação AWS SAM proposta no desafio da Liqi.

### Testes unitários
Todos os testes da aplicação estão na pasta `tests/unit` e podem ser executados com o comando ```npm run test``` na pasta src.

## Desafio Serverless Síncrono

### Função Lambda - SyncChallengeFunction

Esta função é responsável por sincronizar desafios. Acionada pelo API Gateway quando um usuário envia uma solicitação POST para `/createUser`.

**Detalhes:**
- **Handler**: O handler da função é exportado em `src/app.ts`.
- **Runtime**: Node.js 20.x.
- **Eventos**: A função é acionada por um evento HTTP POST.

## Desafio Serverless Assíncrono


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

