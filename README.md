## Visão Geral
Aplicação AWS SAM proposta no desafio da Liqi.


## Desafio Serverless Síncrono

### Função Lambda - SyncChallengeFunction

Esta função é responsável por sincronizar desafios. Acionada pelo API Gateway quando um usuário envia uma solicitação POST para `/createUser`.

**Detalhes:**
- **Handler**: O handler da função é `app.syncChallengeLambdaHandler`.
- **Runtime**: Node.js 20.x.
- **Eventos**: A função é acionada por um evento HTTP POST.

## Desafio Serverless Assíncrono


### Função Lambda - AsyncChallengeFunction

Esta lambda é acionada por mensagens na fila SQS `AsyncChallengeQueue` e envia o evento para EventBridge.

**Detalhes:**
- **Handler**: O handler da função é `app.asyncChallengeLambdaHandler`.
- **Runtime**: Node.js 20.x.
- **Eventos**: A função é acionada por mensagens na fila SQS `async-challenge-queue`.

### Fila SQS - AsyncChallengeQueue

**Detalhes:**
- **Nome da Fila**: `async-challenge-queue`

## EventRule

Esta regra de eventos está associada ao source `challenge.async`, e foi criada com intuito de facilitar o monitoramento dos eventos com este source para debug.

