<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 4731-5638.
-->

# Ações: wallpaper, display, transições e presets

### GetWallpaperSettings
- v2.19.0

Configurações do papel de parede



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.image_base64` | _String_ | Imagem do papel de parede em base 64 |
| `data.enabled` | _Boolean_ | Exibir papel de parede |
| `data.fill_color` | _String_ | Cor em hexadecimal definida na opção **preencher**. |
| `data.extend` | _Boolean_ | `deprecated` Substituído por `adjust_type`<br>Estender papel de parede |
| `data.adjust_type` | _String_ | Ajuste da imagem: Pode ser: `ADJUST` `EXTEND` `FILL` `ADJUST_BLUR` `v2.22.0+` |
| `data.show_clock` | _Boolean_ | Exibir relógio |
| `data.by_screen` | _Object_ | Configuração independente por tela `v2.23.0+` |
| `data.by_screen.default` | _[WallpaperSettings](#wallpaper-settings)_ | Configuração padrão `v2.23.0+` |
| `data.by_screen.public` | _[WallpaperSettings](#wallpaper-settings)_ | Configuração personalizada para a tela ou **null** se estiver utilizando a configuração padrão `v2.23.0+` |
| `data.by_screen.screen_n` | _[WallpaperSettings](#wallpaper-settings)_ | n >= 2  `v2.23.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "image_base64": "",
    "enabled": false,
    "fill_color": "#000000",
    "extend": false,
    "show_clock": false
  }
}
```


---

### SetWallpaperSettings
- v2.19.0

Alterar as configurações do papel de parede

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String (opcional)_ | Local do arquivo na aba **Imagens** |
| `enabled` | _Boolean (opcional)_ | Exibir papel de parede |
| `fill_color` | _String (opcional)_ | Cor em hexadecimal definida na opção **preencher**. **NULL** para desativar |
| `extend` | _Boolean (opcional)_ | `deprecated` Substituído por `adjust_type`<br>Estender papel de parede |
| `adjust_type` | _String_ | Ajuste da imagem: Pode ser: `ADJUST` `EXTEND` `FILL` `ADJUST_BLUR` `v2.22.0+` |
| `show_clock` | _Boolean (opcional)_ | Exibir relógio |
| `by_screen` | _Object (opcional)_ | Configuração independente por tela `v2.23.0+` |
| `by_screen.default` | _[WallpaperSettings](#wallpaper-settings) (opcional)_ | Configuração padrão `v2.23.0+` |
| `by_screen.public` | _[WallpaperSettings](#wallpaper-settings) (opcional)_ | Configuração personalizada para a tela ou **null** se estiver utilizando a configuração padrão `v2.23.0+` |
| `by_screen.screen_n` | _[WallpaperSettings](#wallpaper-settings) (opcional)_ | n >= 2 `v2.23.0+` |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna **true** ou uma lista com os erros ocorridos |


**Exemplo:**
```
Requisição
{
  "file": "wallpapers/image.jpg",
  "enabled": true,
  "fill_color": "#000000",
  "extend": true,
  "show_clock": false
}

