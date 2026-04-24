<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 9673-10111.
-->

# Classes: AddItem

## AddItem
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | Tipo do item. Pode ser: `title`  `song`  `verse`  `text`  `audio`  `video`  `image`  `file`  `announcement`  `automatic_presentation`  `countdown`  `countdown_cp`  `cp_text`  `plain_text`  `uri`  `actions`  `global_action`  `alert`  `cp_alert`  `theme_background`  `api`  `script`  `module_action` |

## AddItemTitle
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | title |
| `name` | _String_ | Nome do item |
| `background_color` | _String (opcional)_ | Cor de fundo em hexadecimal, exemplo: 000080 |
| `collapsed` | _Boolean (opcional)_ |  `Padrão: false` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "title",
  "name": "Exemplo",
  "background_color": "0000FF",
  "collapsed": false
}
```
</details>

## AddItemSong
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | song |
| `id` | _String_ | ID do item |
| `arrangement_name` | _String (opcional)_ |  `v2.27.0+` |
| `translation_preset_id` | _String (opcional)_ |  `v2.27.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "song",
  "id": "123",
  "arrangement_name": "",
  "translation_preset_id": ""
}
```
</details>

## AddItemVerse
**id**, **ids** ou **references**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | verse |
| `id` | _String (opcional)_ | Para exibir um versículo. ID do item no formato LLCCCVVV.<br/>Exemplo: '19023001' (livro 19, capítulo 023, versículo 001) |
| `ids` | _Array&lt;String&gt; (opcional)_ | Para exibir uma lista de versículos. Lista com o ID de cada versículo.<br/>Exemplo: ['19023001', '43003016', '45012002'] |
| `references` | _String (opcional)_ | Referências. Exemplo: **João 3:16** ou **Rm 12:2** ou **Gn 1:1-3 Sl 23.1** |
| `version` | _String (opcional)_ | Nome ou abreviação da tradução utilizada `v2.21.0+` |
| `show_x_verses` | _Number (opcional)_ | Quantidade de versículos exibidos na projeção `v2.28.0+` |
| `default_action` | _String (opcional)_ | Ação padrão `default` `responsive_reading` `only_reference` `Padrão: default` `v2.28.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "verse",
  "references": "Ps 23.1-6 Rm 12.2",
  "version": "en_kjv",
  "show_x_verses": 0,
  "default_action": ""
}
```
</details>

## AddItemText
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | text |
| `id` | _String_ | ID do item |
| `translation_preset_id` | _String (opcional)_ |  `v2.27.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "text",
  "id": "xyz",
  "translation_preset_id": ""
}
```
</details>

## AddItemAudio
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | audio |
| `name` | _String_ | Nome do arquivo |
| `settings` | _[PlayMediaSettings](#play-media-settings) (opcional)_ | Configurações para execução da mídia `v2.21.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "type": "audio",
  "name": "file.mp3",
  "isDir": false
}
```
</details>

## AddItemVideo
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | video |
| `name` | _String_ | Nome do arquivo |
| `settings` | _[PlayMediaSettings](#play-media-settings) (opcional)_ | Configurações para execução da mídia `v2.21.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "type": "video",
  "name": "file.mp4",
  "isDir": false
}
```
</details>

## AddItemImage
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | image |
| `name` | _String_ | Nome do arquivo |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "image",
  "name": "file.ext"
}
```
</details>

## AddItemFile
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | file |
| `name` | _String_ | Nome do arquivo |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "file",
  "name": "file.ext"
}
```
</details>

## AddItemAutomaticPresentation
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | automatic_presentation |
| `name` | _String_ | Nome do arquivo |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "automatic_presentation",
  "name": "filename.ap"
}
```
</details>

