<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 583-1014.
-->

# Ações: letras, músicas e textos

### GetLyrics
### GetSong
- v2.19.0

Retorna uma música.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _[Lyrics](#lyrics)_ | Música ou NULL se não for encontrado |


**Exemplo:**
```
Requisição
{
  "id": "123"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "123",
    "title": "",
    "artist": "",
    "author": "",
    "note": "",
    "key": "",
    "bpm": 0,
    "time_sig": "",
    "groups": [
      {
        "name": "Group 1"
      },
      {
        "name": "Group 2"
      }
    ],
    "archived": false
  }
}
```


---

### GetSongs
- v2.21.0

Retorna a lista de músicas

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Lyrics](#lyrics)&gt;_| 


**Exemplo:**
```
Requisição
{
  "fields": "id,title,artist,author"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "0",
      "title": "",
      "artist": "",
      "author": "",
      "note": "",
      "copyright": "",
      "key": "",
      "bpm": 0.0,
      "time_sig": "",
      "groups": [],
      "extras": {
        "extra": ""
      },
      "archived": false
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

### SearchLyrics
### SearchSong
- v2.19.0

Realiza uma busca na lista de letras do usuário

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _String_ | Filtro |
| `text` | _String_ | Texto a ser pesquisado |
| `title` | _Boolean (opcional)_ |  `Padrão: true` |
| `artist` | _Boolean (opcional)_ |  `Padrão: true` |
| `note` | _Boolean (opcional)_ |  `Padrão: true` |
| `lyrics` | _Boolean (opcional)_ |  `Padrão: false` |
| `group` | _String (opcional)_ |  |
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Lyrics](#lyrics)&gt;_| 


**Exemplo:**
```
Requisição
{
  "text": "abc"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "123",
      "title": "abc1",
      "artist": "",
      "author": "",
      "note": "",
      "key": "",
      "bpm": 0,
      "time_sig": "",
      "groups": [],
      "archived": false
    },
    {
      "id": "456",
      "title": "abc2",
      "artist": "",
      "author": "",
      "note": "",
      "key": "",
      "bpm": 0,
      "time_sig": "",
      "groups": [],
      "archived": false
    }
  ]
}
```


---

### ShowLyrics
### ShowSong
- v2.19.0

Inicia uma apresentação de letra de música.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `initial_index` | _Number (opcional)_ | Índice inicial da apresentação `Padrão: 0` `v2.23.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123"
}
```


---

### GetText
- v2.21.0

Retorna um texto.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do texto |
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _[Text](#text)_ | Texto ou NULL se não for encontrado |


**Exemplo:**
```
Requisição
{
  "id": "xyz"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "",
    "title": "",
    "folder": "",
    "theme": null,
    "slides": [
      {
        "text": "Slide 1 line 1\nSlide 1 line 2",
        "background_id": null
      },
      {
        "text": "Slide 2 line 1\nSlide 2 line 2",
        "background_id": null
      },
      {
        "text": "Slide 3 line 1\nSlide 3 line 2",
        "background_id": null
      }
    ],
    "extras": {}
  }
}
```


---

### GetTexts
- v2.21.0

Retorna a lista de textos

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Text](#text)&gt;_| 


**Exemplo:**
```
Requisição
{
  "fields": "id,title,folder"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "",
      "title": "",
      "folder": "",
      "theme": null
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

### SearchText
- v2.21.0

Realiza uma busca na lista de textos do usuário

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _String_ | Filtro |
| `text` | _String_ | Texto a ser pesquisado |
| `fields` | _String (opcional)_ | Nome dos campos separados por vírgula. Se este campo for declarado, apenas os campos especificados serão retornados `v2.24.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Lyrics](#lyrics)&gt;_| 


**Exemplo:**
```
Requisição
{
  "text": "example"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "",
      "title": "",
      "folder": "",
      "theme": null
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

### ShowText
- v2.19.0

Inicia uma apresentação de um item da aba texto.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `initial_index` | _Number (opcional)_ | Índice inicial da apresentação `Padrão: 0` `v2.23.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abc"
}
```


---

### ShowVerse
- v2.19.0

Inicia uma apresentação de versículo da Bíblia.<br>Obs: É possível exibir, no máximo, 100 versículos diferentes em uma mesma requisição.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _Object_ | **id**, **ids** ou **references** |
| `id` | _String (opcional)_ | Para exibir um versículo. ID do item no formato LLCCCVVV.<br/>Exemplo: '19023001' (livro 19, capítulo 023, versículo 001) |
| `ids` | _Array&lt;String&gt; (opcional)_ | Para exibir uma lista de versículos. Lista com o ID de cada versículo.<br/>Exemplo: ['19023001', '43003016', '45012002'] |
| `references` | _String (opcional)_ | Referências. Exemplo: **João 3:16** ou **Rm 12:2** ou **Gn 1:1-3 Sl 23.1** |
| `version` | _String (opcional)_ | Nome ou abreviação da tradução utilizada `v2.21.0+` |
| `quick_presentation` | _Boolean (opcional)_ | `true` para exibir o versículo através de uma janela popup de apresentação rápida.<br>Permite, por exemplo, iniciar a apresentação de um versículo sem encerrar a apresentação atual, voltando pra apresentação atual quando encerrar a apresentação do versículo. `Padrão: false` `v2.24.0+` |
| `show_x_verses` | _Number (opcional)_ | Quantidade de versículos exibidos na projeção `v2.28.0+` |
| `default_action` | _String (opcional)_ | Ação padrão `default` `responsive_reading` `only_reference` `Padrão: default` `v2.28.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "19023001",
  "ids": [
    "19023001",
    "43003016",
    "45012002"
  ],
  "references": "Rm 12:2  Gn 1:1-3  Sl 23"
}
```


---
