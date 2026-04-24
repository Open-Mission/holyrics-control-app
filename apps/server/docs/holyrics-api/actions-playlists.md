<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 1945-2610.
-->

# Ações: playlists

### GetLyricsPlaylist
### GetSongPlaylist
- v2.19.0

Lista de reprodução de letras



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Lyrics](#lyrics)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "123",
      "title": "",
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
      "title": "",
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

### AddLyricsToPlaylist
### AddSongsToPlaylist
- v2.19.0

Adicionar letra de música na lista de reprodução

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID da letra |
| `ids` | _Array&lt;String&gt; (opcional)_ | Lista com id de cada letra |
| `index` | _Number (opcional)_ | Posição na lista onde o item será adicionado (inicia em zero). Os itens são adicionados no final da lista por padrão. `Padrão: -1` |
| `media_playlist` | _Boolean (opcional)_ | Adicionar as letras na lista de reprodução de mídia `Padrão: false` |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123",
  "ids": [
    123,
    456,
    789
  ],
  "index": 3,
  "media_playlist": false
}
```


---

### RemoveFromLyricsPlaylist
### RemoveFromSongPlaylist
- v2.19.0

Remover letra de música na lista de reprodução

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID da letra |
| `ids` | _Array&lt;String&gt; (opcional)_ | Lista com id de cada letra |
| `index` | _Number (opcional)_ | Posição do item na lista que será removido (inicia em zero). |
| `indexes` | _Array&lt;Number&gt; (opcional)_ | Lista com a posição de cada item na lista que será removido. (Inicia em zero) |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123",
  "ids": [
    "123",
    "456",
    "789"
  ],
  "index": 3,
  "indexes": [
    3,
    4,
    5
  ]
}
```


---

### SetLyricsPlaylistItem
### SetSongPlaylistItem
- v2.22.0

Alterar um item da lista de reprodução de letra de música

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `index` | _Number_ | Índice do item na lista |
| `song_id` | _String_ | Novo item |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "index": 2,
  "song_id": "123"
}
```


---

### GetMediaPlaylist
- v2.19.0

Lista de reprodução de mídia



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Item](#item)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
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
}
```


---

### SetMediaPlaylistItem
- v2.22.0

Alterar um item da lista de reprodução de mídia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `index` | _Number_ | Índice do item na lista |
| `item` | _[AddItem](#add-item)_ | Novo item |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "index": 0,
  "item": {
    "type": "song",
    "id": "123"
  }
}
```


---

### MediaPlaylistAction
- v2.19.0

Executa um item da lista de reprodução de mídia

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

### GetNextSongPlaylist
- v2.22.0

Retorna a próxima música da lista de reprodução. Pode ser null



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Lyrics](#lyrics)_| 


**Exemplo:**
```
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
    "groups": [],
    "archived": false
  }
}
```


---

### GetNextMediaPlaylist
- v2.22.0

Retorna o próximo item executável da lista de reprodução de mídia. Pode ser null



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Item](#item)_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "id": "abc123",
    "type": "song",
    "name": ""
  }
}
```


---

### ShowNextSongPlaylist
- v2.22.0

Executa a próxima música da lista de reprodução



_Método sem retorno_



---

### ShowNextMediaPlaylist
- v2.22.0

Executa o próximo item da lista de reprodução de mídia



_Método sem retorno_



---

### GetPreviousSongPlaylist
- v2.22.0

