<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 5639-6468.
-->

# Ações: Bíblia, runtime e informações do sistema

### GetBibleVersions
- v2.21.0

`deprecated` Substituído por: hly('GetBibleVersionsV2')<br>Retorna a lista de versões disponíveis da Bíblia, e também dos atalhos associados



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.key` | _String_ | Abreviação da versão ou o nome do atalho, se começar com '#shortcut ' |
| `data.*.title` | _String_ | Nome da versão |
| `data.*.version` | _String (opcional)_ | Abreviação da versão. Disponível se o item for um atalho, ou seja se 'key' começar com '#shortcut ' |
| `data.*.language` | _Object_ | Idioma `v2.24.0+` |
| `data.*.language.id` | _String_ | ID do item `v2.24.0+` |
| `data.*.language.iso` | _String_ | ISO 639 two-letter language code `v2.24.0+` |
| `data.*.language.name` | _String_ | Nome em inglês `v2.24.0+` |
| `data.*.language.alt_name` | _String_ | Nome no próprio idioma definido em `language`. Pode ser null. `v2.24.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "key": "en_kjv",
      "title": "King James Version"
    },
    {
      "key": "en_akjv",
      "title": "American King James Version"
    },
    {
      "key": "#shortcut Example",
      "title": "King James Version",
      "version": "en_kjv"
    }
  ]
}
```


---

### GetBibleVersionsV2
- v2.23.0

Retorna a lista de versões disponíveis da Bíblia, e também dos atalhos associados



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.key` | _String_ | ID do item |
| `data.*.version` | _String_ | ID da versão da Bíblia |
| `data.*.title` | _String_ | Nome da versão ou nome do atalho |
| `data.*.language` | _Object_ | Idioma `v2.24.0+` |
| `data.*.language.id` | _String_ | ID do item `v2.24.0+` |
| `data.*.language.iso` | _String_ | ISO 639 two-letter language code `v2.24.0+` |
| `data.*.language.name` | _String_ | Nome em inglês `v2.24.0+` |
| `data.*.language.alt_name` | _String_ | Nome no próprio idioma definido em `language`. Pode ser null. `v2.24.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "key": "en_kjv",
      "version": "en_kjv",
      "title": "King James Version",
      "language": {
        "id": "en",
        "iso": "en",
        "name": "English",
        "alt_name": "English"
      }
    },
    {
      "key": "pt_acf",
      "version": "pt_acf",
      "title": "Almeida Corrigida Fiel",
      "language": {
        "id": "pt",
        "iso": "pt",
        "name": "Portuguese",
        "alt_name": "Português"
      }
    }
  ]
}
```


---

### GetBibleSettings
- v2.21.0

Configurações do módulo Bíblia



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[BibleSettings](#bible-settings)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "tab_version_1": "pt_???",
    "tab_version_2": "es_???",
    "tab_version_3": "en_???",
    "show_x_verses": 1,
    "uppercase": false,
    "show_only_reference": false,
    "show_second_version": false,
    "show_third_version": false,
    "book_panel_type": "grid",
    "book_panel_order": "automatic",
    "book_panel_order_available_items": [
      "automatic",
      "standard",
      "ru",
      "tyv"
    ],
    "multiple_verses_separator_type": "double_line_break",
    "versification": true,
    "theme": {
      "public": 123,
      "screen_n": null
    },
    "responsive_reading": {
      "display_two_verses": true,
      "descriptions": "Item 1\nItem 2",
      "font_color": "#FFFF00",
      "underline": false,
      "use_theme_effects": false,
      "change_description_last_verse": true,
      "description_last_verse": "All"
    }
  }
}
```


---

### SetBibleSettings
- v2.21.0

Alterar as configurações do módulo Bíblia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _[BibleSettings](#bible-settings)_ | Novas configurações. As configurações são individualmente opcionais. Preencha apenas os campos que deseja alterar. |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna **true** ou uma lista com os erros ocorridos |


**Exemplo:**
```
Requisição
{
  "tab_version_1": "pt_acf",
  "show_x_verses": 1,
  "theme": {
    "public": "123"
  }
}