## AddItemAnnouncement
**id**, **ids**, **name** ou **names**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | announcement |
| `id` | _String (opcional)_ | ID do anúncio. Pode ser **all** para exibir todos |
| `ids` | _Array&lt;String&gt; (opcional)_ | Lista com o ID de cada anúncio |
| `name` | _String (opcional)_ | Nome do anúncio |
| `names` | _Array&lt;String&gt; (opcional)_ | Lista com o nome de cada anúncio |
| `automatic` | _[Automatic](#automatic) (opcional)_ | Se informado, a apresentação dos itens será automática |
| `shuffle` | _Boolean_ | Exibir a lista de anúncios de forma aleatória `Padrão: false` `v2.26.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "announcement",
  "names": [
    "Anúncio 1",
    "Anúncio 2",
    "Anúncio 3"
  ],
  "automatic": {
    "seconds": 10,
    "repeat": true
  },
  "shuffle": true
}
```
</details>

## AddItemCountdown
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | countdown |
| `time` | _String_ | HH:MM ou MM:SS |
| `exact_time` | _Boolean (opcional)_ | Se **true**, `time` deve ser HH:MM (hora e minuto exato). Se **false**, `time` deve ser MM:SS (quantidade de minutos e segundos) `Padrão: false` |
| `text_before` | _String (opcional)_ | Texto exibido na parte superior da contagem regressiva |
| `text_after` | _String (opcional)_ | Texto exibido na parte inferior da contagem regressiva |
| `zero_fill` | _Boolean (opcional)_ | Preencher o campo 'minuto' com zero à esquerda `Padrão: false` |
| `hide_zero_minute` | _Boolean (opcional)_ | Ocultar a exibição dos minutos quando for zero `Padrão: false` `v2.25.0+` |
| `countdown_relative_size` | _Number (opcional)_ | Tamanho relativo da contagem regressiva `Padrão: 250` |
| `theme` | _[ThemeFilter](#theme-filter) (opcional)_ | Filtrar tema selecionado para exibição `v2.21.0+` |
| `countdown_style` | _[FontSettings](#font-settings) (opcional)_ | Fonte personalizada para a contagem regressiva `v2.21.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "countdown",
  "time": "05:00",
  "exact_time": false,
  "text_before": "",
  "text_after": "",
  "zero_fill": false,
  "countdown_relative_size": 250,
  "theme": null,
  "countdown_style": {
    "font_name": null,
    "bold": null,
    "italic": true,
    "color": null
  },
  "hide_zero_minute": false
}
```
</details>

## AddItemCountdownCommunicationPanel
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | countdown_cp |
| `minutes` | _Number_ | Quantidade de minutos. Opcional se `exact_time` for declarado |
| `seconds` | _Number_ | Quantidade de segundos. Opcional se `exact_time` for declarado |
| `stop_at_zero` | _Boolean (opcional)_ | Parar a contagem regressiva ao chegar em zero `Padrão: false` |
| `description` | _String_ | Descrição do item |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "countdown_cp",
  "minutes": 5,
  "seconds": 0,
  "stop_at_zero": false,
  "description": ""
}
```
</details>

## AddItemPlainText
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | plain_text |
| `name` | _String_ | Nome do item |
| `text` | _String_ | Texto |
| `theme` | _String (opcional)_ | ID do tema utilizado para exibir o texto `v2.27.0+` |
| `background` | _String (opcional)_ | ID do plano de fundo utilizado para exibir o texto `v2.27.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "plain_text",
  "name": "",
  "text": "Exemplo",
  "theme": "",
  "background": ""
}
```
</details>

## AddItemTextCommunicationPanel
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | cp_text |
| `name` | _String_ | Nome do item |
| `text` | _String_ | Texto |
| `display_ahead` | _Boolean (opcional)_ | Alterar a opção *'exibir à frente de tudo'* |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "cp_text",
  "name": "",
  "text": "Exemplo",
  "display_ahead": false
}
```
</details>

## AddItemScript
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | script |
| `id` | _String_ | ID do item |
| `description` | _String_ | Descrição do item |
| `inputs` | _Object (opcional)_ | Valor padrão para [Function Input](https://github.com/holyrics/Scripts/blob/main/FunctionInput.md) |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "script",
  "id": "xyz",
  "description": "",
  "inputs": {
    "message": "Exemplo",
    "duration": 30
  }
}
```
</details>

## AddItemAPI
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | api |
| `id` | _String_ | ID do item |
| `description` | _String_ | Descrição do item |
| `inputs` | _Object (opcional)_ | Valor padrão para [Function Input](https://github.com/holyrics/Scripts/blob/main/FunctionInput.md) |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "api",
  "id": "xyz",
  "description": "",
  "inputs": {
    "message": "Exemplo",
    "duration": 30
  }
}
```
</details>

## AddItemModuleAction
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | module_action |
| `id` | _String_ | ID do módulo |
| `module_action_id` | _String_ | ID da ação do módulo |
| `inputs` | _Object (opcional)_ | Valor padrão para executar a ação |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "module_action",
  "id": "abc",
  "module_action_id": "xyz",
  "inputs": {
    "message": "Exemplo",
    "duration": 30
  }
}
```
</details>

## AddItemURI
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | uri |
| `title` | _String_ | Título do item |
| `uri_type` | _String_ | Pode ser: `spotify` `youtube` `deezer` |
| `value` | _String_ | URI |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "type": "uri",
  "title": "Holyrics",
  "uri_type": "youtube",
  "value": "https://youtube.com/watch?v=umYQpAxL4dI"
}
```
</details>

## AddItemGlobalAction
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | global_action |
| `action` | _String_ | Pode ser: `slide_exit` `vlc_stop` `vlc_stop_fade_out` |

## AddItemAddItemAlert
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `text` | _String_ | Texto de alerta |
| `close_after_seconds` | _Number_ | Ocultar o alerta após X segundos |

## AddItemAddItemAlertCommunicationPanel
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `text` | _String_ | Texto de alerta |
| `display_ahead` | _String_ | Alterar a opção *'exibir à frente de tudo'* |
| `close_after_seconds` | _Number_ | Ocultar o alerta após X segundos |

## AddItemActions
Ações disponíveis: [HolyricsActions](https://github.com/holyrics/jslib/blob/main/doc/pt/HolyricsActions.md)

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `action_id` | _String_ | ID do item |
| `alternative_name` | _String (opcional)_ | Nome alternativo. Nome que será exibido no lugar do nome (nativo) padrão da ação. |
| `icon` | _String (opcional)_ |  |
| `icon_color` | _String (opcional)_ | Cor no formato hexadecimal |
| `active_icon` | _String (opcional)_ |  |
| `active_icon_color` | _String (opcional)_ | Cor no formato hexadecimal |
| `settings` | _Object (opcional)_ | Mapa chave/valor |

## AddItemThemeBackground
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `background_type` | _String_ | Tipo do plano de fundo. Pode ser: `color`  `my_video`  `my_image`  `video`  `image`  `pattern`  `transparent`  `image_file`  `video_file` |
| `background_id` | _String_ | <table><tr><td><p align="right">**Tipo**</p></td><td>Valor</td></tr><tr><td><p align="right">color</p></td><td>Cor no formato hexadecimal</td></tr><tr><td><p align="right">my_video</p></td><td>ID do item</td></tr><tr><td><p align="right">my_image</p></td><td>ID do item</td></tr><tr><td><p align="right">video</p></td><td>ID do item</td></tr><tr><td><p align="right">image</p></td><td>ID do item</td></tr><tr><td><p align="right">pattern</p></td><td>ID do item</td></tr><tr><td><p align="right">transparent</p></td><td>"transparent"</td></tr><tr><td><p align="right">image_file</p></td><td>Nome do arquivo na biblioteca</td></tr><tr><td><p align="right">video_file</p></td><td>Nome do arquivo na biblioteca</td></tr></table> |
| `adjust_type` | _String_ | `fill` `extend` `adjust` `side_by_side` `center`<br>Disponível para: **type=my_image**, **type=image** |
| `velocity` | _Number_ | Disponível para: **type=my_video**, **type=video**<br>`0.25 ~ 4.0` |
