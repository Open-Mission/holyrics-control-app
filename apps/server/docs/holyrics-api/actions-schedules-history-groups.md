<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 3533-4457.
-->

# Ações: alertas, agendas, históricos, grupos e cadastros

### GetAlert
- v2.20.0

Retorna as configurações da mensagem de alerta



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.text` | _String_ | Texto atual do alerta |
| `data.show` | _Boolean_ | Se a exibição do alerta está ativada |
| `data.display_ahead` | _Boolean_ | Se a opção *'exibir à frente de tudo'* está ativada `v2.27.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "text": "Example",
    "show": false
  }
}
```


---

### SetAlert
- v2.19.0

Altera as configurações da mensagem de alerta

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String (opcional)_ | Alterar o texto de alerta |
| `show` | _Boolean (opcional)_ | Exibir/ocultar o alerta |
| `display_ahead` | _Boolean (opcional)_ | Alterar a opção *'exibir à frente de tudo'* `Padrão: true` `v2.27.0+` |
| `close_after_seconds` | _Number (opcional)_ | Remover texto de alerta automaticamente após X segundos. `0 ~ 3600` `Padrão: 0` `v2.27.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "text": "",
  "show": false
}
```


---

### GetCurrentSchedule
- v2.19.0

Programação atual (selecionada na janela principal do programa)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `include_lyrics_slides` | _Boolean (opcional)_ |  `v2.24.0+` |
| `include_lyrics_history` | _Boolean (opcional)_ |  `v2.24.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Schedule](#schedule)&gt;_| 


**Exemplo:**
```
Requisição
{}

Resposta
{
  "status": "ok",
  "data": {
    "type": "event",
    "name": "",
    "datetime": "2016-05-10 12:00",
    "lyrics_playlist": [
      {
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
    ],
    "media_playlist": [
      {
        "id": "xyz",
        "type": "image",
        "name": "image.jpg"
      },
      {
        "id": "abc",
        "type": "video",
        "name": "video.mp4"
      }
    ],
    "responsible": null,
    "members": [],
    "roles": [],
    "notes": ""
  }
}
```


---

### GetSchedules
- v2.19.0

Retorna a lista de programação de um mês específico

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `month` | _Number_ | Mês (1-12) |
| `year` | _Number_ | Ano |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Schedule](#schedule)&gt;_| 


**Exemplo:**
```
Requisição
{
  "month": 3,
  "year": 2022
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "type": "service",
      "name": "",
      "datetime": "2022-03-06 19:00",
      "lyrics_playlist": [],
      "media_playlist": [],
      "responsible": null,
      "members": [],
      "roles": [],
      "notes": ""
    },
    {
      "type": "event",
      "name": "",
      "datetime": "2022-03-12 20:00",
      "lyrics_playlist": [],
      "media_playlist": [],
      "responsible": null,
      "members": [],
      "roles": [],
      "notes": ""
    },
    {
      "type": "service",
      "name": "",
      "datetime": "2022-03-13 19:00",
      "lyrics_playlist": [],
      "media_playlist": [],
      "responsible": null,
      "members": [],
      "roles": [],
      "notes": ""
    },
    {
      "type": "service",
      "name": "",
      "datetime": "2022-03-20 19:00",
      "lyrics_playlist": [],
      "media_playlist": [],
      "responsible": null,
      "members": [],
      "roles": [],
      "notes": ""
    },
    {
      "type": "service",
      "name": "",
      "datetime": "2022-03-27 19:00",
      "lyrics_playlist": [],
      "media_playlist": [],
      "responsible": null,
      "members": [],
      "roles": [],
      "notes": ""
    }
  ]
}
```


---

### GetSavedPlaylists
- v2.19.0

Retorna as listas de reprodução salvas



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.id` | _String_ | ID do item |
| `data.*.name` | _String_ | Nome do item |
| `data.*.items` | _Array&lt;[Item](#item)&gt;_ | Itens salvos na lista |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyzabc",
      "name": "",
      "items": [
        {
          "id": "xyz",
          "type": "image",
          "name": "image.jpg"
        },
        {
          "id": "abc",
          "type": "video",
          "name": "video.mp4"
        }
      ]
    },
    {
      "id": "abcdef",
      "name": "",
      "items": [
        {
          "id": "abc",
          "type": "audio",
          "name": "audio.mp3"
        },
        {
          "id": "xyz",
          "type": "song",
          "name": "",
          "song_id": "123"
        }
      ]
    }
  ]
}
```


---

### LoadSavedPlaylist
- v2.19.0

Preenche a lista de mídias da lista de reprodução selecionada atualmente no programa com a lista informada

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome da lista de reprodução salva |
| `merge` | _Boolean_ | Adiciona os itens no final da lista em vez de substituir `Padrão: false` `v2.24.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": ""
}
```


---

### GetHistory
- v2.19.0

Histórico de "Música tocada"

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da letra da música |
| `in_millis` | _Boolean (opcional)_ | `true` para retornar o valor em Timestamp `v2.24.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;String&gt;_ | Data e hora no formato: YYYY-MM-DD HH:MM |


**Exemplo:**
```
Requisição
{
  "id": "123"
}

Resposta
{
  "status": "ok",
  "data": [
    "2022-04-03 19:32",
    "2022-07-10 20:10",
    "2023-01-01 19:15"
  ]
}
```


---

### GetHistories
- v2.19.0

Histórico de todas as marcações de "Música tocada"

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `in_millis` | _Boolean (opcional)_ | `true` para retornar o valor em Timestamp `v2.24.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.music_id` | _String_ | ID da música |
| `data.*.history` | _Array&lt;String&gt;_ | Data e hora no formato: YYYY-MM-DD HH:MM |


**Exemplo:**
```
Requisição
{}

Resposta
{
  "status": "ok",
  "data": [
    {
      "music_id": "123",
      "history": [
        "2022-04-03 19:32",
        "2022-07-10 20:10",
        "2023-01-01 19:15"
      ]
    },
    {
      "music_id": "456",
      "history": [
        "2022-05-05 19:20",
        "2022-08-08 20:30",
        "2023-01-10 20:02"
      ]
    }
  ]
}
```


---

### GetNearestHistory
- v2.24.0

Obtém a data do histórico de "Música tocada" mais próxima de uma data e hora passada por parâmetro (ou da data e hora atual do sistema)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da letra da música |
| `datetime` | _String (opcional)_ | Formatos aceitos: `timestamp` `YYYY-MM-DD` `YYYY/MM/DD` `YYYY-MM-DD HH:MM:SS` `YYYY/MM/DD HH:MM:SS` `DD-MM-YYYY` `DD/MM/YYYY` `DD-MM-YYYY HH:MM:SS` `DD/MM/YYYY HH:MM:SS` `Padrão: Date.now()` |
| `type` | _String (opcional)_ | Filtro de busca. Pode ser:<br>`any` qualquer valor mais próximo da data especificada<br>`before_datetime` valor mais próximo que seja anterior ou igual à data especificada (value <= datetime)<br>`after_datetime` valor mais próximo que seja igual ou posterior à data especificada (value >= datetime) `Padrão: any` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Object_ | Pode ser null |
| `data.datetime` | _String_ | Data e hora no formato: YYYY-MM-DD HH:MM |
| `data.datetime_millis` | _Number_ | Timestamp |


**Exemplo:**
```
Requisição
{
  "id": "123",
  "datetime": "2024-12-16",
  "type": "after_datetime"
}

Resposta
{
  "status": "ok",
  "data": {
    "datetime": "2024-12-16 19:30:00",
    "datetime_millis": 1734388200000
  }
}
```


---

### GetSongGroup
- v2.25.0

Grupo de música

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ |  |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Group](#group)_| 


**Exemplo:**
```
Requisição
{
  "name": "Example"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "example",
    "name": "example",
    "songs": [
      "123",
      "456"
    ],
    "add_chorus_between_verses": false,
    "hide_in_interface": false,
    "metadata": {
      "modified_time_millis": 1234
    }
  }
}
```


---

### GetSongGroups
- v2.24.0

Lista de grupos de música



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Group](#group)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "example 1",
      "name": "example 1",
      "songs": [
        "123",
        "456"
      ],
      "add_chorus_between_verses": false,
      "hide_in_interface": false,
      "metadata": {
        "modified_time_millis": 1234
      }
    },
    {
      "id": "example 2",
      "name": "example 2",
      "songs": [
        "123",
        "456"
      ],
      "add_chorus_between_verses": false,
      "hide_in_interface": false,
      "metadata": {
        "modified_time_millis": 1234
      }
    }
  ]
}
```


