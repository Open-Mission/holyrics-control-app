<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 2964-3532.
-->

# Ações: controle de apresentação, tema e fundo

### GetCurrentPresentation
- v2.19.0

Item sendo apresentado no momento ou **null** se não tiver apresentação sendo exibida

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `include_slides` | _Boolean (opcional)_ | Retornar a lista de slides da apresentação atual. Indisponível para apresentação de versículos. `Padrão: false` `v2.21.0+` |
| `include_slide_comment` | _Boolean (opcional)_ | Incluir comentários (se houver) no texto dos slides. Disponível se **include_slides=true**. `Padrão: false` `v2.21.0+` |
| `include_slide_preview` | _Boolean (opcional)_ | Incluir imagem preview do slide. Disponível se **include_slides=true**. `Padrão: false` `v2.21.0+` |
| `slide_preview_size` | _String (opcional)_ | Tamanho do preview no formato WxH (ex. 320x180). (max 640x360)<br>Disponível se **include_slide_preview=true** `Padrão: false` `v2.21.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.id` | _String_ | ID do item |
| `data.type` | _String_ | Tipo do item. Pode ser: `song` `verse` `text` `audio` `image` `announcement` `automatic_presentation` `quick_presentation` |
| `data.name` | _String_ | Nome do item |
| `data.slide_number` | _Number_ | Começa em 1 `v2.20.0+` |
| `data.total_slides` | _Number_ | Total de slides `v2.20.0+` |
| `data.slide_type` | _String_ | Um dos seguintes valores: `default`  `wallpaper`  `blank`  `black`  `final_slide` `v2.20.0+` |
| `data.slides` | _Array&lt;[PresentationSlideInfo](#presentation-slide-info)&gt;_ | Lista com os slides da apresentação atual. Disponível se **include_slides=true** `v2.21.0+` |


**Exemplo:**
```
Requisição
{}

Resposta
{
  "status": "ok",
  "data": {
    "id": "abc123",
    "type": "song",
    "name": "",
    "song_id": "123"
  }
}
```


---

### CloseCurrentPresentation
- v2.19.0

Encerra a apresentação atual



_Método sem retorno_



---

### GetF8
### GetF9
### GetF10
- v2.19.0

Retorna o estado atual da respectiva opção **F8 (papel de parede), F9 (tela vazia) ou F10 (tela preta)**



**Resposta:**

| Tipo  | Descrição |
| :---: | ------------|
| _Boolean_ | **true** ou **false** |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": false
}
```


---

### SetF8
### SetF9
### SetF10
- v2.19.0

Altera o estado atual da respectiva opção **F8 (papel de parede), F9 (tela vazia) ou F10 (tela preta)**

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `enable` | _Boolean_ | **true** ou **false** |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "enable": true
}
```


---

### ToggleF8
### ToggleF9
### ToggleF10
- v2.19.0

Troca o estado atual da respectiva opção **F8 (papel de parede), F9 (tela vazia) ou F10 (tela preta)**



_Método sem retorno_



---

### ActionNext
- v2.19.0

Executa um comando de **avançar** na apresentação atual



_Método sem retorno_



---

### ActionPrevious
- v2.19.0

Executa um comando de **voltar** na apresentação atual



_Método sem retorno_



---

### ActionGoToIndex
- v2.19.0

Altera o slide em exibição a partir do índice do slide

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `index` | _Number_ | Índice do slide na apresentação (começa em zero) |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "index": 3
}
```


---

### ActionGoToSlideDescription
- v2.19.0

Altera o slide em exibição a partir do nome da descrição do slide

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome da descrição do slide |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "Verse 1"
}
```


---

### GetCurrentBackground
- v2.19.0

Retorna o plano de fundo da apresentação em exibição.



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _[Background](#background)_ | Plano de fundo atual ou NULL se não houver apresentação em exibição |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "id": "abc",
    "type": "my_video",
    "name": "Video Name",
    "tags": [
      "circle",
      "blue"
    ],
    "bpm": 80,
    "midi": {
      "code": 85,
      "velocity": 81
    }
  }
}
```


---

### GetCurrentTheme
- v2.22.0

Retorna o tema da apresentação em exibição.



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _[Background](#background)_ | Tema atual ou NULL se não houver apresentação em exibição |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "id": "123",
    "type": "theme",
    "name": "Theme Name",
    "tags": [
      "circle",
      "blue"
    ],
    "bpm": 80
  }
}
```


---

### GetThemes
- v2.27.0