Resposta
{
  "status": "ok",
  "data": true
}
```


---

### GetDisplaySettings
- v2.19.0

Lista das configurações de exibição de cada tela



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[DisplaySettings](#display-settings)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "public",
      "name": "Public",
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
      "slide_translation": "",
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
      "hide": false
    },
    {
      "id": "screen_2",
      "name": "Screen 2",
      "stage_view": {
        "enabled": true,
        "preview_mode": "FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR",
        "uppercase": false,
        "remove_line_break": false,
        "show_comment": true,
        "show_advanced_editor": false,
        "show_communication_panel": true,
        "custom_theme": 123,
        "apply_custom_theme_to_bible": true,
        "apply_custom_theme_to_text": true
      },
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
      "slide_translation": "",
      "bible_version_tab": 1,
      "margin": {
        "top": 0.0,
        "right": 0.0,
        "bottom": 0.0,
        "left": 0.0
      },
      "area": {
        "x": 3840,
        "y": 0,
        "width": 1920,
        "height": 1080
      },
      "total_area": {
        "x": 3840,
        "y": 0,
        "width": 1920,
        "height": 1080
      },
      "hide": false
    },
    {
      "id": "stream_image",
      "name": "Stream - Image",
      "stage_view": {
        "enabled": true,
        "preview_mode": "FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR",
        "uppercase": false,
        "remove_line_break": false,
        "show_comment": true,
        "show_advanced_editor": false,
        "show_communication_panel": true,
        "custom_theme": null,
        "apply_custom_theme_to_bible": true,
        "apply_custom_theme_to_text": true
      },
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
      "slide_translation": "",
      "bible_version_tab": 1,
      "show_items": {
        "lyrics": true,
        "text": true,
        "verse": true,
        "image": true,
        "alert": true,
        "announcement": true
      }
    },
    {
      "id": "stream_html_1",
      "name": "Stream - HTML 1",
      "stage_view": {
        "enabled": true,
        "preview_mode": "FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR",
        "uppercase": false,
        "remove_line_break": false,
        "show_comment": true,
        "show_advanced_editor": false,
        "show_communication_panel": true,
        "custom_theme": null,
        "apply_custom_theme_to_bible": true,
        "apply_custom_theme_to_text": true
      },
      "slide_translation": "",
      "bible_version_tab": 1,
      "show_items": {
        "lyrics": true,
        "text": true,
        "verse": true,
        "image": true,
        "alert": true,
        "announcement": true
      }
    }
  ]
}
```


---

### SetDisplaySettings
- v2.19.0

Alterar as configurações de exibição de uma tela

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _[DisplaySettings](#display-settings)_ | Novas configurações. As configurações são individualmente opcionais. Preencha apenas os campos que deseja alterar. |


**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Object_ | Retorna **true** ou uma lista com os erros ocorridos |


**Exemplo:**
```
Requisição
{
  "id": "screen_2",
  "stage_view": {
    "enabled": true,
    "preview_mode": "FIRST_LINE_OF_THE_NEXT_SLIDE_WITH_SEPARATOR",
    "uppercase": true
  },
  "margin": {
    "top": 0,
    "right": 0,
    "bottom": 10,
    "left": 0
  }
}

Resposta
{
  "status": "ok",
  "data": true
}
```


---

### GetDisplaySettingsPresets
- v2.26.0

Lista com os modelos salvos de configurações de exibição

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _Object_ | Tipo de preset. Valores aceitos: `public` `return` `image` `html` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[DisplaySettingsPreset](#display-settings-preset)&gt;_| 


**Exemplo:**
```
Requisição
{
  "type": "public"
}

Resposta
{
  "status": "ok",
  "data": {
    "id": "abcxyz",
    "name": "Example",
    "settings": {
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
      "slide_translation": "",
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
      "hide": false
    }
  }
}
```


---

### GetTransitionEffectSettings
- v2.21.0

Lista da configuração dos efeitos de transição



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `music` | _Array&lt;[TransitionEffectSettings](#transition-effect-settings)&gt;_ |  |
| `bible` | _Array&lt;[TransitionEffectSettings](#transition-effect-settings)&gt;_ |  |
| `image` | _Array&lt;[TransitionEffectSettings](#transition-effect-settings)&gt;_ |  |
| `announcement` | _Array&lt;[TransitionEffectSettings](#transition-effect-settings)&gt;_ |  |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "music": {
      "enabled": true,
      "type": "fade",
      "duration": 500,
      "only_area_within_margin": false,
      "merge": false,
      "division_point": 30,
      "increase_duration_blank_slides": false
    },
    "bible": {
      "...": "..."
    },
    "image": {
      "...": "..."
    },
    "announcement": {
      "...": "..."
    }
  }
}
```


---

### SetTransitionEffectSettings
- v2.21.0

Alterar as configurações de um efeito de transição

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
  "id": "music",
  "settings": {
    "enabled": true,
    "type": "fade",
    "duration": 500,
    "only_area_within_margin": false,
    "merge": false,
    "division_point": 30,
    "increase_duration_blank_slides": false
  }
}

Resposta
{
  "status": "ok",
  "data": true
}
```


---

### GetTranslationPresetList
- v2.27.0

Lista com os modelos salvos de configuração de tradução



**Resposta:**

| Tipo  |
| :---: |
| _Array&lt;[TranslationCustomSettingsPreset](#translation-custom-settings-preset)&gt;_ | 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyz",
      "name": "example",
      "alternative_name": "ex",
      "preset": {
        "public": {
          "translation_name": "custom",
          "translation_custom_settings": {
            "translation_1": {
              "name": "English",
              "style": "",
              "prefix": "",
              "suffix": ""
            },
            "translation_2": {
              "name": "Portuguese",
              "style": "",
              "prefix": "",
              "suffix": ""
            },
            "translation_3": null,
            "translation_4": null,
            "merge": false,
            "uppercase": false,
            "blank_line_height": 0
          }
        },
        "screen_2": {
          "translation_name": "English",
          "translation_custom_settings": null
        },
        "stream_image": {
          "translation_name": "",
          "translation_custom_settings": null
        },
        "stream_html_1": {
          "translation_name": "",
          "translation_custom_settings": null
        },
        "stream_html_2": {
          "translation_name": "",
          "translation_custom_settings": null
        },
        "stream_html_3": {
          "translation_name": "",
          "translation_custom_settings": null
        }
      }
    },
    {
      "id": "xyz123",
      "name": "example 2",
      "alternative_name": "ex2",
      "...": "..."
    },
    {
      "id": "xyz987",
      "name": "example 3",
      "alternative_name": "ex3",
      "...": "..."
    }
  ]
}
```


---

### GetTranslationPreset
- v2.27.0

Retorna um modelo de configuração de tradução

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


**Resposta:**

| Tipo  |
| :---: |
| _[TranslationCustomSettingsPreset](#translation-custom-settings-preset)_ | 


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
    "id": "xyz",
    "name": "example",
    "alternative_name": "ex",
    "...": "..."
  }
}
```


---

### ApplyTranslationPreset
- v2.27.0

Aplica as configurações de tradução a partir de um modelo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "xyz"
}
```


---

### GetLogoSettingsPresetList
- v2.28.0

Lista com os modelos salvos de configuração de Logo



**Resposta:**

| Tipo  |
| :---: |
| _Array&lt;[LogoSettingsPreset](#logo-settings-preset)&gt;_ | 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
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
}
```


