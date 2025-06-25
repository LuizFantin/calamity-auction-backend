# Guia da API de Administração do Calamity

## Introdução

Este guia fornece instruções sobre como usar os endpoints da API de administração para a aplicação Calamity. A API permite que os administradores realizem várias ações relacionadas ao gerenciamento de jogadores, gerenciamento de capitães e controle de leilões.

## URL Base

Todas as requisições da API devem ser feitas para: `http://localhost:3000` (assumindo que o servidor está rodando localmente na porta 3000)

## Autenticação

Todas as rotas de administração requerem autenticação. Você precisa incluir um cabeçalho de Autorização com um token JWT válido.

Cabeçalho: `Authorization: Bearer <seu_token_jwt>`

## Endpoint Principal

### POST /admin/actions

Este endpoint permite que você execute múltiplas ações de administração em uma única requisição.

**Corpo da Requisição:**
```json
{
  "actions": [
    {
      "type": "tipoDeAcao",
      "outrasPropriedades": "valores"
    }
  ],
  "auctionId": "valorDoIdDoLeilao"
}
```

## Ações Disponíveis

### 1. Adicionar Jogador
- **Tipo:** `addPlayer`
- **Propriedades:**
  - `battleTag`: battleTag do jogador (ex: "NomeJogador#1234")
  - `nationality`: Nacionalidade do jogador
  - `primaryRole`: Função primária do jogador
  - `secondaryRole`: Função secundária do jogador

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "addPlayer",
      "battleTag": "Jogador#1234",
      "nationality": "BR",
      "primaryRole": "TANK",
      "secondaryRole": "HEALER"
    }
  ],
  "auctionId": "1"
}
```

### 2. Remover Jogador
- **Tipo:** `removePlayer`
- **Propriedades:**
  - `battleTag`: battleTag do jogador a ser removido

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "removePlayer",
      "battleTag": "Jogador#1234"
    }
  ],
  "auctionId": "1"
}
```

### 3. Adicionar Usuário
- **Tipo:** `addUser`
- **Propriedades:**
  - `username`: Nome de usuário do usuário a ser adicionado
  - `password`: Senha do usuário a ser adicionado

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "addUser",
      "username": "newuser",
      "password": "senha123"
    }
  ],
  "auctionId": "1"
}
```

### 4. Tornar usuário Capitão
- **Tipo:** `linkCaptainToPlayer`
- **Propriedades:**
  - `username`: Nome de usuário do capitão
  - `battleTag`: battleTag do jogador
  - `coins`: Quantidade de moedas do capitão (opcional)
  
**Exemplo:**
```json
{
  "actions": [
    {
      "type": "linkCaptainToPlayer",
      "username": "already created user's username",
      "battleTag": "Jogador#1234",
      "coins": 25
    }
  ],
  "auctionId": "1"
}
```

### 5. Remover Capitão
- **Tipo:** `removeCaptain`
- **Propriedades:**
  - `username`: Nome de usuário do capitão a ser removido

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "removeCaptain",
      "username": "Capitao"
    }
  ],
  "auctionId": "1"
}
```

### 6. Definir Moedas do Capitão
- **Tipo:** `setCaptainCoins`
- **Propriedades:**
  - `username`: Nome de usuário do capitão
  - `coins`: Número de moedas a serem definidas

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "setCaptainCoins",
      "username": "Capitao",
      "coins": 150
    }
  ],
  "auctionId": "1"
}
```

### 7. Definir Preço do Jogador
- **Tipo:** `setPlayerPrice`
- **Propriedades:**
  - `battleTag`: battleTag do jogador
  - `price`: Preço a ser definido para o jogador

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "setPlayerPrice",
      "battleTag": "Jogador#1234",
      "price": 50
    }
  ],
  "auctionId": "1"
}
```

### 8. Atribuir Jogador
- **Tipo:** `assignPlayer`
- **Propriedades:**
  - `battleTag`: battleTag do jogador
  - `username`: Nome de usuário do capitão para atribuir o jogador (ou null para desatribuir)

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "assignPlayer",
      "battleTag": "Jogador#1234",
      "username": "Capitao"
    }
  ],
  "auctionId": "1"
}
```

### 9. Iniciar Leilão
- **Tipo:** `startAuction`
- Nenhuma propriedade adicional necessária

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "startAuction"
    }
  ],
  "auctionId": "1"
}
```

### 10. Encerrar Leilão
- **Tipo:** `endAuction`
- Nenhuma propriedade adicional necessária

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "endAuction"
    }
  ],
  "auctionId": "1"
}
```

### 11. Iniciar Leilão de Backup
- **Tipo:** `startBackupAuction`
- Nenhuma propriedade adicional necessária

**Exemplo:**
```json
{
  "actions": [
    {
      "type": "startBackupAuction"
    }
  ],
  "auctionId": "1"
}
```

## Usando o Postman

1. Crie uma nova requisição POST
2. Defina a URL para `http://localhost:3000/admin/actions`
3. Na aba Headers, adicione:
   - Chave: `Authorization`
   - Valor: `Bearer <seu_token_jwt>`
4. Na aba Body, selecione "raw" e escolha "JSON" no dropdown
5. Insira o payload JSON com as ações desejadas e o auctionId
6. Clique em "Send" para fazer a requisição

## Resposta

A API responderá com um array de resultados para cada ação, indicando sucesso ou falha:

```json
[
  {
    "type": "tipoDeAcao",
    "success": true,
    "data": {} // Opcional, contém dados relevantes para a ação
  },
  {
    "type": "outroTipoDeAcao",
    "success": false,
    "message": "Mensagem de erro"
  }
]
```

## Atualizações em Tempo Real

O servidor usa Socket.IO para emitir atualizações em tempo real para ações administrativas. Clientes conectados ao servidor Socket.IO receberão eventos 'adminAction' com a seguinte estrutura:

```json
{
  "type": "tipoDeAcao",
  "result": {
    "success": true/false,
    "data": {} // Opcional, contém dados relevantes para a ação
  }
}
```