Resposta
{
  "status": "ok",
  "data": true
}
```


---

### GetPresentationFooterSettings
- v2.23.0

Configurações do rodapé de apresentação



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.rows` | _Number_ | Quantidade de linhas. `1 ~ 4` |
| `data.preview_mode` | _String_ | Valores aceitos: `text` `image` |
| `data.minimized` | _Boolean_ |  |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "rows": 2,
    "preview_mode": "text",
    "minimized": false
  }
}
```


---

### SetPresentationFooterSettings
- v2.23.0

Alterar as configurações do rodapé de apresentação

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `rows` | _Number_ | Quantidade de linhas. `1 ~ 4` |
| `preview_mode` | _String_ | Valores aceitos: `text` `image` |
| `minimized` | _Boolean_ |  |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna **true** ou uma lista com os erros ocorridos |


**Exemplo:**
```
Requisição
{
  "rows": 2,
  "preview_mode": "text",
  "minimized": false
}

Resposta
{
  "status": "ok",
  "data": {}
}
```


---

### GetBpm
- v2.19.0

Retorna o valor BPM atual definido no programa



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Number_ | Valor BPM atual |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": 80
}
```


---

### SetBpm
- v2.19.0

Altera o valor BPM atual do programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `bpm` | _Number_ | Valor BPM |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "bpm": 80
}
```


---

### GetHue
- v2.19.0

Retorna o valor matiz atual definido no programa



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Number_ | Valor matiz atual. Mínimo=0, Máximo=360. Retorna **null** se desativado. |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": 120
}
```


---

### SetHue
- v2.19.0

Altera o valor matiz atual do programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `hue` | _Number_ | Valor matiz. Mínimo=0, Máximo=360 ou **null** para desativar. |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "hue": null
}
```


---

### GetRuntimeEnvironment
### GetRE
- v2.19.0

Retorna o nome do ambiente de execução definido atualmente nas configurações do programa.



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _String_ | Nome do ambiente de execução |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": "runtime environment name"
}
```


---

### SetRuntimeEnvironment
### SetRE
- v2.19.0

Altera o ambiente de execução atual.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do ambiente de execução |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "runtime environment name"
}
```


---

### SetLogo
- v2.19.0

Alterar as configurações da funcionalidade *Logo* do programa (menu ferramentas)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enable` | _Boolean (opcional)_ | Ativar/desativar a funcionalidade |
| `hide` | _Boolean (opcional)_ | Exibir/ocultar a funcionalidade |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "enable": true,
  "hide": true
}
```


---

### GetSyncStatus
- v2.19.0

Retorna o estado atual da sincronização online via Google Drive™



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.enabled` | _Boolean_ | Se a sincronização está ativada |
| `data.started` | _Boolean_ | Se a sincronização foi iniciada (internet disponível, por exemplo) |
| `data.progress` | _Number_ | Progresso da sincronização de 0 a 100 |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "enabled": true,
    "started": true,
    "progress": 99
  }
}
```


---

### GetInterfaceInput
- v2.21.0

Retorna o valor de um campo da interface do programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item. Pode ser: <br>`main_lyrics_tab_search`<br>`main_text_tab_search`<br>`main_audio_tab_search`<br>`main_video_tab_search`<br>`main_image_tab_search`<br>`main_file_tab_search`<br>`main_automatic_presentation_tab_search`<br>`main_selected_theme`<br>`main_selected_song_group_filter`<br>`main_selected_tab_event`<br> <br>`2.27.0`<br><br>`main_song_tab_selected_item`<br>`main_text_tab_selected_item`<br>`main_text_tab_selected_folder`<br>`main_audio_tab_selected_item`<br>`main_video_tab_selected_item`<br>`main_image_tab_selected_item`<br>`main_file_tab_selected_item`<br>`main_custom_message_tab_selected_item`<br>`main_automatic_presentation_tab_selected_item` |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _String_ | Conteúdo do item |


**Exemplo:**
```
Requisição
{
  "id": "main_lyrics_tab_search"
}