---

### GetLogoSettingsPreset
- v2.28.0

Retorna um modelo de configuração de Logo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


**Resposta:**

| Tipo  |
| :---: |
| _[LogoSettingsPreset](#logo-settings-preset)_ | 


**Exemplo:**
```
Requisição
{
  "name": "example"
}

Resposta
{
  "status": "ok",
  "data": {
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
}
```


---

### ApplyLogoSettingsPreset
- v2.28.0

Aplica as configurações de Logo a partir de um modelo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "example"
}
```


---

### GetBibleResponsiveReadingSettingsPresetList
- v2.28.0

Lista com os modelos salvos de configuração de leitura alternada de versículos da Bíblia



**Resposta:**

| Tipo  |
| :---: |
| _Array&lt;[BibleResponsiveReadingSettingsPreset](#bible-responsive-reading-settings-preset)&gt;_ | 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
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
}
```


---

### GetBibleResponsiveReadingSettingsPreset
- v2.28.0

Retorna um modelo de configuração de leitura alternada de versículos da Bíblia

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


**Resposta:**

| Tipo  |
| :---: |
| _[BibleResponsiveReadingSettingsPreset](#bible-responsive-reading-settings-preset)_ | 


**Exemplo:**
```
Requisição
{
  "name": "example"
}

Resposta
{
  "status": "ok",
  "data": {
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
}
```


---

### ApplyBibleResponsiveReadingSettingsPreset
- v2.28.0

Aplica as configurações de leitura alternada de versículos da Bíblia a partir de um modelo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `name` | _String (opcional)_ | Nome do item |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "example"
}
```


---
