<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 8295-9672.
-->

# Classes: display, Bíblia e configurações

## Display Settings
Configurações de exibição

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item. `public` `screen_2` `screen_3` `screen_?` `stream_image` `stream_html_1` `stream_html_2` `stream_html_3` |
| `name` | _String_ | Nome do item |
| `screen` | _String_ | Coordenada x,y da tela definida como público. Disponível apenas para `id=public` |
| `stage_view` | _[StageView](#stage-view)_ | Configurações da visão do palco. (Indisponível para tela público) |
| `slide_info` | _[SlideAdditionalInfo](#slide-additional-info)_ | Informações adicionais do slide |
| `slide_translation` | _String_ | Nome da tradução |
| `slide_translation_custom_settings` | _[TranslationCustomSettings](#translation-custom-settings)_ | Configurações customizadas da tradução |
| `bible_version_tab` | _Number_ | Número da aba (1, 2 ou 3) da tradução da Bíblia exibida na tela, conforme traduções carregadas na janela da Bíblia |
| `margin` | _Object_ | Margens definidas na opção **Editar posição da tela**. margin.top, margin.right, margin.bottom, margin.left |
| `area` | _[Rectangle](#rectangle)_ | Área da tela com as margens aplicadas (se disponível) |
| `total_area` | _[Rectangle](#rectangle)_ | Área total da tela no sistema |
| `hide` | _Boolean_ | Ocultar a tela |
| `show_items` | _Object_ | Define os tipos de apresentação que serão exibidos (disponível apenas para telas de transmissão - imagem e html) |
| `show_items.lyrics` | _Boolean_ | Letra de música |
| `show_items.text` | _Boolean_ | Texto |
| `show_items.verse` | _Boolean_ | Versículo |
| `show_items.image` | _Boolean_ | Imagem |
| `show_items.alert` | _Boolean_ | Alerta |
| `show_items.announcement` | _Boolean_ | Anúncio |
| `media_player.show` | _Boolean_ | Exibir VLC Player `v2.20.0+` |
| `media_player.margin` | _[Rectangle](#rectangle)_ | Margem para exibição dos vídeos pelo VLC Player `v2.20.0+` |
| `html_settings` | _[StageViewHTMLSettings](stage-view-html-settings)_ | Configurações HTML. Disponível somente para as saídas HTML. |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "public",
  "name": "Público",
  "simulation": false,
  "screen": "1920,0",
  "slide_info": {
    "info_1": {
      "show_page_count": false,
      "show_slide_description": false,
      "horizontal_align": "right",
      "vertical_align": "bottom"
    },
    "info_2": {
      "show": false,
      "layout_row_1": "<title>< (%author_or_artist%)>",
      "layout_text_row_1": "",
      "horizontal_align": "right",
      "vertical_align": "bottom"
    },
    "font": {
      "name": null,
      "bold": null,
      "italic": null,
      "color": null
    },
    "height": 7,
    "paint_theme_effect": true
  },
  "slide_translation": null,
  "slide_translation_custom_settings": {
    "translation_1": {
      "name": "default",
      "style": "",
      "prefix": "",
      "suffix": ""
    },
    "translation_2": null,
    "translation_3": null,
    "translation_4": null,
    "merge": true,
    "uppercase": false,
    "blank_line_height": 40,
    "translation_number_to_display_interface": 1
  },
  "show_items": {
    "lyrics": true,
    "text": true,
    "verse": true,
    "image": true,
    "alert": true,
    "announcement": true
  },
  "margin": {
    "top": 0.0,
    "right": 0.0,
    "bottom": 0.0,
    "left": 0.0
  },
  "area": {
    "x": 1920,
    "y": 0,
    "width": 1920,
    "height": 1080
  },
  "total_area": {
    "x": 1920,
    "y": 0,
    "width": 1920,
    "height": 1080
  },
  "hide": false,
  "media_player": {
    "margin": {
      "top": 0.0,
      "right": 0.0,
      "bottom": 0.0,
      "left": 0.0
    },
    "area": {
      "x": 1920,
      "y": 0,
      "width": 1920,
      "height": 1080
    }
  }
}
```
</details>

## Display Settings Preset
Configurações de exibição (Modelo predefinido)

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `settings` | _[DisplaySettings](#display-settings)_ | Configurações |

## Transition Effect Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | Tipo de efeito. Pode ser: `random` `fade` `slide` `accordion` `linear_fade` `zoom` `curtain` |
| `enabled` | _Boolean_ | Se está ativado ou desativado |
| `duration` | _Number_ | Duração total da transição (em milissegundos) `200 ~ 2400` |
| `only_area_within_margin` | _Number_ | Realiza o efeito de transição apenas dentro da margem definida no Tema. (Disponível somente para transição de texto) |
| <br>**type=fade** |  |  |
| `merge` | _Object_ | Valores aceitos: true,&nbsp;false |
| `division_point` | _Object_ | Valores aceitos: min:&nbsp;10,&nbsp;max:&nbsp;100 |
| `increase_duration_blank_slides` | _Object_ | Valores aceitos: true,&nbsp;false |
| <br>**type=slide** |  |  |
| `direction` | _Object_ | Valores aceitos: random,&nbsp;left,&nbsp;up |
| `slide_move_type` | _Object_ | Valores aceitos: random,&nbsp;move_new,&nbsp;move_old,&nbsp;move_both |
| <br>**type=accordion** |  |  |
| `direction` | _Object_ | Valores aceitos: random,&nbsp;horizontal,&nbsp;vertical |
| <br>**type=linear_fade** |  |  |
| `direction` | _Object_ | Valores aceitos: random,&nbsp;horizontal,&nbsp;vertical,&nbsp;up,&nbsp;down,&nbsp;left,&nbsp;right |
| `distance` | _Object_ | Valores aceitos: min:&nbsp;5,&nbsp;max:&nbsp;90 |
| `fade` | _Object_ | Valores aceitos: min:&nbsp;2,&nbsp;max:&nbsp;90 |
| <br>**type=zoom** |  |  |
| `zoom_type` | _Object_ | Valores aceitos: random,&nbsp;increase,&nbsp;decrease |
| `directions` | _Object_ | Valores aceitos: {<br>&nbsp;&nbsp;top_left:&nbsp;boolean,<br>&nbsp;&nbsp;top_center:&nbsp;boolean,<br>&nbsp;&nbsp;top_right:&nbsp;boolean,<br>&nbsp;&nbsp;middle_left:&nbsp;boolean,<br>&nbsp;&nbsp;middle_center:&nbsp;boolean,<br>&nbsp;&nbsp;middle_right:&nbsp;boolean,<br>&nbsp;&nbsp;bottom_left:&nbsp;boolean,<br>&nbsp;&nbsp;bottom_center:&nbsp;boolean,<br>&nbsp;&nbsp;bottom_right:&nbsp;boolean<br>} |
| <br>**type=curtain** |  |  |
| `direction` | _Object_ | Valores aceitos: random,&nbsp;horizontal,&nbsp;vertical |
| `direction_lines` | _Object_ | Valores aceitos: random,&nbsp;down_right,&nbsp;up_left,&nbsp;alternate |
| `slide_move_type` | _Object_ | Valores aceitos: random,&nbsp;new,&nbsp;old,&nbsp;both |
| <br>**type=random** |  |  |
| `random_enabled_types` | _Object_ | Valores aceitos: {<br>&nbsp;&nbsp;fade:&nbsp;boolean,<br>&nbsp;&nbsp;slide:&nbsp;boolean,<br>&nbsp;&nbsp;accordion:&nbsp;boolean,<br>&nbsp;&nbsp;linear_fade:&nbsp;boolean,<br>&nbsp;&nbsp;zoom:&nbsp;boolean,<br>&nbsp;&nbsp;curtain:&nbsp;boolean<br>} |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": true,
  "type": "fade",
  "duration": 500,
  "only_area_within_margin": false,
  "merge": false,
  "division_point": 30,
  "increase_duration_blank_slides": false
}
```
</details>

## Transition Effect Template Settings
É um objeto com os mesmos parâmetros disponíveis em **Transition Effect Settings**, porém com alguns parâmetros adicionais

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `read-only` |

## Bible Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `tab_version_1` | _String_ | Versão da Bíblia definida na primeira aba |
| `tab_version_2` | _String_ | Versão da Bíblia definida na segunda aba |
| `tab_version_3` | _String_ | Versão da Bíblia definida na terceira aba |
| `show_x_verses` | _Number_ | Quantidade de versículos exibidos na projeção |
| `uppercase` | _Boolean_ | Exibir o texto do versículo em maiúsculo |
| `show_only_reference` | _Boolean_ | Exibir somente a referência do versículo |
| `show_two_versions` | _Boolean_ | `deprecated` Substituído por: `show_second_version` `show_third_version`<br>Exibir duas versões. |
| `show_second_version` | _Boolean_ | Exibir segunda versão `v2.22.0+` |
| `show_third_version` | _Boolean_ | Exibir terceira versão `v2.22.0+` |
| `book_panel_type` | _String_ | Tipo de visualização dos livros da Bíblia `grid` `list` |
| `book_panel_order` | _String_ | Tipo de ordenação dos livros da Bíblia |
| `book_panel_order_available_items` | _Array&lt;String&gt;_ |  |
| `multiple_verses_separator_type` | _String_ | Tipo de separação na exibição de múltiplos versículos. Pode ser: no_line_break, single_line_break, double_line_break, solid_separator_line |
| `multiple_versions_separator_type` | _String_ | Tipo de separação na exibição de múltiplas versões. Pode ser: no_line_break, single_line_break, double_line_break, solid_separator_line `v2.22.0+` |
| `versification` | _Boolean_ | Aplicar mapeamento de versículos |
| `theme` | _Object_ | ID do Tema de exibição para as diferentes telas do sistema |
| `theme.public` | _String_ |  |
| `theme.screen_n` | _String_ | n >= 2 |
| `responsive_reading` | _[BibleResponsiveReadingSettings](#bible-responsive-reading-settings)_ |  `v2.28.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "tab_version_1": "pt_???",
  "tab_version_2": "es_???",
  "tab_version_3": "en_???",
  "show_x_verses": 1,
  "uppercase": false,
  "show_only_reference": false,
  "show_two_versions": false,
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
  "multiple_versions_separator_type": "double_line_break",
  "versification": true,
  "theme": {
    "public": 123,
    "screen_n": null
  },
  "responsive_reading": {
    "display_two_verses": false,
    "descriptions": "",
    "font_color": "",
    "underline": false,
    "use_theme_effects": false,
    "change_description_last_verse": false,
    "description_last_verse": ""
  }
}
```
</details>

## Font Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `font_name` | _String (opcional)_ | Nome da fonte `Padrão: null` |
| `bold` | _Boolean (opcional)_ | Negrito `Padrão: null` |
| `italic` | _Boolean (opcional)_ | Itálico `Padrão: null` |
| `color` | _String (opcional)_ | Cor em hexadecimal `Padrão: null` |

## Stage View
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ | Visão do palco ativada |
| `preview_mode` | _String_ | Modo de visualização das letras. Opções disponíveis:<br/>`CURRENT_SLIDE`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR`<br>`FIRST_LINE_OF_THE_NEXT_SLIDE_WITHOUT_SEPARATOR`<br>`NEXT_SLIDE`<br>`CURRENT_AND_NEXT_SLIDE`<br>`ALL_SLIDES` |
| `uppercase` | _Boolean_ | Exibir em maiúsculo |
| `remove_line_break` | _Boolean_ | Remover quebra de linha |
| `show_comment` | _Boolean_ | Exibir comentários |
| `show_advanced_editor` | _Boolean_ | Exibir edições avançadas |
| `show_communication_panel` | _Boolean_ | Exibir conteúdo do painel de comunicação |
| `show_next_image` | _Boolean_ | Exibir imagem seguinte `v2.21.0+` |
| `custom_theme` | _String_ | ID do tema personalizado utilizado nas apresentações |
| `apply_custom_theme_to_bible` | _Boolean_ | Utilizar o tema personalizado nos versículos |
| `apply_custom_theme_to_text` | _Boolean_ | Utilizar o tema personalizado nos textos |
| `apply_custom_theme_to_quick_presentation` | _Boolean_ | Utilizar o tema personalizado na opção **Apresentação Rápida** `v2.21.0+` |
| `show_next_verse.enabled` | _Boolean_ | Ativar a exibição do início do próximo versículo no slide atual `v2.28.0+` |
| `show_next_verse.max_length` | _Boolean_ | Quantidade máxima de caracteres. `40 ~ 500` `v2.28.0+` |
| `show_next_verse.line_break_type` | _Boolean_ | `no_line_break`, `single_line_break`, `double_line_break` `v2.28.0+` |
| `show_next_verse.style_enabled` | _Boolean_ | Ativar formatação customizada do texto `v2.28.0+` |
| `show_next_verse.style` | _Boolean_ | Formatação customizada do texto. [Styled Text](https://github.com/holyrics/Scripts/blob/main/StyledText.md) `v2.28.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": false,
  "preview_mode": "FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR",
  "uppercase": false,
  "uppercase_mode": "text_and_comment",
  "remove_line_break": false,
  "show_comment": true,
  "show_advanced_editor": false,
  "show_communication_panel": true,
  "show_next_image": false,
  "custom_theme": null,
  "apply_custom_theme_to_bible": true,
  "apply_custom_theme_to_text": true,
  "apply_custom_theme_to_quick_presentation": false,
  "show_next_verse": {
    "enabled": false,
    "max_length": 100,
    "line_break_type": "double_line_break",
    "style_enabled": true,
    "style": "<i><size:60>"
  }
}
```
</details>

## Slide Additional Info
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `info_1` | _Object_ |  |
| `info_1.show_page_count` | _Boolean_ | Exibir contador de slides |
| `info_1.show_slide_description` | _Boolean_ | Exibir descrição do slide (coro, por exemplo) |
| `info_1.horizontal_align` | _String_ | Alinhamento horizontal da informação no slide. left, center, right |
| `info_1.vertical_align` | _String_ | Alinhamento vertical da informação no slide. top, bottom |
| `info_2` | _Object_ |  |
| `info_2.show` | _Boolean_ |  |
| `info_2.layout_row_1` | _String_ | Layout da informação da primeira linha **type=song** [Slide Additional Info Layout](#slide-additional-info-layout) |
| `info_2.layout_row_2` | _String (opcional)_ | Layout da informação da segunda linha **type=song** [Slide Additional Info Layout](#slide-additional-info-layout) |
| `info_2.layout_text_row_1` | _String_ | Layout da informação da primeira linha **type=text** [Slide Additional Info Layout](#slide-additional-info-layout) `v2.24.0+` |
| `info_2.layout_text_row_2` | _String (opcional)_ | Layout da informação da primeira linha **type=text** [Slide Additional Info Layout](#slide-additional-info-layout) `v2.24.0+` |
| `info_2.horizontal_align` | _String_ | Alinhamento horizontal da informação no slide. left, center, right |
| `info_2.vertical_align` | _String_ | Alinhamento vertical da informação no slide. top, bottom |
| `font` | _Object_ |  |
| `font.name` | _String_ | Nome da fonte. Se for **null**, utiliza a fonte padrão do tema. |
| `font.bold` | _Boolean_ | Negrito. Se for **null**, utiliza a configuração padrão do tema |
| `font.italic` | _Boolean_ | Itálido. Se for **null**, utiliza a configuração padrão do tema |
| `font.color` | _String_ | Cor da fonte em hexadecimal. Se for **null**, utiliza a cor da fonte padrão do tema |
| `height` | _Number_ | Altura em porcentagem em relação à altura do slide `4 ~ 15` |
| `paint_theme_effect` | _String_ | Renderizar o texto com os efeitos contorno, brilho e sombra do tema, se disponível |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "info_1": {
    "show_page_count": false,
    "show_slide_description": false,
    "horizontal_align": "right",
    "vertical_align": "bottom"
  },
  "info_2": {
    "show": false,
    "layout_row_1": "<title>< (%author_or_artist%)>",
    "layout_text_row_1": "",
    "horizontal_align": "right",
    "vertical_align": "bottom"
  },
  "font": {
    "name": null,
    "bold": null,
    "italic": null,
    "color": null
  },
  "height": 7,
  "paint_theme_effect": true
}
```
</details>

## Stage View HTML Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `font` | _Object_ |  |
| `font.name` | _String_ | Nome da fonte |
| `font.bold` | _Boolean_ | Negrito |
| `font.size` | _Number_ | Tamanho relativo da fonte `2 ~ 50` |
| `font.color` | _String_ | Cor no formato hexadecimal |
| `background_color` | _String_ | Cor no formato hexadecimal |
| `horizontal_align` | _String_ | `left`  `center`  `right` |
| `vertical_align` | _String_ | `top`  `middle`  `bottom` |
| `block_line_break` | _Boolean_ | Bloquear quebra de linha |
| `transparent_background` | _Boolean_ | Cor de fundo transparente |
| `show_page_count` | _Boolean_ | Exibir contador de página |
| `image_format` | _String_ | `jpg`  `png` |
| `image_resolution` | _String_ | `960x540` `1280x720` `1440x810` `1600x900` `1920x1080` |
| `show_bible_version` | _Boolean_ | Valores aceitos: `none` `full` `full_single_line` `abbreviated` `abbreviated_end_of_text` |
| `add_hly_data` | _Boolean_ | Adicionar tags avançadas na página |
| `alert` | _Object_ |  |
| `alert.font` | _Object_ |  |
| `alert.font.name` | _String_ | Nome da fonte |
| `alert.font.bold` | _Boolean_ | Negrito |
| `alert.font.italic` | _Boolean_ | Itálico |
| `alert.font.size` | _Number_ | Tamanho relativo da fonte. `10 ~ 20` |
| `alert.font.color` | _String_ | Cor no formato hexadecimal |
| `alert.background_color` | _String_ | Cor no formato hexadecimal |
| `alert.velocity` | _Number_ | Velocidade do alerta `5 ~ 100` |
| `comment` | _Object_ |  |
| `comment.font` | _Object_ |  |
| `comment.font.name` | _String_ | Nome da fonte |
| `comment.font.bold` | _Boolean_ | Negrito |
| `comment.font.italic` | _Boolean_ | Itálico |
| `comment.font.size` | _Number_ | Tamanho relativo da fonte `40 ~ 100` |
| `comment.font.color` | _String_ | Cor no formato hexadecimal |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "font": {
    "name": "Arial",
    "bold": false,
    "size": 15.0,
    "color": "FAFAFA"
  },
  "background_color": "000000",
  "horizontal_align": "center",
  "vertical_align": "middle",
  "block_line_break": false,
  "transparent_background": true,
  "show_page_count": false,
  "image_format": "jpg",
  "image_resolution": "1440x810",
  "show_bible_version": "none",
  "add_hly_data": false,
  "alert": {
    "font": {
      "name": "Arial",
      "bold": false,
      "italic": false,
      "size": 15.0,
      "color": "FAFAFA"
    },
    "background_color": "000000",
    "velocity": 40
  },
  "comment": {
    "font": {
      "name": "Arial",
      "bold": false,
      "italic": true,
      "size": 100.0,
      "color": "FF7000"
    }
  }
}
```
</details>

## Rectangle
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `x` | _Number_ |  |
| `y` | _Number_ |  |
| `width` | _Number_ |  |
| `height` | _Number_ |  |

## Custom Message
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `message_model` | _String_ | Mensagem sem preenchimento |
| `message_example` | _String_ | Mensagem de exemplo com o nome dos parâmetros preenchidos |
| `variables` | _Array&lt;[CustomMessageParam](#custom-message-param)&gt;_ | Parâmetros da mensagem |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "123",
  "name": "Chamar pessoa",
  "message_model": "   , favor comparecer  .",
  "message_example": "função nome, favor comparecer local.",
  "variables": [
    {
      "position": 0,
      "name": "função",
      "only_number": false,
      "uppercase": false,
      "suggestions": [
        "Diácono",
        "Presbítero",
        "Pastor",
        "Professor",
        "Ministro"
      ]
    },
    {
      "position": 2,
      "name": "nome",
      "only_number": false,
      "uppercase": false
    },
    {
      "position": 22,
      "name": "local",
      "only_number": false,
      "uppercase": false,
      "suggestions": [
        "ao estacionamento",
        "ao hall de entrada",
        "à mesa de som",
        "ao berçário"
      ]
    }
  ]
}
```
</details>

## Custom Message Param
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `position` | _Number_ | Posição do parâmetro na mensagem (em número de caracteres) |
| `name` | _String_ | Nome do item |
| `only_number` | _Boolean_ | Parâmetro aceita somente números |
| `uppercase` | _Boolean_ | Parâmetro exibido sempre em maiúsculo |
| `suggestions` | _Array&lt;String&gt; (opcional)_ | Lista com valores padrões para o parâmetro |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "position": 0,
  "name": "",
  "only_number": false,
  "uppercase": false
}
```
</details>

## Quiz Group
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item |
| `questions` | _Array&lt;[QuizQuestion](#quiz-question)&gt;_ |  |
| `settings` | _[QuizSettings](#quiz-settings)_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "",
  "questions": {
    "name": "",
    "title": "...",
    "alternatives": [
      "Item 1",
      "Item 2",
      "Item 3"
    ],
    "correct_alternative_number": 2,
    "source": ""
  },
  "settings": {
    "correct_answer_color_font": "00796B",
    "correct_answer_color_background": "CCFFCC",
    "incorrect_answer_color_font": "721C24",
    "incorrect_answer_color_background": "F7D7DB",
    "question_and_alternatives_different_slides": false,
    "display_alternatives_one_by_one": true,
    "alternative_separator_char": ".",
    "alternative_char_type": "alpha"
  }
}
```
</details>

## Quiz Question
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do item `v2.24.0+` |
| `title` | _String_ | Pergunta |
| `alternatives` | _Array&lt;String&gt;_ | Alternativas |
| `correct_alternative_number` | _Number (opcional)_ | Número da alternativa correta. Começa em 1 `Padrão: 1` |
| `source` | _String (opcional)_ | Fonte da resposta |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "",
  "title": "...",
  "alternatives": [
    "Item 1",
    "Item 2",
    "Item 3"
  ],
  "correct_alternative_number": 2,
  "source": ""
}
```
</details>

## Quiz Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `correct_answer_color_font` | _String (opcional)_ | Cor da fonte para a resposta correta |
| `correct_answer_color_background` | _String (opcional)_ | Cor de fundo para a resposta correta |
| `incorrect_answer_color_font` | _String (opcional)_ | Cor da fonte para a resposta incorreta |
| `incorrect_answer_color_background` | _String (opcional)_ | Cor de fundo para a resposta incorreta |
| `question_and_alternatives_different_slides` | _Boolean (opcional)_ | Exibir a pergunta e as alternativas em slides separados `Padrão: false` |
| `display_alternatives_one_by_one` | _Boolean (opcional)_ | Exibir as alternativas uma a uma `Padrão: true` |
| `alternative_char_type` | _String (opcional)_ | Tipo de caractere para listar as alternativas `number (1, 2, 3...)`  `alpha (A, B, C...)` `Padrão: 'alpha'` |
| `alternative_separator_char` | _String (opcional)_ | Caractere separador. Valores permitidos:  ` `  `.`  `)`  `-`  `:` `Padrão: '.'` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "correct_answer_color_font": "00796B",
  "correct_answer_color_background": "CCFFCC",
  "incorrect_answer_color_font": "721C24",
  "incorrect_answer_color_background": "F7D7DB",
  "question_and_alternatives_different_slides": false,
  "display_alternatives_one_by_one": true,
  "alternative_separator_char": ".",
  "alternative_char_type": "alpha"
}
```
</details>

## Quick Presentation Slide
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String_ | Texto do slide |
| `theme` | _[ThemeFilter](#theme-filter) (opcional)_ | Filtrar tema selecionado para exibição |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado utilizado para exibir o texto |
| `translations` | _[Translations](#translations) (opcional)_ |  |
| `duration` | _Number (opcional)_ | Duração do slide para uso em apresentações automáticas |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "text": "text",
  "duration": 3,
  "translations": {
    "key1": "value1",
    "key2": "value2"
  },
  "theme": {
    "name": "...",
    "edit": {
      "font": {
        "name": "Arial",
        "size": 10,
        "bold": true,
        "color": "FFFFFF"
      },
      "background": {
        "type": "color",
        "id": "000000"
      }
    }
  }
}
```
</details>

## Theme Filter
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do tema ou plano de fundo |
| `name` | _String (opcional)_ | Nome do tema ou plano de fundo |
| `edit` | _[Theme](#theme) (opcional)_ | Configurações para modificar o Tema selecionado para exibição |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "...",
  "edit": {
    "font": {
      "name": "Arial",
      "size": 10,
      "bold": true,
      "color": "FFFFFF"
    },
    "background": {
      "type": "color",
      "id": "000000"
    }
  }
}
```
</details>

## Translations
Conjunto chave/valor

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `???` | _String_ | Valor traduzido do item, onde o nome do parâmetro `???` é o nome da tradução |
| `???` | _String_ |  |
| `...` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "key1": "value1",
  "key2": "value2"
}
```
</details>

## Wallpaper Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ | Exibir papel de parede |
| `fill_color` | _String_ | Cor em hexadecimal definida na opção **preencher**. |
| `clock` | _[ClockSettings](#clock-settings)_ | Configurações do relógio |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": null,
  "fill_color": null,
  "clock": {
    "enabled": false,
    "font_name": "",
    "bold": false,
    "italic": false,
    "color": "FF0000",
    "background": "000000",
    "height": 12,
    "position": "top_right",
    "corner": 0,
    "horizontal_margin": 0.0,
    "vertical_margin": 0.0
  }
}
```
</details>

## Clock Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ |  |
| `font_name` | _String_ | Nome da fonte |
| `bold` | _Boolean_ | Negrito |
| `italic` | _Boolean_ | Itálico |
| `color` | _String_ | Cor no formato hexadecimal (RGBA) |
| `background` | _String_ | Cor no formato hexadecimal (RGBA) |
| `height` | _Number_ | Valor em porcentagem baseado na altura da linha.<br>Valores aceitos: `6` `7` `8` `9` `10` `12` `14` `15` `16` `18` `20` `25` `30` `35` `40` |
| `position` | _Boolean_ | Valores aceitos: `top_left` `top_center` `top_right` `middle_left` `middle_center` `middle_right` `bottom_left` `bottom_center` `bottom_right` |
| `corner` | _Number_ | `0 ~ 100` |
| `horizontal_margin` | _Number_ | Margem horizontal `-100 ~ 100` `v2.28.0+` |
| `vertical_margin` | _Number_ | Margem vertical `-100 ~ 100` `v2.28.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": false,
  "font_name": "",
  "bold": false,
  "italic": false,
  "color": "FF0000",
  "background": "000000",
  "height": 12,
  "position": "top_right",
  "corner": 0,
  "horizontal_margin": 0.0,
  "vertical_margin": 0.0
}
```
</details>

## Bible Book List
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome em inglês |
| `language` | _String_ | ISO 639 two-letter language code `v2.24.0+` |
| `alt_name` | _String_ | Nome no próprio idioma definido em `language`. Pode ser null. `v2.24.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "en",
  "name": "English",
  "language": "en",
  "alt_name": "English"
}
```
</details>

## Bible Book Info
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do livro `01 ~ 66` |
| `name` | _String_ | Nome do livro |
| `abbrev` | _String_ | Abreviação do livro |
| `usfx_code` | _String_ |  `v2.24.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "01",
  "name": "Genesis",
  "abbrev": "Gn"
}
```
</details>

## Verse Reference Group
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `reference` | _String_ | Referências. Exemplo: **João 3:16** ou **Rm 12:2** ou **Gn 1:1-3 Sl 23.1** |
| `ids` | _Array&lt;String&gt;_ | Exemplo:  ['19023001', '43003016', '45012002'] |
| `verses` | _Array&lt;[VerseReference](#verse-reference)&gt;_ | Lista detalhada das referências |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "reference": "Ps 23.1-2",
  "ids": [
    "19023001",
    "19023002"
  ],
  "verses": [
    {
      "id": "19023001",
      "book": 19,
      "chapter": 23,
      "verse": 1,
      "reference": "Psalms 23.1"
    },
    {
      "id": "19023002",
      "book": 19,
      "chapter": 23,
      "verse": 2,
      "reference": "Psalms 23.2"
    }
  ]
}
```
</details>

## Verse Reference
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `book` | _Number_ | ID do livro `1 ~ 66` |
| `chapter` | _Number_ | Capítulo |
| `verse` | _Number_ | Versículo |
| `reference` | _String_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "19023001",
  "book": 19,
  "chapter": 23,
  "verse": 1,
  "reference": "Psalms 23.1"
}
```
</details>

## Translation Custom Settings
Configurações customizadas da tradução

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `translation_1` | _[TranslationCustomSettingsItem](#translation-custom-settings-item)_ |  |
| `translation_2` | _[TranslationCustomSettingsItem](#translation-custom-settings-item)_ |  |
| `translation_3` | _[TranslationCustomSettingsItem](#translation-custom-settings-item)_ |  |
| `translation_4` | _[TranslationCustomSettingsItem](#translation-custom-settings-item)_ |  |
| `merge` | _Boolean_ |  |
| `uppercase` | _Boolean_ |  |
| `blank_line_height` | _Number_ | `0 ~ 100` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "translation_1": {
    "name": "default",
    "style": "",
    "prefix": "",
    "suffix": ""
  },
  "translation_2": null,
  "translation_3": null,
  "translation_4": null,
  "merge": false,
  "uppercase": false,
  "blank_line_height": 0
}
```
</details>

## Translation Custom Settings Item
Configurações customizadas da tradução (item)

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome da tradução. Utilize 'default' para usar o texto original. |
| `style` | _String_ | Formatação customizada do texto. [Styled Text](https://github.com/holyrics/Scripts/blob/main/StyledText.md) |
| `prefix` | _String_ | Texto adicionado no início de cada linha |
| `suffix` | _String_ | Texto adicionado no final de cada linha |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "name": "default",
  "style": "",
  "prefix": "",
  "suffix": ""
}
```
</details>

## Translation Custom Settings Preset
Modelo de configuração de tradução

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `alternative_name` | _String_ | Nome alternativo (nome curto para ser exibido na interface) |
| `preset` | _Object_ | Mapa chave/valor<br>Cada chave é o `id` da tela (id do respectivo **Display Settings**).<br>Cada valor é um `object` que contém `translation_name` e opcionalmente contém `translation_custom_settings` se `translation_name=custom`. |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "name": "",
  "alternative_name": ""
}
```
</details>

## Logo Settings
Configuração de Logo

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ |  |
| `position` | _String_ | Valores aceitos: `top_left` `top_center` `top_right` `middle_left` `middle_center` `middle_right` `bottom_left` `bottom_center` `bottom_right` |
| `opacity` | _Number_ | `0 ~ 100` |
| `horizontal_margin` | _Number_ | `0 ~ 49` |
| `vertical_margin` | _Number_ | `0 ~ 49` |
| `auto_hide` | _Boolean_ |  |
| `auto_display` | _Boolean_ |  |
| `centralize_with_blank_screen_music_or_tex` | _Boolean_ |  |
| `centralize_with_blank_screen_bible` | _Boolean_ |  |
| `centralize_with_blank_screen_animation` | _Boolean_ |  |
| `fade` | _Boolean_ |  |
| `centralize_without_presentation` | _Boolean_ |  |
| `display_with_vlc_player` | _Boolean_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": false,
  "position": "",
  "opacity": 0,
  "horizontal_margin": 0,
  "vertical_margin": 0,
  "auto_hide": false,
  "auto_display": false,
  "centralize_with_blank_screen_music_or_tex": false,
  "centralize_with_blank_screen_bible": false,
  "centralize_with_blank_screen_animation": false,
  "fade": false,
  "centralize_without_presentation": false,
  "display_with_vlc_player": false
}
```
</details>

## Logo Settings Preset
Modelo de configuração de Logo

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `preset` | _[LogoSettings](#logo-settings)_ |  |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "name": "",
  "preset": {
    "enabled": false,
    "position": "",
    "opacity": 0,
    "horizontal_margin": 0,
    "vertical_margin": 0,
    "auto_hide": false,
    "auto_display": false,
    "centralize_with_blank_screen_music_or_tex": false,
    "centralize_with_blank_screen_bible": false,
    "centralize_with_blank_screen_animation": false,
    "fade": false,
    "centralize_without_presentation": false,
    "display_with_vlc_player": false
  }
}
```
</details>

## Bible Responsive Reading Settings
Configuração da leitura alternada de versículos da Bíblia

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `display_two_verses` | _Boolean_ | Exibir dois versículos |
| `descriptions` | _String_ | Descrição de cada leitura. Itens separados por quebra de linha. |
| `font_color` | _String_ | Cor da fonte em hexadecimal. Se for **null**, utiliza a cor da fonte padrão do tema |
| `underline` | _Boolean_ | Exibir descrição sublinhada |
| `use_theme_effects` | _Boolean_ | Exibir descrição com os efeitos do tema (contorno, brilho, sombra, ...) |
| `change_description_last_verse` | _Boolean_ | Alterar a descrição do último versículo |
| `description_last_verse` | _String_ | Descrição do último versículo |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "display_two_verses": false,
  "descriptions": "",
  "font_color": "",
  "underline": false,
  "use_theme_effects": false,
  "change_description_last_verse": false,
  "description_last_verse": ""
}
```
</details>

## Bible Responsive Reading Settings Preset
Modelo de configuração da leitura alternada de versículos da Bíblia

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String_ | ID do item |
| `name` | _String_ | Nome do item |
| `preset` | _[BibleResponsiveReadingSettings](#bible-responsive-reading-settings)_ |  |
| `metadata.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) `v2.25.0+` `read-only` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "id": "",
  "name": "",
  "preset": {
    "display_two_verses": false,
    "descriptions": "",
    "font_color": "",
    "underline": false,
    "use_theme_effects": false,
    "change_description_last_verse": false,
    "description_last_verse": ""
  }
}
```
</details>

## Styled Model
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `key` | _String_ |  |
| `properties` | _Object_ | Conjunto chave/valor |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "key": "title",
  "properties": {
    "b": "true",
    "size": "120"
  }
}
```
</details>

## Initial Slide Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `display_mode` | _String_ | Valores aceitos: `title_author` `title_author_or_artist` `title` `title_artist` `blank` `remove` |
| `uppercase` | _Boolean_ |  |
| `automatic_line_break` | _Boolean_ |  |
| `underlined_title` | _Boolean_ |  |
| `title_font_relative_size` | _Number_ | `40 ~ 160` |
| `author_or_artist_font_relative_size` | _Number_ | `40 ~ 160` |
| `keep_ratio` | _Boolean_ |  |
| `remove_final_slide` | _Boolean_ |  |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "display_mode": "title_author_or_artist",
  "uppercase": false,
  "automatic_line_break": true,
  "underlined_title": true,
  "title_font_relative_size": 130,
  "author_or_artist_font_relative_size": 110,
  "keep_ratio": true,
  "remove_final_slide": false
}
```
</details>

## Copyright Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `display_mode` | _String_ | Valores aceitos: `disabled` `first_slide` `all_slides` `last_slide` `display_for_x_seconds` |
| `seconds` | _String_ | Disponível se `display_mode=display_for_x_seconds`<br>Valores aceitos: `5` `10` `15` `20` `30` `60` `120` |
| `layout` | _String_ | Valores aceitos: `t,a` `t;a` `t,a;c` `t;a;c` |
| `font.name` | _String_ | Nome da fonte |
| `font.bold` | _String_ | Negrito |
| `font.italic` | _String_ | Itálico |
| `font.color` | _String_ | Cor no formato hexadecimal |
| `line_height` | _Number_ | `2.0 ~ 10.0` |
| `align` | _String_ | Valores aceitos: `left` `center` `right` |
| `opaticy` | _Number_ | `30 ~ 100` |
| `position` | _String_ | Valores aceitos: `top_left` `top_center` `top_right` `bottom_left` `bottom_center` `bottom_right` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "public": {
    "display_mode": "all_slides",
    "layout": "t;a;c",
    "font": {
      "name": "Arial",
      "bold": true,
      "italic": true,
      "color": "FFFF00"
    },
    "line_height": 3.0,
    "align": "left",
    "opacity": 70,
    "position": "top_left"
  },
  "screen_2": "{...}",
  "screen_3": "{...}",
  "stream_image": "{...}"
}
```
</details>

## Image Presentation Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `adjust_type` | _String_ | `adjust` `extend` |
| `blur` | _Object_ | Utilizado somente se: `adjust_type=adjust` |
| `blur.enabled` | _Boolean_ |  |
| `blur.radius` | _Number_ | `1 ~ 20` |
| `blur.times` | _Number_ | `1 ~ 10` |
| `blur.opacity` | _Number_ | `10 ~ 100` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "adjust_type": "adjust",
  "blur": {
    "enabled": true,
    "radius": 8,
    "times": 5,
    "opacity": 70
  }
}
```
</details>

## Non-Latin Alphabet Support Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ |  |
| `font_or_script` | _String_ | `system` `lucida_sans` `arial_unicode_ms` `nirmala_ui` `arabic` `armenian` `bengali` `bopomofo` `cyrillic` `devanagari` `georgian` `greek` `gujarati` `gurmukhi` `han` `hangul` `hebrew` `hiragana` `kannada` `katakana` `lao` `malayalam` `meetei_mayek` `ol_chiki` `oriya` `sinhala` `tamil` `telugu` `thai` `tibetan` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": false,
  "font_or_script": "system"
}
```
</details>

## Global Settings
| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `fade_in_out_enabled` | _Boolean_ |  |
| `fade_in_out_duration` | _Number_ | `200 ~ 1500` |
| `show_history_main_window` | _Boolean_ |  |
| `show_favorite_bar_main_window` | _Boolean_ |  |
| `show_favorite_bar_bible_window` | _Boolean_ |  |
| `show_module_bar_main_window` | _Boolean_ |  |
| `show_module_bar_bible_window` | _Boolean_ |  |
| `show_automatic_presentation_tab_main_window` | _Boolean_ |  |
| `text_editor_font_name` | _String_ |  |
| `show_comment_main_window` | _Boolean_ |  |
| `show_comment_presentation_footer` | _Boolean_ |  |
| `show_comment_app` | _Boolean_ |  |
| `initial_slide` | _[InitialSlideSettings](#initial-slide-settings)_ |  |
| `copyright` | _Object_ | Conjunto chave/valor<br>chave: `public` `screen_2` `screen_3` `screen_?` `stream_image`<br>valor: [CopyrightSettings](#copyright-settings) |
| `image_presentation` | _[ImagePresentationSettings](#image-presentation-settings)_ |  |
| `black_screen_color` | _String_ | Cor no formato hexadecimal |
| `swap_f5` | _Boolean_ |  |
| `stage_view_modifier_enabled` | _Boolean_ |  |
| `disable_modifier_automatically` | _Boolean_ |  |
| `automatic_presentation_theme_chooser` | _Boolean_ |  |
| `automatic_presentation_execution_delay` | _String_ | Valores aceitos: `0` `1000` `1500` `2000` `2500` `3000` |
| `skip_slide_transition_if_equals` | _Boolean_ |  |
| `non_latin_alphabet_support` | _[NonLatinAlphabetSupportSettings](#non-latin-alphabet-support-settings)_ |  |
| `public_screen_expand_width` | _Number_ | `0 ~ 3840` |
| `public_screen_rounded_border` | _Boolean_ |  |
| `public_screen_rounded_border_size` | _Number_ | `0 ~ 540` |
| `display_custom_formatting_enabled` | _Boolean_ |  |
| `display_custom_background_enabled` | _Boolean_ |  |
| `display_advanced_editor_enabled` | _Boolean_ |  |
| `display_saved_theme_for_lyrics_enabled` | _Boolean_ |  `v2.26.0+` |
| `display_saved_theme_for_text_enabled` | _Boolean_ |  `v2.26.0+` |
| `advanced_editor_block_line_break` | _Boolean_ |  |
| `slide_description_repeat_description_for_sequence` | _Boolean_ |  |
| `standardize_automatic_line_break` | _Boolean_ |  |
| `allow_main_window_and_bible_window_simultaneously` | _Boolean_ |  |
| `preferential_arrangement_collection` | _String_ |  |
| `simulate_projection` | _Object_ | Conjunto chave/valor<br>chave: `screen_1` `screen_2` `screen_3`<br>valor: [SimulateProjectionSettings](#simulate-projection-settings) `v2.27.0+` |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "fade_in_out_enabled": true,
  "fade_in_out_duration": 500,
  "show_history_main_window": true,
  "show_favorite_bar_main_window": true,
  "show_favorite_bar_bible_window": false,
  "show_module_bar_main_window": false,
  "show_module_bar_bible_window": false,
  "show_automatic_presentation_tab_main_window": false,
  "text_editor_font_name": "Lucida Sans Unicode",
  "show_comment_main_window": false,
  "show_comment_presentation_footer": true,
  "show_comment_app": true,
  "initial_slide": {
    "display_mode": "title_author_or_artist",
    "uppercase": false,
    "automatic_line_break": true,
    "underlined_title": true,
    "title_font_relative_size": 130,
    "author_or_artist_font_relative_size": 110,
    "keep_ratio": true,
    "remove_final_slide": false
  },
  "copyright": {
    "public": {
      "display_mode": "all_slides",
      "layout": "t;a;c",
      "font": {
        "name": "Arial",
        "bold": true,
        "italic": true,
        "color": "FFFF00"
      },
      "line_height": 3.0,
      "align": "left",
      "opacity": 70,
      "position": "top_left"
    },
    "screen_2": "{...}",
    "screen_3": "{...}",
    "stream_image": "{...}"
  },
  "image_presentation": {
    "adjust_type": "adjust",
    "blur": {
      "enabled": true,
      "radius": 8,
      "times": 5,
      "opacity": 70
    }
  },
  "black_screen_color": "1E1E1E",
  "swap_f5": false,
  "stage_view_modifier_enabled": true,
  "disable_modifier_automatically": true,
  "automatic_presentation_theme_chooser": true,
  "automatic_presentation_execution_delay": 0,
  "skip_slide_transition_if_equals": false,
  "non_latin_alphabet_support": {
    "enabled": false,
    "font_or_script": "system"
  },
  "public_screen_expand_width": 0,
  "public_screen_rounded_border": false,
  "public_screen_rounded_border_size": 100,
  "display_custom_formatting_enabled": true,
  "display_custom_background_enabled": true,
  "display_advanced_editor_enabled": true,
  "display_saved_theme_for_lyrics_enabled": true,
  "display_saved_theme_for_text_enabled": true,
  "advanced_editor_block_line_break": true,
  "slide_description_repeat_description_for_sequence": true,
  "standardize_automatic_line_break": false,
  "allow_main_window_and_bible_window_simultaneously": false,
  "preferential_arrangement_collection": "",
  "simulate_projection": {
    "screen_1": {
      "enabled": true,
      "hide_screen": false,
      "position": "user",
      "x": 0,
      "y": 0,
      "width": 320,
      "height": 180,
      "metadata": {
        "available_positions": [
          "user",
          "public"
        ],
        "area": {
          "x": 0,
          "y": 0,
          "width": 320,
          "height": 180
        }
      }
    },
    "screen_2": "{...}",
    "screen_3": "{...}"
  }
}
```
</details>

## Simulate Projection Settings
Configurações da opção 'simular projeção'

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enabled` | _Boolean_ |  |
| `hide_screen` | _Boolean_ |  |
| `position` | _String_ | Pode ser: `user` `public` `on_the_right_simulation_1` `on_the_right_simulation_2` |
| `x` | _Number_ | `0 ~ 9999` |
| `y` | _Number_ | `0 ~ 9999` |
| `width` | _Number_ | `1 ~ 3840` |
| `height` | _Number_ | `1 ~ 3840` |
| `area` | _[Rectangle](#rectangle)_ | Área da tela simulada |
| `metadata` | _Object_ |  |
| `available_positions` | _Array&lt;String&gt;_ | Posições disponíveis para o respectivo item |
<details>
  <summary>Ver exemplo</summary>

```json
{
  "enabled": false,
  "hide_screen": false,
  "position": "",
  "x": 0,
  "y": 0,
  "width": 0,
  "height": 0,
  "area": {
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0
  }
}
```
</details>
