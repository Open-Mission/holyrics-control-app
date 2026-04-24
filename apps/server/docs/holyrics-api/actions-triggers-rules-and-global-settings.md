<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 6469-7194.
-->

# Ações: apresentação rápida, gatilhos, regras e configurações globais

### ActionNextQuickPresentation
- v2.24.0





_Método sem retorno_



---

### ActionPreviousQuickPresentation
- v2.24.0





_Método sem retorno_



---

### CloseCurrentQuickPresentation
- v2.24.0





_Método sem retorno_



---

### GetCurrentQuickPresentation
- v2.24.0





**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.id` | _String_ | ID do versículo atual |
| `data.slide_number` | _Number_ | Começa em 1 |
| `data.total_slides` | _Number_ | Total de versículos |
| `data.slide_type` | _String_ | Um dos seguintes valores: `default`  `wallpaper`  `blank`  `black`  `final_slide` |
| `data.slides` | _Array&lt;Object&gt;_ | Lista com os versículos da apresentação atual |
| `data.slides.*.number` | _Number_ | Número do slide. Começa em 1. |
| `data.slides.*.reference` | _String_ | Referência do versículo. Exemplo: **John 3:16** |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "id": "43003016",
    "slide_number": 1,
    "total_slides": 3,
    "slide_type": "default",
    "slides": [
      {
        "number": 1,
        "reference": "43003016"
      },
      {
        "number": 2,
        "reference": "43003017"
      },
      {
        "number": 3,
        "reference": "43003018"
      }
    ]
  }
}
```


---

### GetTriggers
- v2.24.0

Retorna a lista de gatilhos salvos



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.id` | _String_ | ID do item |
| `data.*.enabled` | _Boolean_ |  |
| `data.*.when` | _String_ | Pode ser: `displaying` `closing` `change` `event` |
| `data.*.type` | _String_ | Tipo do item. Pode ser:<br>**when=displaying**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `any_countdown` `any_automatic_presentation_slide` `f8` `f9` `f10`<br><br>**when=closing**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `f8` `f9` `f10`<br><br>**when=change**: `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue` `player_volume` `player_mute` `player_pause` `player_repeat` `player_list_or_single` `player_shuffle` `bible_version_1` `bible_version_2` `bible_version_3` `bible_any_version`<br><br>**when=event**: `new_message_chat` `verse_presentation_changed` `playlist_changed` `file_modified` `player_progress` `draw_lots_item_drawn` |
| `data.*.item.title` | _String_ |  |
| `data.*.item.reference` | _Object_ |  |
| `data.*.receiver.type` | _String_ | Pode ser: `get` `post` `ws` `tcp` `udp` `midi` `javascript` `community` `multiple_actions` `obs_v4` `obs_v5` `lumikit` `vmix` `osc` `soundcraft` `ha` `ptz` `tbot` `openai` |
| `data.*.description` | _String_ |  |
| `data.*.tags` | _Array&lt;String&gt;_ |  |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyz",
      "enabled": true,
      "when": "displaying",
      "type": "any_song",
      "item": {
        "title": "",
        "reference": {}
      },
      "receiver": {
        "type": "obs_v5"
      },
      "description": "",
      "tags": []
    }
  ]
}
```


---

### GetTriggerTags
- v2.27.0

Retorna a lista de tags dos gatilhos



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;String&gt;_| 




---

### GetTriggerPauseStateForTag
- v2.27.0

Retorna o estado do 'pause' da execução de gatilhos de uma tag específica

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `tag` | _String_ |  |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Boolean_| 


**Exemplo:**
```
Requisição
{
  "tag": "example"
}
```


---

### SetTriggerPauseStateForTag
- v2.27.0

