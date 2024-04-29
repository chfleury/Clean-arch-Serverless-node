# Desafio 1 -Opção 2 (Conversor de moedas)

## Funcionamento

O aplicativo permite aos usuários converter uma determinada quantia de uma moeda para outra. Ele consome uma API de cotação de moedas para obter as taxas de câmbio mais recentes e realiza os cálculos necessários para fornecer o valor convertido.


### Colection do Postman
Para facilitar, disponibilizo essa colection pública do projeto.

https://www.postman.com/chfleury/workspace/my-public-workspace/collection/11297914-8e41db3a-e89e-44c1-8b0f-fdb977238568?action=share&creator=11297914

### Endpoint da API

- **Rota:** `POST /exchange`
- **Exemplo do Corpo da Requisição:**
  
```json
{
    "baseCurrency": "USD",
    "targetCurrency": "BRL",
    "amount": "234.54"
}
```

- **Descrição dos Campos:**
  - `baseCurrency`: A moeda de origem que o usuário deseja converter.
  - `targetCurrency`: A moeda de destino para a qual o usuário deseja converter.
  - `amount`: A quantidade da moeda de origem que o usuário deseja converter.

- **Resposta:**
  
```json
{
    "exchangeResult": 1201.64,
    "exchangeRate": 5.1234
}
```

- **Descrição dos Campos da Resposta:**
  - `exchangeRate`: A taxa atual usada para conversão.
  - `exchangeResult`: O resultado da conversão.

## Testes Unitários

Todos os testes unitários estão localizados na pasta `test` podem ser executados rodando `npm run test`

## Estrutura do Projeto

O aplicativo segue uma arquitetura de Clean Architecture, com as seguintes camadas:

- **Application:** Responsável pela lógica de aplicação, é onde estão os UseCases.
- **Adapters (Interface Adapters):** Responsável pela adaptação de dados entre as camadas internas e externas, incluindo interfaces com a API REST. Contém Controllers, Validators e Presenters.
- **Domain:** Contém as regras de negócios e entidades principais do aplicativo. Como o domínio do projeto é bem pequeno, não consegui modelar nenhuma entidade que fizesse sentido.
- **Framework:** Camada de infraestrutura que inclui bibliotecas, frameworks e ferramentas externas necessárias para a execução do aplicativo.

## Instruções de Execução

Para executar o aplicativo, siga as instruções abaixo:

1. Navegue até o diretório raiz da aplicação.
3. Execute o comando `npm install` para instalar as dependências necessárias.
4. Execute o comando `npm run start` para iniciar o aplicativo.

## Variáveis de Ambiente

Essas variáveis devem ser configuradas em um arquivo `.env` na raiz do projeto. Um exemplo dessas variáveis pode ser encontrado no arquivo `.env.example`.

Como é um projeto para testes e a API key é gratuita, já deixei minha API key no .env.example para facilitar, basta copiar o conteúdo dele e colar no .env.

  
```plaintext
PORT=3000
API_KEY=valid_api_key
```

- **Descrição das Variáveis:**
  - `PORT`: A porta na qual o servidor do aplicativo será executado.
  - `API_KEY`: A chave de acesso à API de cotação de moedas.
 