Resposta
{
  "status": "ok",
  "data": "input value"
}
```


---

### SetInterfaceInput
- v2.21.0

Altera o valor de um campo da interface do programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item. Pode ser: <br>`main_lyrics_tab_search`<br>`main_text_tab_search`<br>`main_audio_tab_search`<br>`main_video_tab_search`<br>`main_image_tab_search`<br>`main_file_tab_search`<br>`main_automatic_presentation_tab_search`<br>`main_selected_theme`<br>`main_selected_song_group_filter`<br>`main_selected_tab_event`<br> <br>`2.27.0`<br><br>`main_song_tab_selected_item`<br>`main_text_tab_selected_item`<br>`main_text_tab_selected_folder`<br>`main_audio_tab_selected_item`<br>`main_video_tab_selected_item`<br>`main_image_tab_selected_item`<br>`main_file_tab_selected_item`<br>`main_custom_message_tab_selected_item`<br>`main_automatic_presentation_tab_selected_item` |
| `value` | _String_ | Novo valor |
| `focus` | _Boolean (opcional)_ | Fazer o componente receber o foco do sistema |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "main_lyrics_tab_search",
  "value": "new input value",
  "focus": true
}
```


---

### SelectVerse
- v2.21.0

Seleciona um versículo na janela da Bíblia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do versículo |
| `reference` | _String (opcional)_ | Referência do versículo |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "43003016"
}
```


---

### OpenDrawLots
- v2.21.0

Abre a janela de sorteio a partir de uma lista de itens

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `items` | _Array&lt;String&gt;_ | Lista com os itens para serem sorteados |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "items": [
    "Item 1",
    "Item 2",
    "Item 3"
  ]
}
```


---

### GetMediaDuration
- v2.21.0

Retorna a duração da mídia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | Tipo do item. Pode ser: `video`, `audio`, `automatic_presentation` |
| `name` | _String_ | Nome do item |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.type` | _String_ |  |
| `data.name` | _String_ |  |
| `data.duration` | _Number_ | Duração em segundos |
| `data.duration_ms` | _Number_ | Duração em milissegundos |


**Exemplo:**
```
Requisição
{
  "type": "audio",
  "name": "file.mp3"
}

Resposta
{
  "status": "ok",
  "data": {
    "type": "audio",
    "name": "file.mp3",
    "duration": 128,
    "duration_ms": 128320
  }
}
```


---

### GetVersion
- v2.22.0

Retorna informações da versão do programa em execução



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.version` | _String_ | Versão do programa |
| `data.platform` | _String_ | Sistema operacional. Pode ser: `win` `uni` `osx` |
| `data.platformDescription` | _String_ | Nome detalhado do sistema operacional |
| `data.baseDir` | _String_ |  `v2.24.0+` |
| `data.language` | _String_ |  `v2.24.0+` |
| `data.platformLanguage` | _String_ |  `v2.26.0+` |
| `data.theme` | _String_ | Um dos seguintes valores: `DEFAULT` `DARK_SOFT` `DARK_MEDIUM` `DARK_STRONG` `v2.24.0+` |
| `data.jscVersion` | _String_ | JS Community Version y.m.d `v2.24.0+` |
| `data.ip_list` | _Array&lt;String&gt;_ |  `v2.26.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "data": {
      "version": "2.22.0",
      "platform": "win",
      "platformDescription": "Windows 10",
      "baseDir": "C:\\Holyrics",
      "language": "pt",
      "theme": "DARK_STRONG",
      "jscVersion": "24.10.12"
    }
  }
}
```


---

### GetHolyricsPlanInfo
- v2.28.0

Retorna informações da assinatura atual



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.type` | _String_ | `none` `basic` `advanced` `advanced_content` |
| `data.name` | _String_ |  |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "type": "none",
    "name": ""
  }
}
```


---

### GetAPIServerInfo
- v2.26.0

Retorna informações do servidor API



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.enabled_local` | _Boolean_ | Se está ativado para acesso local |
| `data.enabled_web` | _Boolean_ | Se está ativado para acesso pela internet |
| `data.port` | _Number_ |  |
| `data.ip_list` | _Array&lt;String&gt;_ |  |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "enabled_local": false,
    "enabled_web": false,
    "port": 8091,
    "ip_list": [
      "192.168.0.123"
    ]
  }
}
```


---

### GetRealTimeSongKey
- v2.24.0



**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.key` | _String_ | `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |


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
    "key": "Em"
  }
}
```


---

### SetRealTimeSongKey
- v2.24.0



**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `key` | _String_ | `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123",
  "key": "Am"
}
```


---