Altera o estado do 'pause' da execução de gatilhos de uma tag específica

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `tag` | _String_ |  |
| `pause` | _Boolean_ |  |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "tag": "example",
  "pause": true
}
```


---

### GetTriggerPauseStateForReceiver
- v2.27.0

Retorna o estado do 'pause' da execução de gatilhos de um receptor específico

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `receiver` | _String_ | ID do receptor |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Boolean_| 


**Exemplo:**
```
Requisição
{
  "receiver": "xyz"
}
```


---

### SetTriggerPauseStateForReceiver
- v2.27.0

Altera o estado do 'pause' da execução de gatilhos de um receptor específico

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `receiver` | _String_ | ID do receptor |
| `pause` | _Boolean_ |  |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "receiver": "xyz",
  "pause": true
}
```


---

### GetScheduledTasks
- v2.26.0

Retorna a lista de tarefas agendadas



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[ScheduledTask](#scheduled-task)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "enabled": true,
      "time": "18:50:00",
      "days": [
        "sun"
      ],
      "item": {},
      "tags": []
    },
    {
      "id": "xyz",
      "enabled": true,
      "time": "18:55:00",
      "days": [
        "sun"
      ],
      "item": {},
      "tags": []
    }
  ]
}
```


---

### GetGlobalSettings
- v2.25.0



**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `filter` | _String (opcional)_ | Nome das configurações, separadas por vírgula |


**Resposta:**

| Tipo  |
| :---: |
| _[GlobalSettings](#global-settings)_ | 


**Exemplo:**
```
Requisição
{
  "filter": "show_favorite_bar_main_window,fade_in_out_duration"
}

Resposta
{
  "status": "ok",
  "data": {
    "show_favorite_bar_main_window": true,
    "fade_in_out_duration": 500
  }
}
```


---

### SetGlobalSettings
- v2.25.0



**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _[GlobalSettings](#global-settings)_ |  |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Object_ | Conjunto chave/valor com o resultado da alteração de cada item.<br>`true` se o valor foi alterado com sucesso, ou uma `string` com o motivo do erro. |


**Exemplo:**
```
Requisição
{
  "show_favorite_bar_main_window": true,
  "fade_in_out_duration": 100
}

Resposta
{
  "status": "ok",
  "data": {
    "show_favorite_bar_main_window": true,
    "fade_in_out_duration": "invalid value: 100"
  }
}
```


---

### GetStyledModels
- v2.25.0





**Resposta:**

| Tipo  |
| :---: |
| _[StyledModel](#styled-model)_ | 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "key": "title",
      "properties": {
        "b": "true",
        "size": "120"
      }
    },
    {
      "key": "footer",
      "properties": {
        "i": "true",
        "size": "80"
      }
    }
  ]
}
```


---

### GetStyledModelsAsMap
- v2.25.0





