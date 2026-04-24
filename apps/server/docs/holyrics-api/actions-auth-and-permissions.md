<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 512-582.
-->

# Ações: autenticação, token e permissões

### GetTokenInfo
- v2.25.0

Obtém a informação do token



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.version` | _String_ | Versão no formato: X.Y.Z |
| `data.permissions` | _String_ | Ações permitidas para o token, separados por vírgula |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "version": "2.25.0",
    "permissions": "GetSongs,GetFavorites"
  }
}
```


---

### CheckPermissions
- v2.25.0

Verifica se o token tem as permissões requeridas.<br>Retorna `status=ok` se o token tiver todas as permissões requeridas no parâmetro `actions`.<br>Retorna `code 401` se o token não tiver todas as permissões requeridas.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `actions` | _String_ | Lista de ações requeridas para o token, separados por vírgula |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| <br>Disponível se **status=error** |  |  |
| `error.unauthorized_actions` | _String (opcional)_ | Ações não permitidas, separados por vírgula |
| `error.request_status` | _String (opcional)_ | `pending` foi criada uma notificação solicitando permissão ao usuário na interface do programa<br> <br>`denied` a solicitação de permissão foi negada |


**Exemplo:**
```
Requisição
{
  "actions": "GetSongs,GetFavorites"
}

Resposta
{
  "status": "error",
  "error": {
    "unauthorized_actions": "GetFavorites",
    "request_status": "pending"
  }
}
```


---