---

### GetTeams
- v2.22.0

Lista de times



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Team](#team)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": "abc",
      "description": ""
    },
    {
      "id": "xyz",
      "name": "xyz",
      "description": ""
    }
  ]
}
```


---

### GetMembers
- v2.19.0

Lista de integrantes

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `only_active` | _Boolean_ |  `Padrão: true` `v2.25.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Member](#member)&gt;_| 


**Exemplo:**
```
Requisição
{
  "only_active": true
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": ""
    },
    {
      "id": "xyz",
      "name": ""
    }
  ]
}
```


---

### GetRoles
- v2.19.0

Lista de funções

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `only_active` | _Boolean_ |  `Padrão: true` `v2.25.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Role](#role)&gt;_| 


**Exemplo:**
```
Requisição
{
  "only_active": true
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": ""
    },
    {
      "id": "xyz",
      "name": ""
    }
  ]
}
```


---

### GetServices
- v2.22.0

Lista de cultos

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `only_active` | _Boolean_ |  `Padrão: true` `v2.25.0+` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Service](#service)&gt;_| 


**Exemplo:**
```
Requisição
{
  "only_active": true
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "name": "",
      "week": "all",
      "day": "sun",
      "hour": 19,
      "minute": 0,
      "description": "",
      "hide_week": [
        "second"
      ]
    },
    {
      "name": "Supper Worship",
      "week": "second",
      "day": "sun",
      "hour": 19,
      "minute": 0,
      "description": ""
    }
  ]
}
```


---

### GetEvents
- v2.22.0

Lista de eventos

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `month` | _Number_ | Mês (1-12) |
| `year` | _Number_ | Ano |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Event](#event)&gt;_| 


**Exemplo:**
```
Requisição
{
  "month": 8,
  "year": 2022
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "name": "Event name",
      "datetime": "2022-08-19 18:00",
      "wallpaper": ""
    },
    {
      "name": "Event name",
      "datetime": "2022-08-20 18:00",
      "wallpaper": ""
    }
  ]
}
```


---

### GetAnnouncement
- v2.22.0

Anúncio

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do anúncio |
| `name` | _String (opcional)_ | Nome do anúncio |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Announcement](#announcement)_| 


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
    "id": "abc",
    "name": "",
    "text": "",
    "archived": false
  }
}
```


---

### GetAnnouncements
- v2.22.0

Lista de anúncios



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Announcement](#announcement)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": "",
      "text": "",
      "archived": false
    },
    {
      "id": "xyz",
      "name": "",
      "text": "",
      "archived": false
    }
  ]
}
```


---

### GetModules
- v2.26.0

Lista de módulos

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _Object (opcional)_ | Filtro |
| `id` | _String (opcional)_ |  |
| `name` | _String (opcional)_ |  |
| `jscommunity_id` | _String (opcional)_ |  |
| `info_id` | _String (opcional)_ |  |
| `active` | _Boolean (opcional)_ |  |
| `enabled_by_user` | _Boolean (opcional)_ |  |
| `conditional_execution` | _Boolean (opcional)_ |  |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Module](#module)&gt;_| 


**Exemplo:**
```
Requisição
{}

Resposta
{
  "status": "ok",
  "data": {
    "id": "abc",
    "jscommunity_id": "xyz",
    "info_id": "xyz",
    "name": "Example",
    "active": false,
    "enabled_by_user": false,
    "conditional_execution": false,
    "show_panel": true,
    "available_in_main_window": true,
    "available_in_bible_window": true,
    "actions": {}
  }
}
```


---