Retorna a música anterior da lista de reprodução. Pode ser null



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Lyrics](#lyrics)_| 


**Exemplo:**
```
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
    "groups": [],
    "archived": false
  }
}
```


---

### GetPreviousMediaPlaylist
- v2.22.0

Retorna o item anterior executável da lista de reprodução de mídia. Pode ser null



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[Item](#item)_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "id": "abc123",
    "type": "song",
    "name": ""
  }
}
```


---

### ShowPreviousSongPlaylist
- v2.22.0

Executa a música anterior da lista de reprodução



_Método sem retorno_



---

### ShowPreviousMediaPlaylist
- v2.22.0

Executa o item anterior da lista de reprodução de mídia



_Método sem retorno_



---

### AddToPlaylist
- v2.20.0

Adicionar itens à lista de reprodução de mídias

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `items` | _Array&lt;[AddItem](#add-item)&gt;_ | Lista com os itens que serão adicionados |
| `index` | _Number (opcional)_ | Posição na lista onde o item será adicionado (inicia em zero). Os itens são adicionados no final da lista por padrão. `Padrão: -1` |
| `ignore_duplicates` | _Boolean (opcional)_ | Não duplicar itens ao adicionar novos itens, ou seja, não adiciona um item se ele já estiver na lista. `Padrão: false` |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "items": [
    {
      "type": "title",
      "name": "Título",
      "background_color": "000080"
    },
    {
      "type": "song",
      "id": 12345678
    },
    {
      "type": "verse",
      "id": "19023001"
    },
    {
      "type": "verse",
      "ids": [
        "19023001",
        "43003016"
      ]
    },
    {
      "type": "verse",
      "references": "Sl 23.1 Rm 12:2"
    },
    {
      "type": "text",
      "id": "abcxyz"
    },
    {
      "type": "audio",
      "name": "example.mp3"
    },
    {
      "type": "video",
      "name": "example.mp4"
    },
    {
      "type": "image",
      "name": "example.jpg"
    },
    {
      "type": "automatic_presentation",
      "name": "example.ap"
    },
    {
      "type": "title",
      "name": "Título 2"
    },
    {
      "type": "announcement",
      "id": 12345678
    },
    {
      "type": "announcement",
      "ids": [
        123,
        456
      ]
    },
    {
      "type": "announcement",
      "name": "example"
    },
    {
      "type": "announcement",
      "names": [
        "example 2",
        "example 3"
      ]
    },
    {
      "type": "announcement",
      "id": "all",
      "automatic": {
        "seconds": 8,
        "repeat": false
      }
    },
    {
      "type": "title",
      "name": "Título 3"
    },
    {
      "type": "countdown",
      "time": "03:15"
    },
    {
      "type": "countdown_cp",
      "minutes": 15,
      "stop_at_zero": true
    },
    {
      "type": "cp_text",
      "text": "example"
    },
    {
      "type": "script",
      "id": "abcxyz"
    },
    {
      "type": "api",
      "id": "abcxyz"
    }
  ]
}
```


---

### RemoveFromMediaPlaylist
- v2.19.0

Remover itens da lista de reprodução de mídia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `ids` | _Array&lt;String&gt; (opcional)_ | Lista com id de cada item |
| `index` | _Number (opcional)_ | Posição do item na lista que será removido (inicia em zero). |
| `indexes` | _Array&lt;Number&gt; (opcional)_ | Lista com a posição de cada item na lista que será removido. (Inicia em zero) |
| `event_id` | _String (opcional)_ | Para alterar a lista de reprodução de um culto ou evento específico.<br>Quando `event_id` não for declarado, a lista de reprodução atualmente selecionada na interface será editada.<br>Atenção, disponível somente a partir da versão `2.26.0`, significa que em versões anteriores este método sempre vai alterar a lista de reprodução atualmente selecionada na interface, ignorando este parâmetro `event_id` `Padrão: null` `v2.26.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abc",
  "ids": [
    "abc",
    "xyz"
  ],
  "index": 3,
  "indexes": [
    2,
    3
  ]
}
```


---

### SetPlaylistItemDuration
- v2.21.0

Alterar duração de um item da lista de reprodução de mídia.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `index` | _Number (opcional)_ | Posição do item na lista (inicia em zero). |
| `duration` | _Number (opcional)_ | Duração do item (em segundos) |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "xyz",
  "duration": 300
}
```


---

### SetPlaylistItemMidiTimeCode
### SetPlaylistItemMTC
- v2.28.0

Alterar o timecode de um item da lista de reprodução de mídia.<br>Obs: Atualmente disponível apenas para áudio e vídeo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `index` | _Number (opcional)_ | Posição do item na lista (inicia em zero). |
| `midi_time_code` | _Number_ | Tempo em milissegundos |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "abc",
  "midi_time_code": 120000
}
```


---

### GetSlideDescriptions