Lista de temas



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Theme](#theme)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "123",
      "name": "",
      "...": "..."
    },
    {
      "id": "1234",
      "name": "",
      "...": "..."
    },
    {
      "id": "12345",
      "name": "",
      "...": "..."
    }
  ]
}
```


---

### GetBackgrounds
- v2.19.0

Lista dos temas e planos de fundo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _Object (opcional)_ | Filtro |
| `type` | _String (opcional)_ | Pode ser: `theme` `my_video` `my_image` `video` `image` |
| `tag` | _String (opcional)_ |  |
| `tags` | _Array&lt;String&gt; (opcional)_ |  |
| `intersection` | _Boolean (opcional)_ | Se o campo **tags** estiver preenchido com múltiplos itens, a opção **intersection** define o tipo de junção. Se **true**, o filtro retornará apenas itens que contém **todas** as tags informadas, se **false**, o filtro retornará os itens que têm pelo menos uma tag das tags informadas `Padrão: false` |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[Background](#background)&gt;_| 


**Exemplo:**
```
Requisição
{
  "type": "my_video",
  "tag": "circle",
  "tags": [],
  "intersection": true
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "xyz",
      "type": "theme",
      "name": "Theme Name",
      "tags": [
        "circle",
        "blue"
      ],
      "midi": {
        "code": 85,
        "velocity": 80
      }
    },
    {
      "id": "abc",
      "type": "my_video",
      "name": "Video Name",
      "tags": [
        "circle",
        "blue"
      ],
      "bpm": 80,
      "midi": {
        "code": 85,
        "velocity": 81
      }
    }
  ]
}
```


---

### GetBackgroundTags
- v2.26.0

Lista das Tags criadas para organização de Temas e Backgrounds

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _Object (opcional)_ | Filtro |
| `type` | _String (opcional)_ | Pode ser: `theme` `my_video` `my_image` `video` `image` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;String&gt;_ | Lista com o nome das Tags |


**Exemplo:**
```
Requisição
{
  "type": "my_video"
}
```


---

### SetCurrentBackground
- v2.19.0

Altera o plano de fundo (ou tema) da apresentação atual. Se mais de um item for encontrado de acordo com os filtros, será escolhido um item da lista de forma aleatória

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `input` | _Object (opcional)_ | Filtro |
| `id` | _String (opcional)_ | ID do tema ou plano de fundo |
| `name` | _String (opcional)_ | Nome do tema ou plano de fundo |
| `type` | _String (opcional)_ | Pode ser: `theme` `my_video` `my_image` `video` `image` |
| `tag` | _String (opcional)_ |  |
| `tags` | _Array&lt;String&gt; (opcional)_ |  |
| `intersection` | _Boolean (opcional)_ | Se o campo **tags** estiver preenchido com múltiplos itens, a opção **intersection** define o tipo de junção. Se **true**, o filtro retornará apenas itens que contém **todas** as tags informadas, se **false**, o filtro retornará os itens que têm pelo menos uma tag das tags informadas `Padrão: false` |
| `edit` | _[Theme](#theme) (opcional)_ | Configurações para modificar o Tema selecionado para exibição `v2.21.0+` |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado `v2.21.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "123",
  "name": "",
  "type": "my_video",
  "tag": "blue",
  "tags": [],
  "intersection": false
}
```


---

### GetThumbnail
- v2.21.0

Retorna a imagem miniatura de um item no programa

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do item |
| `ids` | _Array&lt;String&gt; (opcional)_ | ID dos itens |
| `type` | _String_ | Tipo do item. Pode ser: `video` `image` `announcement` `theme` `background` `api` `script` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.type` | _String_ | Tipo do item |
| `data.*.id` | _String_ | ID do item |
| `data.*.image` | _String_ | Imagem no formato base64 |


**Exemplo:**
```
Requisição
{
  "id": "image.jpg",
  "type": "image"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "type": "image",
      "id": "image.jpg",
      "image": "..."
    }
  ]
}
```


---

### GetColorMap
- v2.20.0

Retorna as informações de cor predominante de um respectivo tipo de item.<br/>O array retornado contém 8 índices, e cada índice corresponde ao trecho conforme imagem de exemplo a seguir.<br/> <br/>![Color Map Example](https://holyrics.com.br/images/color_map_item_example.png)<br/>

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `type` | _String_ | Um dos seguintes valores:<br/>**background** - um item de tema ou plano de fundo<br/>**presentation** - apresentação atual em exibição<br/>**image** - uma imagem da aba 'imagens'<br/>**video** - um vídeo da aba 'vídeos'<br/>**printscreen** - um printscreen atual de uma tela do sistema<br/> |
| `source` | _Object (opcional)_ | O item de acordo com o tipo informado:<br/>**background** - ID do tema ou plano de fundo<br/>**presentation** - não é necessário informar um valor, a apresentação da tela público será retornada<br/>**image** - o nome do arquivo da aba 'imagens'<br/>**video** - o nome do arquivo da aba 'vídeos'<br/>**printscreen** `opcional` -  o nome da tela (public, screen_2, screen_3, ...); o padrão é `public`<br/> |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.hex` | _String_ | Cor no formato hexadecimal |
| `data.*.red` | _Number_ | Vermelho  `0 ~ 255` |
| `data.*.green` | _Number_ | Verde  `0 ~ 255` |
| `data.*.blue` | _Number_ | Azul  `0 ~ 255` |


**Exemplo:**
```
Requisição
{
  "type": "background",
  "source": 12345678
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "hex": "0000FF",
      "red": 0,
      "green": 0,
      "blue": 255
    },
    {
      "...": "..."
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
