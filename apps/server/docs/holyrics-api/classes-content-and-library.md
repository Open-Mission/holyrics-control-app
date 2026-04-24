<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 7600-8294.
-->

# Classes: conteúdo, biblioteca e entidades operacionais

## Lyrics
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID da música |
| `title` | _String_ | Título da música |
| `artist` | _String_ | Artista da música |
| `author` | _String_ | Autor da música |
| `note` | _String_ | Anotação da música |
| `copyright` | _String_ | Copyright da música |
| `slides` | _Array&lt;Object&gt;_ |  `v2.21.0+` |
| `slides.*.text` | _String_ | Texto do slide `v2.21.0+` |
| `slides.*.styled_text` | _String_ | Texto do slide com formatação **styled** (quando disponível) `v2.24.0+` |
| `slides.*.slide_description` | _String_ | Descrição do slide `v2.21.1+` |
| `slides.*.background_id` | _String_ | ID do tema ou plano de fundo salvo para o slide `v2.21.0+` |
| `slides.*.translations` | _Object_ | Traduções para o slide.<br>Conjunto chave/valor. `v2.25.0+` |
| `formatting_type` | _String_ | `basic`  `styled`  `advanced`<br> <br>Ao utilizar este objeto em métodos de criação ou edição, se `formatting_type=basic` for utilizado, o valor da variável `slides.*.text` será utilizado, caso contrário, o valor da variável `slides.*.styled_text` será utilizado `Padrão: basic` `v2.25.0+` |
| `order` | _String_ | Ordem dos slides (índice a partir do 1), separado por vírgula `v2.21.0+` |
| `arrangements` | _Array&lt;[SongArrangement](#song-arrangement)&gt;_ |  `v2.25.1+` |
| `title_translations` | _Object_ | Traduções para o slide título.<br>Conjunto chave/valor. `v2.25.0+` |
| `key` | _String_ | Tom da música.<br>Pode ser: `C` `C#` `Db` `D` `D#` `Eb` `E` `F` `F#` `Gb` `G` `G#` `Ab` `A` `A#` `Bb` `B` `Cm` `C#m` `Dbm` `Dm` `D#m` `Ebm` `Em` `Fm` `F#m` `Gbm` `Gm` `G#m` `Abm` `Am` `A#m` `Bbm` `Bm` |
| `bpm` | _Number_ | BPM da música |
| `time_sig` | _String_ | Tempo da música.<br>Pode ser: `2/2` `2/4` `3/4` `4/4` `5/4` `6/4` `3/8` `6/8` `7/8` `9/8` `12/8` |
| `groups` | _Array&lt;[Group](#group)&gt;_ | Grupos onde a música está adicionada `read-only` |
| `linked_audio_file` | _String_ | Caminho do arquivo de áudio linkado com a música `v2.22.0+` |
| `linked_backing_track_file` | _String_ | Caminho do arquivo de áudio (playback) linkado com a música `v2.22.0+` |
| `streaming` | _Object_ | URI ou ID dos streamings `v2.22.0+` |
| `streaming.audio` | _Object_ | Áudio `v2.22.0+` |
| `streaming.audio.spotify` | _String_ |  `v2.22.0+` |
| `streaming.audio.youtube` | _String_ |  `v2.22.0+` |
| `streaming.audio.deezer` | _String_ |  `v2.22.0+` |
| `streaming.backing_track` | _Object_ | Playback `v2.22.0+` |
| `streaming.backing_track.spotify` | _String_ |  `v2.22.0+` |
| `streaming.backing_track.youtube` | _String_ |  `v2.22.0+` |
| `streaming.backing_track.deezer` | _String_ |  `v2.22.0+` |
| `midi` | _[Midi](#midi)_ | Atalho MIDI do item |
| `extras` | _Object_ | Mapa de objetos extras (adicionados pelo usuário) `v2.21.0+` |
| `theme` | _String_ | ID do tema salvo para a música `v2.25.0+` |
| `archived` | _Boolean_ | Se a música está arquivada |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "0",
  "title": "",
  "artist": "",
  "author": "",
  "note": "",
  "copyright": "",
  "language": "",
  "slides": [
    {
      "text": "Slide 1 line 1\nSlide 1 line 2",
      "styled_text": "Slide 1 line 1\nSlide 1 line 2",
      "slide_description": "Verse 1",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    },
    {
      "text": "Slide 2 line 1\nSlide 2 line 2",
      "styled_text": "Slide 2 line 1\nSlide 2 line 2",
      "slide_description": "Chorus",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    },
    {
      "text": "Slide 3 line 1\nSlide 3 line 2",
      "styled_text": "Slide 3 line 1\nSlide 3 line 2",
      "slide_description": "Verse 2",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    }
  ],
  "formatting_type": "basic",
  "order": "1,2,3,2,2",
  "title_translations": null,
  "key": "",
  "bpm": 0.0,
  "time_sig": "",
  "linked_audio_file": "",
  "linked_backing_track_file": "",
  "streaming": {
    "audio": {
      "spotify": "",
      "youtube": "",
      "deezer": ""
    },
    "backing_track": {
      "spotify": "",
      "youtube": "",
      "deezer": ""
    }
  },
  "extras": {
    "extra": ""
  },
  "theme": null,
  "transition_settings_id": null,
  "archived": false
}
```
</details>

## Text
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do texto |
| `title` | _String_ | Título do texto |
| `folder` | _String_ | Caminho da pasta de localização |
| `theme` | _String_ | ID do tema salvo para o texto |
| `slides` | _Array&lt;Object&gt;_ |  |
| `slides.*.text` | _String_ | Texto do slide |
| `slides.*.styled_text` | _String_ | Texto do slide com formatação **styled** (quanto disponível) `v2.24.0+` |
| `slides.*.background_id` | _String_ | ID do tema ou plano de fundo salvo para o slide |
| `slides.*.translations` | _Object_ | Traduções para o slide.<br>Conjunto chave/valor. `v2.25.0+` |
| `formatting_type` | _String_ | `basic`  `styled`  `advanced`<br> <br>Ao utilizar este objeto em métodos de criação ou edição, se `formatting_type=basic` for utilizado, o valor da variável `slides.*.text` será utilizado, caso contrário, o valor da variável `slides.*.styled_text` será utilizado `Padrão: basic` `v2.25.0+` |
| `extras` | _Object_ | Mapa de objetos extras (adicionados pelo usuário) `v2.24.0+` |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "title": "",
  "language": "",
  "folder": "",
  "theme": null,
  "transition_settings_id": null,
  "slides": [
    {
      "text": "Slide 1 line 1\nSlide 1 line 2",
      "styled_text": "Slide 1 line 1\nSlide 1 line 2",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    },
    {
      "text": "Slide 2 line 1\nSlide 2 line 2",
      "styled_text": "Slide 2 line 1\nSlide 2 line 2",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    },
    {
      "text": "Slide 3 line 1\nSlide 3 line 2",
      "styled_text": "Slide 3 line 1\nSlide 3 line 2",
      "background_id": null,
      "transition_settings_id": null,
      "translations": null
    }
  ],
  "formatting_type": "basic"
}
```
</details>

## Theme
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `copy_from_id` | _String (opcional)_ | ID de um Tema existente para utilizar como cópia inicial ao criar um novo item |
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| <br>**background** |  | <br>Plano de fundo |
| `background.type` | _String_ | Tipo do plano de fundo. Pode ser: `color`  `my_video`  `my_image`  `video`  `image`  `pattern`  `transparent`  `image_file`  `video_file` |
| `background.id` | _String_ | <table><tr><td><p align="right">**Tipo**</p></td><td>Valor</td></tr><tr><td><p align="right">color</p></td><td>Cor no formato hexadecimal</td></tr><tr><td><p align="right">my_video</p></td><td>ID do item</td></tr><tr><td><p align="right">my_image</p></td><td>ID do item</td></tr><tr><td><p align="right">video</p></td><td>ID do item</td></tr><tr><td><p align="right">image</p></td><td>ID do item</td></tr><tr><td><p align="right">pattern</p></td><td>ID do item</td></tr><tr><td><p align="right">transparent</p></td><td>"transparent"</td></tr><tr><td><p align="right">image_file</p></td><td>Nome do arquivo na biblioteca</td></tr><tr><td><p align="right">video_file</p></td><td>Nome do arquivo na biblioteca</td></tr></table> |
| `background.adjust_type` | _String_ | `fill` `extend` `adjust` `side_by_side` `center`<br>Disponível para: **type=my_image**, **type=image** |
| `background.opacity` | _Number_ | Opacidade. `0 ~ 100` |
| `background.velocity` | _Number_ | Disponível para: **type=my_video**, **type=video**<br>`0.25 ~ 4.0` |
| `base_color` | _String_ | Cor no formato hexadecimal. Cor base do plano de fundo ao diminuir a opacidade. |
| <br>**font** |  | <br>Fonte |
| `font.name` | _String_ | Nome da fonte |
| `font.bold` | _Boolean_ | Negrito |
| `font.italic` | _Boolean_ | Itálico |
| `font.size` | _Number_ | Tamanho `0.0 ~ 0.4`<br>Valor em porcentagem, baseado na altura do slide. |
| `font.color` | _String_ | Cor no formato hexadecimal |
| `font.line_spacing` | _Number_ | Espaçamento entre linhas. `-0.5 ~ 1.0`<br>Valor em porcentagem baseado na altura da linha. |
| `font.char_spacing` | _Number_ | Espaçamento entre caracteres. `-40 ~ 120` |
| <br>**align** |  | <br>Alinhamento |
| `align.horizontal` | _String_ | `left`  `center`  `right`  `justify` |
| `align.vertical` | _String_ | `top`  `middle`  `bottom` |
| `align.margin.top` | _Number_ | `0 ~ 90` |
| `align.margin.right` | _Number_ | `0 ~ 90` |
| `align.margin.bottom` | _Number_ | `0 ~ 90` |
| `align.margin.left` | _Number_ | `0 ~ 90` |
| <br>**effect** |  | <br>Efeitos da fonte |
| `effect.outline_color` | _String_ | Cor no formato hexadecimal |
| `effect.outline_weight` | _Number_ | `0.0 ~ 100.0` |
| `effect.brightness_color` | _String_ | Cor no formato hexadecimal |
| `effect.brightness_weight` | _Number_ | `0.0 ~ 100.0` |
| `effect.shadow_color` | _String_ | Cor no formato hexadecimal |
| `effect.shadow_x_weight` | _Number_ | `-100.0 ~ 100.0` |
| `effect.shadow_y_weight` | _Number_ | `-100.0 ~ 100.0` |
| `effect.blur` | _Boolean_ | Aplicar efeito 'blur' no brilho e sombra |
| <br>**shape_fill** |  | <br>Cor de fundo |
| `shape_fill.type` | _String_ | `box`  `line`  `line_fill`  `theme_margin` |
| `shape_fill.enabled` | _Boolean_ |  |
| `shape_fill.color` | _String_ | Cor no formato hexadecimal (RGBA) |
| `shape_fill.margin.top` | _Number_ | `0 ~ 100` |
| `shape_fill.margin.right` | _Number_ | `0 ~ 100` |
| `shape_fill.margin.bottom` | _Number_ | `0 ~ 100` |
| `shape_fill.margin.left` | _Number_ | `0 ~ 100` |
| `shape_fill.corner` | _Number_ | `0 ~ 100` |
| <br>**shape_outline** |  | <br>Contorno |
| `shape_outline.type` | _String_ | `box`  `line`  `line_fill`  `theme_margin` |
| `shape_outline.enabled` | _Boolean_ |  |
| `shape_outline.color` | _String_ | Cor no formato hexadecimal (RGBA) |
| `shape_outline.outline_thickness` | _Number_ | `0 ~ 25` |
| `shape_outline.margin.top` | _Number_ | `0 ~ 100` |
| `shape_outline.margin.right` | _Number_ | `0 ~ 100` |
| `shape_outline.margin.bottom` | _Number_ | `0 ~ 100` |
| `shape_outline.margin.left` | _Number_ | `0 ~ 100` |
| `shape_outline.corner` | _Number_ | `0 ~ 100` |
| <br>**comment** |  | <br>Comentário |
| `comment.font_name` | _String_ | Nome da fonte |
| `comment.bold` | _Boolean_ | Negrito |
| `comment.italic` | _Boolean_ | Itálico |
| `comment.relative_size` | _Number_ | tamanho relativo da fonte. `40 ~ 100` |
| `comment.color` | _String_ | Cor no formato hexadecimal |
| <br>**settings** |  | <br>Configurações |
| `settings.uppercase` | _Boolean_ | Exibir o texto em maiúsculo |
| `settings.line_break` | _String_ | Aplicar quebra de linha. `system`  `true`  `false`<br> `Padrão: system` |
| <br>**metadata** |  | <br> |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "123",
  "name": "",
  "background": {
    "type": "color",
    "id": "212121",
    "opacity": 100
  },
  "base_color": "FFFFFF",
  "font": {
    "name": "CMG Sans",
    "bold": true,
    "italic": false,
    "size": 10.0,
    "color": "F5F5F5",
    "line_spacing": 0.3,
    "char_spacing": 0
  },
  "align": {
    "horizontal": "center",
    "vertical": "middle",
    "margin": {
      "top": 3.0,
      "right": 3.0,
      "bottom": 3.0,
      "left": 3.0
    }
  },
  "effect": {
    "outline_color": "404040",
    "outline_weight": 0.0,
    "brightness_color": "C0C0C0",
    "brightness_weight": 0.0,
    "shadow_color": "404040",
    "shadow_x_weight": 0.0,
    "shadow_y_weight": 0.0,
    "blur": true
  },
  "shape_fill": {
    "type": "box",
    "enabled": false,
    "color": "000000",
    "margin": {
      "top": 5.0,
      "right": 30.0,
      "bottom": 10.0,
      "left": 30.0
    },
    "corner": 0
  },
  "shape_outline": {
    "type": "box",
    "enabled": false,
    "color": "000000",
    "outline_thickness": 10,
    "margin": {
      "top": 5.0,
      "right": 30.0,
      "bottom": 10.0,
      "left": 30.0
    },
    "corner": 0
  },
  "comment": {
    "font_name": "Arial",
    "bold": false,
    "italic": true,
    "relative_size": 100,
    "color": "A0A0A0"
  },
  "settings": {
    "uppercase": false,
    "line_break": "system",
    "transition_settings_id": null
  }
}
```
</details>

## Background
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `type` | _String_ | Tipo do item. Pode ser: `theme` `my_video` `my_image` `video` `image` |
| `name` | _String_ | Nome do item |
| `width` | _Number (opcional)_ |  |
| `height` | _Number (opcional)_ |  |
| `duration` | _Number (opcional)_ | Duração em milissegundos |
| `tags` | _Array&lt;String&gt;_ | Lista de tags do item |
| `bpm` | _Number_ | Valor BPM do item |
| `midi` | _[Midi](#midi) (opcional)_ | Atalho MIDI do item |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "10",
  "type": "video",
  "name": "Hexagons",
  "duration": "29050",
  "width": "1280",
  "height": "720",
  "bpm": 0.0
}
```
</details>

## Slide Description
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `tag` | _String_ | Nome curto do item |
| `aliases` | _Array&lt;String&gt;_ | Lista com os nomes alternativos |
| `font_color` | _String_ | Cor da fonte no formato hexadecimal |
| `bg_color` | _String_ | Cor de fundo no formato hexadecimal |
| `background` | _Number_ | ID do plano de fundo personalizado |
| `midi` | _[Midi](#midi) (opcional)_ | Atalho MIDI do item |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "Chorus",
  "tag": "C",
  "font_color": "FFFFFF",
  "bg_color": "000080",
  "background": null,
  "midi": null
}
```
</details>

## Item
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `type` | _String_ | Tipo do item. Pode ser: `title`  `song`  `verse`  `text`  `audio`  `video`  `image`  `file`  `announcement`  `automatic_presentation`  `countdown`  `countdown_cp`  `cp_text`  `plain_text`  `uri`  `actions`  `global_action`  `alert`  `cp_alert`  `theme_background`  `api`  `script`  `module_action` |
| `name` | _String_ | Nome do item |

## Group
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item. (O mesmo valor que `name`). `v2.25.0+` |
| `name` | _String_ | Nome do item `read-only` |
| `songs` | _Array&lt;String&gt;_ | Lista dos IDs das músicas |
| `add_chorus_between_verses` | _Boolean_ |  `v2.25.0+` |
| `hide_in_interface` | _Boolean_ |  `v2.25.0+` |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Song Arrangement
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `sequence` | _String_ | Ordem dos slides (índice a partir do 1), separado por vírgula |
| `collections` | _Array&lt;String&gt;_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "",
  "sequence": "1,2,3,2,2"
}
```
</details>

## Announcement
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `text` | _String_ | Texto do anúncio |
| `shuffle` | _Boolean_ | Exibir a lista de anúncios de forma aleatória `v2.26.0+` |
| `archived` | _Boolean_ | Se o item está arquivado |

## Module
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `jscommunity_id` | _String_ | ID global do item no repositório JSCommunity |
| `info_id` | _String_ | ID definido para o item em `function info()`<br>Se o módulo for de origem do JSCommunity, o valor é o mesmo de `jscommunity_id` |
| `name` | _String_ | Nome do módulo |
| `active` | _Boolean_ | Se o módulo está ativo. active é um resultado de `enabled_by_user && conditional_execution` |
| `enabled_by_user` | _Boolean_ | Se o módulo está ativado pelo usuário (checkbox na interface) |
| `conditional_execution` | _Boolean_ | Se o módulo está ativado baseado nas possíveis execuções condicionais definidos a ele pelo usuário |
| `show_panel` | _Boolean_ | Exibir o módulo no painel Módulos |
| `available_in_main_window` | _Boolean_ | Módulo disponível para uso no painel da janela principal |
| `available_in_bible_window` | _Boolean_ | Módulo disponível para uso no painel da janela da Bíblia |
| `actions` | _Array&lt;[ModuleAction](https://github.com/holyrics/jslib/blob/main/doc/pt/ModuleAction.md)&gt;_ | Ações públicas disponíveis para o módulo |

## Module Action
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `description` | _String_ | Descrição do item |
| `available_for` | _String_ | Lista de origens que a ação está disponível.<br>Se o campo estiver vazio, significa que a ação está disponível para todas as origens.<br>Valores disponíveis: `ui` `trigger` `jslib_call` `jslib_open` `add_to_playlist` |
| `unavailable_for` | _String_ | Lista de origens que a ação está indisponível.<br>Valores disponíveis: `ui` `trigger` `jslib_call` `jslib_open` `add_to_playlist` |
| `input` | _Array&lt;Object&gt;_ | Lista de parâmetros requeridos para execução da ação |

## Midi
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `code` | _Number_ | Código midi |
| `velocity` | _Number_ | Velocidade/intensidade midi |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "code": 80,
  "velocity": 20
}
```
</details>

## Favorite Item
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `folders` | _Array&lt;String&gt;_ |  `v2.26.0+` |
| `item` | _Object_ |  `v2.26.0+` |

## Service
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item `v2.25.0+` |
| `name` | _String_ | Nome do item |
| `disabled` | _Boolean_ | Retorna **true** se o item estiver definido como desativado `v2.25.0+` |
| `week` | _String_ | Semana. Pode ser: `all` `first` `second` `third` `fourth` `last` |
| `day` | _String_ | Dia da semana. Pode ser: `sun` `mon` `tue` `wed` `thu` `fri` `sat` |
| `hour` | _Number_ | Hora [0-23] |
| `minute` | _Number_ | Minuto [0-59] |
| `type` | _String_ | Tipo do item. Pode ser: `service` `event` |
| `hide_week` | _Array&lt;String&gt;_ | Lista com as semanas ocultadas. Disponível se `week=all` |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Event
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item `v2.25.0+` |
| `name` | _String_ | Nome do item |
| `description` | _String_ | Descrição do item `v2.25.0+` |
| `datetime` | _String_ | Data e hora no formato: YYYY-MM-DD HH:MM |
| `datetime_millis` | _String_ | timestamp `v2.24.0+` `read-only` |
| `wallpaper` | _String_ | Caminho relativo do arquivo utilizado como papel de parede do evento |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
| `metadata.service` | _[Service](#service)_ | Culto ou evento regular que dá origem a esse evento. Pode ser `null` se for um evento criado individualmente. `v2.25.0+` `read-only` |

## Schedule
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | Tipo da lista de reprodução. Pode ser: temporary, service, event |
| `name` | _String_ |  |
| `datetime` | _String_ | Data e hora no formato: YYYY-MM-DD HH:MM |
| `lyrics_playlist` | _Array&lt;[Lyrics](#lyrics)&gt;_ | Lista de letras |
| `media_playlist` | _Array&lt;[Item](#item)&gt;_ | Lista de mídias |
| `responsible` | _[Member](#member)_ | Integrante definido como responsável pelo evento |
| `members` | _Array&lt;Object&gt;_ | Lista de integrantes |
| `members.*.id` | _String_ | ID do integrante |
| `members.*.name` | _String_ | Nome do integrante escalado |
| `members.*.scheduled` | _Boolean_ | Se o integrande está escalado ou definido para uma função |
| `roles` | _Array&lt;Object&gt;_ | Lista das funções na escala |
| `roles.*.id` | _String_ | ID da função |
| `roles.*.name` | _String_ | Nome da função |
| `roles.*.member` | _[Member](#member)_ | Integrante escalado para a função |
| `notes` | _String_ | Anotações `v2.21.0+` |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
| `metadata.event` | _[Event](#event)_ | Evento que dá origem a essa lista de reprodução. Pode ser `null` se `type=temporary`. `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "temporary",
  "name": "",
  "datetime": "2024-01-16 20:00",
  "lyrics_playlist": [
    {
      "id": 1,
      "title": "Title 1",
      "artist": "",
      "author": "",
      "...": ".."
    },
    {
      "id": 2,
      "title": "Title 2",
      "artist": "",
      "author": "",
      "...": ".."
    },
    {
      "id": 3,
      "title": "Title 3",
      "artist": "",
      "author": "",
      "...": ".."
    }
  ],
  "media_playlist": [
    {
      "id": "a",
      "type": "video",
      "name": "file.mp4"
    },
    {
      "id": "b",
      "type": "audio",
      "name": "file.mp3"
    },
    {
      "id": "c",
      "type": "image",
      "name": "file.jpg"
    }
  ],
  "responsible": null,
  "notes": ""
}
```
</details>

## Team
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `description` | _String_ | Descrição do item |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Member
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `disabled` | _Boolean_ | Retorna **true** se o item estiver definido como desativado `v2.25.0+` |
| `skills` | _String_ | Habilidades |
| `roles` | _Array&lt;[Role](#role)&gt;_ | Funções |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Role
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `disabled` | _Boolean_ | Retorna **true** se o item estiver definido como desativado `v2.25.0+` |
| `team` | _[Team](#team)_ | Time |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Automatic Presentation
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `duration` | _Number_ | Duração em milissegundos |
| `starts_with` | _String_ | Valores aceitos: `title` `blank` |
| `song` | _[Lyrics](#lyrics)_ |  |
| `timeline` | _Array&lt;Object&gt;_ | Informação sobre início e duração de cada slide da apresentação |
| `timeline.*.number` | _Number_ | number >= 0 |
| `timeline.*.start` | _Number_ | Tempo inicial da apresentação em milissegundos |
| `timeline.*.end` | _Number_ | Tempo final da apresentação em milissegundos |
| `timeline.*.duration` | _Number_ | Duração em milissegundos |

## Automatic
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `seconds` | _Number_ | Tempo que cada item ficará sendo apresentado |
| `repeat` | _Boolean_ | **true** para ficar repetindo a apresentação (voltar para o primeiro item após o último) |

## Presentation Slide Info
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `number` | _Number_ | Número do slide (começa em 1) |
| `text` | _String_ | Texto do slide |
| `theme_id` | _String_ | ID do tema do slide |
| `slide_description` | _String (opcional)_ | Nome da descrição do slide. Disponível se for uma apresentação de música. |
| `preview` | _String (opcional)_ | Imagem no formato base64 |

## Trigger Item
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `when` | _String_ | `displaying` `closing` `change` `event` |
| `item` | _String_ | Tipo do item. Pode ser:<br>**when=displaying**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_song_slide` `any_text_slide` `any_ppt_slide` `any_theme` `any_background` `any_title_subitem` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `any_countdown` `any_automatic_presentation_slide` `f8` `f9` `f10`<br><br>**when=closing**: `any_song` `any_text` `any_verse` `any_announcement` `any_audio` `any_video` `any_image` `any_automatic_presentation` `any_webcam` `any_audio_folder` `any_video_folder` `any_image_folder` `any_ppt` `f8` `f9` `f10`<br><br>**when=change**: `countdown_seconds_public` `countdown_seconds_communication_panel` `timer_seconds_communication_panel` `wallpaper` `wallpaper_service` `stage` `playlist` `bpm` `hue` `player_volume` `player_mute` `player_pause` `player_repeat` `player_list_or_single` `player_shuffle` `bible_version_1` `bible_version_2` `bible_version_3` `bible_any_version`<br><br>**when=event**: `new_message_chat` `verse_presentation_changed` `playlist_changed` `file_modified` `player_progress` `draw_lots_item_drawn` |
| `action` | _Function_ | Ação que será executada.<br>`function(obj) { /*  */ }`<br>Conteúdo de `obj` de acordo com o tipo do item:<br>[`any_song`](https://github.com/holyrics/jslib#songinfo)  [`any_text`](https://github.com/holyrics/jslib#textinfo)  [`any_verse`](https://github.com/holyrics/jslib#verseinfo)  [`any_announcement`](https://github.com/holyrics/jslib#announcementinfo)  [`any_audio`](https://github.com/holyrics/jslib#audioinfo)  [`any_video`](https://github.com/holyrics/jslib#videoinfo)  [`any_image`](https://github.com/holyrics/jslib#imageinfo)  [`any_automatic_presentation`](https://github.com/holyrics/jslib#automaticpresentationinfo)  [`any_song_slide`](https://github.com/holyrics/jslib#songslideinfo)  [`any_text_slide`](https://github.com/holyrics/jslib#textslideinfo)  [`any_ppt_slide`](https://github.com/holyrics/jslib#pptslideinfo)  [`any_theme`](https://github.com/holyrics/jslib#themeinfo)  [`any_background`](https://github.com/holyrics/jslib#backgroundinfo)  [`any_title_subitem`](https://github.com/holyrics/jslib#titleinfo)  [`any_webcam`](https://github.com/holyrics/jslib#webcaminfo)  [`any_audio_folder`](https://github.com/holyrics/jslib#audioinfo)  [`any_video_folder`](https://github.com/holyrics/jslib#videoinfo)  [`any_image_folder`](https://github.com/holyrics/jslib#imageinfo)  [`any_ppt`](https://github.com/holyrics/jslib#pptinfo)  [`any_countdown`](https://github.com/holyrics/jslib#countdowninfo)  [`any_automatic_presentation_slide`](https://github.com/holyrics/jslib#automaticpresentationslideinfo)  [`f8`](https://github.com/holyrics/jslib#presentationmodifierinfoinfo)  [`f9`](https://github.com/holyrics/jslib#presentationmodifierinfoinfo)  [`f10`](https://github.com/holyrics/jslib#presentationmodifierinfoinfo)  [`new_message_chat`](https://github.com/holyrics/jslib#newchatmessageinfo)  [`verse_presentation_changed`](https://github.com/holyrics/jslib#versepresentationchangedinfo)  [`playlist_changed`](https://github.com/holyrics/jslib#playlistchangedinfo)  [`file_modified`](https://github.com/holyrics/jslib#filemodifiedinfo)  [`player_progress`](https://github.com/holyrics/jslib#playerprogressinfo)  [`draw_lots_item_drawn`](https://github.com/holyrics/jslib#drawlotsitemdrawninfo)<br><br>Todos os itens de **when=change** contém: `obj.id` `obj.name` `obj.old_value` `obj.new_value` |
| `name` | _String (opcional)_ | Nome do item. Valor compatível para exibição no **JavaScript Monitor** `v2.23.0+` |
| `filter` | _Object (opcional)_ | Executar ação somente se o objeto que gerou o gatilho corresponder ao objeto filter `v2.24.0+` |
<details>
  <summary>Ver exemplo</summary>

```javascript
{
  "id": "",
  "when": "displaying",
  "item": "any_song",
  "action": function(obj) { /* TODO */ },
  "name": "name"
}
```
</details>

## Scheduled Task
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `enabled` | _Boolean_ |  |
| `time` | _String_ | hora no formato: HH:MM:SS |
| `days` | _Array&lt;String&gt;_ | Valores aceitos: `sun` `mon` `tue` `wed` `thu` `fri` `sat` |
| `item` | _Object_ |  |
| `tags` | _Array&lt;String&gt;_ |  |

## Rule
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `enabled` | _Boolean_ |  |
| `description` | _String_ |  |
| `type` | _Object_ |  |
| `type.id` | _String_ | Valores aceitos: `none` `rule_group_model` `rule_group` `javascript` `javascript_model` `jscommunity` `services` `events` `current_event_time` `date` `time` `datetime` `day_of_week` `day_of_month` `hour_of_day` `day_of_week_in_month` `runtime_environment` `javascript_state` `origin` |
| `type.name` | _String_ |  |
| `type.settings_type` | _String_ | `native` `custom` |
| <br>**type.settings_type=native** |  |  |
| `type.native_type` | _String_ | Valores disponíveis: `unknown` `string` `number` `date` `time` `datetime` |
| `type.operator` | _String_ | Valores disponíveis: `equals` `is_between` `contains` `greater` `greater_or_equals` `less` `less_or_equals` `matches_regex` `not_equals` `is_not_between` `not_contains` `not_matches_regex` |
| `data` | _Object_ |  |
| <br>**type.settings_type=native** |  |  |
| `data.values` | _Array&lt;String&gt;_ | Valores utilizados para as comparações<br>O array pode conter 1 ou mais itens, depende de `type.operator` |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Rule Group
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `match_mode` | _String_ | `any` `all` |
| `rules` | _Array&lt;[Rule](#rule)&gt;_ | Regras |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |

## Play Media Settings
Configurações para execução da mídia

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `volume` | _Number_ | Altera o volume do player |
| `repeat` | _Boolean_ | Altera a opção **repetir** |
| `shuffle` | _Boolean_ | Altera a opção **aleatório** |
| `start_time` | _String_ | Tempo inicial para execução no formato SS, MM:SS ou HH:MM:SS |
| `stop_time` | _String_ | Tempo final para execução no formato SS, MM:SS ou HH:MM:SS |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "volume": "80",
  "repeat": true,
  "shuffle": false,
  "start_time": "00:30",
  "stop_time": "02:00"
}
```
</details>
