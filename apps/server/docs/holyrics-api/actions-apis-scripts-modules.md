<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 2611-2963.
-->

# Ações: favoritos, APIs, scripts e módulos

- v2.21.0

Lista das descrições do slide disponíveis



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[SlideDescription](#slide-description)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "name": "Chorus",
      "tag": "C",
      "aliases": [],
      "font_color": "FFFFFF",
      "bg_color": "000080",
      "background": null
    },
    {
      "...": "..."
    },
    {
      "...": "..."
    }
  ]
}
```


---

### GetFavorites
- v2.19.0

Itens da barra de favoritos



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[FavoriteItem](#favorite-item)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "1",
      "name": "abc"
    },
    {
      "id": "2",
      "name": "xyz"
    },
    {
      "id": "3",
      "name": "123"
    }
  ]
}
```


---

### FavoriteAction
- v2.19.0

Executa um item da barra de favoritos

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abcxyz"
}
```


---

### GetApis
- v2.21.0

Retorna a lista de APIs



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.id` | _String_ | ID do item |
| `data.*.name` | _String_ | Nome do item |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyz1",
      "name": "abc1"
    },
    {
      "id": "xyz2",
      "name": "abc2"
    }
  ]
}
```


---

### GetScripts
- v2.21.0

Retorna a lista de scripts



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.id` | _String_ | ID do item |
| `data.*.name` | _String_ | Nome do item |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyz1",
      "name": "abc1"
    },
    {
      "id": "xyz2",
      "name": "abc2"
    }
  ]
}
```


---

### ApiAction
- v2.19.0

Executa a ação de um item API existente no programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abcxyz"
}
```


---

### ScriptAction
- v2.19.0

Executa a ação de um item **Script** existente no programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abc"
}
```


---

### ApiRequest
- v2.19.0

Executa uma requisição para o receptor associado e retorna a resposta do receptor.<br>
A partir da `v2.23.0` é possível passar o host ou ip diretamente, porém é necessário adicionar o host/ip na lista de requisições permitidas.<br>
menu arquivo > configurações > avançado > javascript > configurações > requisições permitidas

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | id do receptor |
| `raw` | _Object_ | dados da requisição |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorno da requisição ou NULL para erro/timeout |


**Exemplo:**
```
Requisição
{
  "id": "abcxyz",
  "raw": {
    "request-type": "GetSourceActive",
    "sourceName": "example"
  }
}

Resposta
{
  "status": "ok",
  "data": {
    "sourceActive": "example"
  }
}
```


---

### ModuleAction
- v2.26.0

Executar uma ação pública de um módulo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `module_id` | _String_ | id do módulo |
| `action_id` | _String_ | id da ação |
| `action_type` | _String (opcional)_ | Valores aceitos: `call` `open`<br>**call:** Executa a ação<br>**open:** Abre uma janela popup para o usuário inserir/editar os parâmetros e executar a ação `Padrão: call` |
| `async` | _Boolean (opcional)_ | Executar a ação de forma assíncrona, ou seja, sem retornar a resposta da ação. Disponível se `action_type=call` `Padrão: false` |
| `timeout` | _Number (opcional)_ | `100 ~ 4000` Tempo limite para execução da ação. Disponível se `action_type=call` `Padrão: 500` |
| `notification` | _Boolean (opcional)_ | Exibir uma notificação em vez de exibir o popup diretamente na tela para o usuário. Disponível se `action_type=open` `Padrão: false` |
| `input` | _Object (opcional)_ | Mapa chave/valor com os parâmetros para execução da ação, onde cada chave é o respectivo id do input declarado na ação do módulo |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Resposta da ação. Disponível se `action_type=call && async=false` |


**Exemplo:**
```
Requisição
{
  "module_id": "",
  "action_id": "",
  "action_type": "",
  "async": false,
  "timeout": 0,
  "notification": false,
  "input": {
    "a": "abc",
    "b": "xyz"
  }
}

Resposta
{
  "status": "ok",
  "data": {}
}
```


---

### RunActions
- v2.27.0

Executar uma ação do tipo 'Actions'<br>Ações disponíveis: [HolyricsActions](https://github.com/holyrics/jslib/blob/main/doc/pt/HolyricsActions.md)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `action_id` | _String_ |  |
| `settings` | _Object_ | Mapa chave/valor |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "action_id": "interface_bible_select_verse",
  "settings": {
    "verse": "43003016"
  }
}
```


---
