<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 7195-7598.
-->

# Ações: templates, criação/edição de itens e agenda

### GetTransitionEffectTemplateSettingsList
- v2.26.0

Retorna a lista com os modelos de efeito de transição



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[TransitionEffectTemplateSettings](#transition-effect-template-settings)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "abc",
      "name": "Example 01",
      "enabled": true,
      "type": "fade",
      "duration": 700,
      "only_area_within_margin": false,
      "merge": false,
      "division_point": 30,
      "increase_duration_blank_slides": false,
      "metadata": {
        "modified_time_millis": "0"
      }
    },
    {
      "id": "xyz",
      "name": "Example 02",
      "enabled": true,
      "type": "fade",
      "duration": 700,
      "only_area_within_margin": false,
      "merge": false,
      "division_point": 30,
      "increase_duration_blank_slides": false,
      "metadata": {
        "modified_time_millis": "0"
      }
    },
    {
      "id": "abcxyz",
      "name": "Example 03",
      "enabled": true,
      "type": "zoom",
      "duration": 800,
      "only_area_within_margin": false,
      "zoom_type": "increase",
      "directions": {
        "top_left": false,
        "top_center": false,
        "top_right": false,
        "middle_left": false,
        "middle_center": true,
        "middle_right": false,
        "bottom_left": false,
        "bottom_center": false,
        "bottom_right": false
      },
      "metadata": {
        "modified_time_millis": "0"
      }
    }
  ]
}
```


---

### GetTransitionEffectTemplateSettings
- v2.26.0

Retorna um modelo de efeito de transição

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do modelo |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _[TransitionEffectTemplateSettings](#transition-effect-template-settings)_| 


**Exemplo:**
```
Requisição
{
  "id": "abcxyz"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "abcxyz",
    "name": "Example 03",
    "enabled": true,
    "type": "zoom",
    "duration": 800,
    "only_area_within_margin": false,
    "zoom_type": "increase",
    "directions": {
      "top_left": false,
      "top_center": false,
      "top_right": false,
      "middle_left": false,
      "middle_center": true,
      "middle_right": false,
      "bottom_left": false,
      "bottom_center": false,
      "bottom_right": false
    },
    "metadata": {
      "modified_time_millis": "0"
    }
  }
}
```


---

### SetTransitionEffectTemplateSettings
- v2.26.0

Alterar as configurações de um modelo de efeito de transição

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _Object_ | ID do item |
| `settings` | _[TransitionEffectSettings](#transition-effect-settings)_ | Novas configurações. As configurações são individualmente opcionais. Preencha apenas os campos que deseja alterar. |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna **true** ou uma lista com os erros ocorridos |


**Exemplo:**
```
Requisição
{
  "id": "abcxyz",
  "settings": {
    "type": "zoom",
    "duration": 800,
    "zoom_type": "increase",
    "directions": {
      "middle_left": true,
      "middle_center": true,
      "middle_right": true
    }
  }
}