**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Conjunto chave/valor<br>`StyledModel#key : StyledModel#properties` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "title": {
      "b": "true",
      "size": "120"
    },
    "footer": {
      "i": "true",
      "size": "80"
    }
  }
}
```


---

### GetMidiSettings
- v2.26.0





**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.codes` | _Object_ | Conjunto chave/valor<br>A chave é o id da respectiva ação e o valor é o código MIDI `0 ~ 127`<br>IDs disponíveis: `presentation_action_next` `presentation_action_previous` `presentation_action_exit` `presentation_action_blank` `presentation_action_black` `presentation_action_wallpaper` `presentation_action_next_playlist_item` `presentation_action_previous_playlist_item` `media_player_play_pause` `media_player_stop` `media_player_next` `media_player_previous` `media_player_mute` `media_player_fullscreen` `media_player_volume` `presentation_action_go_to_slide` `select_item_from_song_playlist` `select_item_from_media_playlist` `multiple_choice` `shortcut_1` `shortcut_2` `shortcut_3` `shortcut_4` `shortcut_5` `shortcut_6` `shortcut_7` `shortcut_8` `shortcut_9` `shortcut_10` `shortcut_11` `shortcut_12` `shortcut_13` `shortcut_14` `shortcut_15` `shortcut_16` |
| `data.settings` | _Object_ | Configurações |
| `data.settings.base_octave` | _Object_ | Número base de início da oitava para código midi = 0 (zero).<br>Ou seja, se `base_octave=-1`, então `código midi=0` é igual a `C-1`<br>Pode ser -1 ou -2 |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "codes": {
      "presentation_action_next": 0,
      "presentation_action_previous": 1,
      "presentation_action_exit": 2,
      "presentation_action_blank": 3,
      "presentation_action_black": 4,
      "presentation_action_wallpaper": 5,
      "media_player_play_pause": 6,
      "media_player_stop": 7,
      "media_player_next": 8,
      "media_player_previous": 9,
      "media_player_mute": 10,
      "media_player_fullscreen": 11,
      "media_player_volume": 12,
      "presentation_action_go_to_slide": 13,
      "select_item_from_song_playlist": 14,
      "select_item_from_media_playlist": 15,
      "shortcut_1": 16,
      "shortcut_2": 17,
      "shortcut_3": 18,
      "shortcut_4": 19,
      "shortcut_5": 20,
      "shortcut_6": 21,
      "shortcut_7": 22,
      "shortcut_8": 23,
      "shortcut_9": 24,
      "shortcut_10": 25,
      "shortcut_11": 26,
      "shortcut_12": 27,
      "shortcut_13": 28,
      "shortcut_14": 29,
      "shortcut_15": 30,
      "shortcut_16": 31
    },
    "settings": {
      "base_octave": -1
    }
  }
}
```


---

### GetRuleGroupList
- v2.26.0

Retorna os grupos de regras salvas



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[RuleGroup](#rule-group)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": "Example",
      "match_mode": "all",
      "rules": [
        {
          "id": "...",
          "enabled": true,
          "description": "",
          "type": {
            "id": "day_of_week",
            "name": "",
            "settings_type": "custom"
          },
          "data": {
            "days": [
              "sun",
              "tue",
              "thu",
              "sat"
            ]
          }
        },
        {
          "id": "hhmtGGcqjhpz",
          "enabled": false,
          "description": "",
          "type": {
            "id": "day_of_month",
            "name": "",
            "settings_type": "native",
            "native_type": "number",
            "operator": "is_between"
          },
          "data": {
            "values": [
              "12",
              "15"
            ]
          }
        }
      ],
      "metadata": {
        "modified_time_millis": "0"
      }
    }
  ]
}
```


---

### GetRuleGroup
- v2.26.0

Retorna um grupo de regras salva

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do grupo de regras |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[RuleGroup](#rule-group)_| 


**Exemplo:**
```
Requisição
{
  "id": "abc"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "abc",
    "name": "Example",
    "match_mode": "all",
    "rules": [
      {
        "id": "...",
        "enabled": true,
        "description": "",
        "type": {
          "id": "day_of_week",
          "name": "",
          "settings_type": "custom"
        },
        "data": {
          "days": [
            "sun",
            "tue",
            "thu",
            "sat"
          ]
        }
      },
      {
        "id": "hhmtGGcqjhpz",
        "enabled": false,
        "description": "",
        "type": {
          "id": "day_of_month",
          "name": "",
          "settings_type": "native",
          "native_type": "number",
          "operator": "is_between"
        },
        "data": {
          "values": [
            "12",
            "15"
          ]
        }
      }
    ],
    "metadata": {
      "modified_time_millis": "0"
    }
  }
}
```


---

### TestRuleGroup
- v2.26.0

Retorna o resultado do teste de um grupo de regras salvas (ou de uma regra específica do respectivo grupo)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do grupo de regras |
| `rule_id` | _String (opcional)_ | ID da regra específica a ser testada em vez de testar todo o grupo |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Boolean_ | `true` or `false` |


**Exemplo:**
```
Requisição
{
  "id": "abc"
}
```


---