Resposta
{
  "status": "ok",
  "data": {}
}
```


---

### CreateItem
- v2.25.0

Cria um novo item<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada<br>Para utilizar esta ação é necessário liberar a permissão nas configurações<br>`menu arquivo > configurações > avançado > javascript > configurações > permissões avançadas`<br>Ou se estiver utilizando a implementação de um módulo, liberar permissão nas configurações do módulo e utilizar o método `hly` da classe **Module** `module.hly(action, input)`<br> <br>A estrutura do objeto passado como parâmetro deve ser de acordo com a tabela a seguir<br><table><tr><td><p align="right">**Ação**</p></td><td>Tipo</td></tr><tr><td><p align="right">CreateSong</p></td><td>[Lyrics](#lyrics)</td></tr><tr><td><p align="right">CreateText</p></td><td>[Text](#text)</td></tr><tr><td><p align="right">CreateTheme</p></td><td>[Theme](#theme)</td></tr><tr><td><p align="right">CreateTeam</p></td><td>[Team](#team)</td></tr><tr><td><p align="right">CreateRole</p></td><td>[Role](#role)</td></tr><tr><td><p align="right">CreateMember</p></td><td>[Member](#member)</td></tr><tr><td><p align="right">CreateEvent</p></td><td>[Event](#event)</td></tr><tr><td><p align="right">CreateSongGroup</p></td><td>[Group](#group)</td></tr></table>



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna o item criado |


**Exemplo:**
```
Requisição
{
  "status": "ok",
  "data": {
    "title": "Title",
    "artist": "Artist",
    "author": "Author",
    "slides": [
      {
        "text": "Example",
        "slide_description": "Verse 1",
        "translations": {
          "pt": "Exemplo"
        }
      },
      {
        "text": "Example",
        "slide_description": "Chorus",
        "translations": {
          "pt": "Exemplo"
        }
      },
      {
        "text": "Example",
        "slide_description": "Verse 2",
        "translations": {
          "pt": "Exemplo"
        }
      }
    ],
    "title_translations": {
      "pt": "Título"
    },
    "orde": "1,2,3,2,2",
    "key": "G",
    "bpm": 80,
    "time_sig": "4/4"
  }
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "123",
    "title": "Title",
    "artist": "Artist",
    "author": "Author",
    "slides": [
      {
        "text": "Example",
        "slide_description": "Verse 1",
        "translations": {
          "pt": "Exemplo"
        }
      },
      {
        "text": "Example",
        "slide_description": "Chorus",
        "translations": {
          "pt": "Exemplo"
        }
      },
      {
        "text": "Example",
        "slide_description": "Verse 2",
        "translations": {
          "pt": "Exemplo"
        }
      }
    ],
    "title_translations": {
      "pt": "Título"
    },
    "orde": "1,2,3,2,2",
    "key": "G",
    "bpm": 80,
    "time_sig": "4/4"
  }
}
```


---

### EditItem
- v2.25.0

Edita um item existente<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada<br>Para utilizar esta ação é necessário liberar a permissão nas configurações<br>`menu arquivo > configurações > avançado > javascript > configurações > permissões avançadas`<br>Ou se estiver utilizando a implementação de um módulo, liberar permissão nas configurações do módulo e utilizar o método `hly` da classe **Module** `module.hly(action, input)`<br> <br>Todos os parâmetros são opcionais, exceto: `id`<br>Somente os parâmetros declarados serão alterados, ou seja, não é necessário informar o objeto completo para alterar somente um parâmetro.<br>Parâmetros definidos como `read-only` não são editáveis <br>A estrutura do objeto passado como parâmetro deve ser de acordo com a tabela a seguir<br><table><tr><td><p align="right">**Ação**</p></td><td>Tipo</td></tr><tr><td><p align="right">EditSong</p></td><td>[Lyrics](#lyrics)</td></tr><tr><td><p align="right">EditText</p></td><td>[Text](#text)</td></tr><tr><td><p align="right">EditTheme</p></td><td>[Theme](#theme)</td></tr><tr><td><p align="right">EditTeam</p></td><td>[Team](#team)</td></tr><tr><td><p align="right">EditRole</p></td><td>[Role](#role)</td></tr><tr><td><p align="right">EditMember</p></td><td>[Member](#member)</td></tr><tr><td><p align="right">EditEvent</p></td><td>[Event](#event)</td></tr><tr><td><p align="right">EditSongGroup</p></td><td>[Group](#group)</td></tr></table>



_Método sem retorno_



---

### DeleteItem
- v2.25.0

Apaga um item existente<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada<br>Para utilizar esta ação é necessário liberar a permissão nas configurações<br>`menu arquivo > configurações > avançado > javascript > configurações > permissões avançadas`<br>Ou se estiver utilizando a implementação de um módulo, liberar permissão nas configurações do módulo e utilizar o método `hly` da classe **Module** `module.hly(action, input)`<br> <br>Informe o id do respectivo item para removê-lo.<br> <br><table><tr><td><p align="right">**Ação**</p></td></tr><tr><td><p align="right">DeleteSong</p></td></tr><tr><td><p align="right">DeleteText</p></td></tr><tr><td><p align="right">DeleteTheme</p></td></tr><tr><td><p align="right">DeleteTeam</p></td></tr><tr><td><p align="right">DeleteRole</p></td></tr><tr><td><p align="right">DeleteMember</p></td></tr><tr><td><p align="right">DeleteEvent</p></td></tr><tr><td><p align="right">DeleteSongGroup</p></td></tr></table>

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do respectivo item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123"
}
```


---

### AddSongsToSongGroup
- v2.25.0

Adiciona músicas a um grupo<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada<br>Para utilizar esta ação é necessário liberar a permissão nas configurações<br>`menu arquivo > configurações > avançado > javascript > configurações > permissões avançadas`<br>Ou se estiver utilizando a implementação de um módulo, liberar permissão nas configurações do módulo e utilizar o método `hly` da classe **Module** `module.hly(action, input)`

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `group` | _String_ | Nome do grupo |
| `songs` | _String_ | Lista com o id das músicas, separados por vírgula |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "group": "Name",
  "songs": "123,456"
}
```


---

### RemoveSongsFromSongGroup
- v2.25.0

Remove músicas de um grupo<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada<br>Para utilizar esta ação é necessário liberar a permissão nas configurações<br>`menu arquivo > configurações > avançado > javascript > configurações > permissões avançadas`<br>Ou se estiver utilizando a implementação de um módulo, liberar permissão nas configurações do módulo e utilizar o método `hly` da classe **Module** `module.hly(action, input)`

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `group` | _String_ | Nome do grupo |
| `songs` | _String_ | Lista com o id das músicas, separados por vírgula |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "group": "Name",
  "songs": "123,456"
}
```


---

### SetCurrentSchedule
- v2.26.0

Alterar o culto ou evento atualmente selecionado na interface<br> <br>Esta ação requer uma assinatura [Holyrics Plan](https://holyrics.com.br/holyrics_plan.html) para ser executada

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `event_id` | _String_ | ID do evento Pode ser obtido de um objeto **Schedule** |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "event_id": "abcxyz"
}
```


---



# Classes
