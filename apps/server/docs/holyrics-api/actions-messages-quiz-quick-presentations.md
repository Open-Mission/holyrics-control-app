<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 1336-1670.
-->

# Ações: avisos, mensagens, quiz e apresentação rápida

### ShowAnnouncement
- v2.19.0

Apresenta um anúncio ou uma lista de anúncios

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `id` | _String (opcional)_ | ID do anúncio. Pode ser **all** para exibir todos |
| `ids` | _Array&lt;String&gt; (opcional)_ | Lista com o ID de cada anúncio |
| `name` | _String (opcional)_ | Nome do anúncio |
| `names` | _Array&lt;String&gt; (opcional)_ | Lista com o nome de cada anúncio |
| `automatic` | _[Automatic](#automatic) (opcional)_ | Se informado, a apresentação dos itens será automática |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "id": "all",
  "ids": [],
  "name": "",
  "names": [],
  "automatic": {
    "seconds": 10,
    "repeat": true
  }
}
```


---

### GetCustomMessages
- v2.19.0

Lista das mensagens personalizadas



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[CustomMessage](#custom-message)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": [
    {
      "id": "123",
      "name": "Carro",
      "message_model": "Atenção proprietário do veículo    , placa   -  .",
      "message_example": "Atenção proprietário do veículo modelo cor, placa placa - motivo_carro.",
      "variables": [
        {
          "position": 32,
          "name": "modelo",
          "only_number": false,
          "uppercase": false,
          "suggestions": []
        },
        {
          "position": 34,
          "name": "cor",
          "only_number": false,
          "uppercase": false,
          "suggestions": []
        },
        {
          "position": 43,
          "name": "placa",
          "only_number": false,
          "uppercase": true,
          "suggestions": []
        },
        {
          "position": 47,
          "name": "motivo_carro",
          "only_number": false,
          "uppercase": false,
          "suggestions": [
            "Favor comparecer ao estacionamento",
            "Faróis acesos",
            "Alarme disparado",
            "Remover o veículo do local",
            "Comparecer ao estacionamento com urgência"
          ]
        }
      ]
    }
  ]
}
```


---

### ShowCustomMessage
- v2.19.0

Exibir uma mensagem personalizada. Obs.: Uma mensagem personalizada não é exibida diretamente na tela. é criada uma notificação no canto da tela para o operador aceitar e exibir.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome da mensagem personalizada |
| `position_?` | _Object (opcional)_ | Variável adicionada na posição especificada conforme valor retornado em **variables.*.position** da classe CustomMessage. |
| `params` | _Object (opcional)_ | Método alternativo. Mapa chave/valor onde a chave é o nome do campo **variables.*.name** da classe CustomMessage. Se necessário adicionar o mesmo parâmetro, adicione `*_n` no final do nome, começando em 2<br>Exemplo: **params.name, params.name_2, params.name_3** `v2.21.0+` |
| `note` | _String_ | Informação extra exibida na janela popup para o operador |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "Carro",
  "position_32": "modelo",
  "position_34": "cor",
  "position_43": "placa",
  "position_47": "motivo",
  "note": "..."
}
```


---

### ShowQuickPresentation
- v2.19.0

Apresentação rápida de um texto

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String_ | Texto que será exibido. [Styled Text](https://github.com/holyrics/Scripts/blob/main/StyledText.md) a partir da v2.19.0<br>Opcional se `slides` for declarado |
| `slides` | _Array&lt;[QuickPresentationSlide](#quick-presentation-slide)&gt;_ | Parâmetro alternativo para apresentações mais complexas<br>Opcional se `text` for declarado `v2.23.0+` |
| `theme` | _[ThemeFilter](#theme-filter) (opcional)_ | Filtrar tema selecionado para exibição |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado utilizado para exibir o texto `v2.21.0+` |
| `automatic` | _[Automatic](#automatic) (opcional)_ | Se informado, a apresentação dos itens será automática |
| `initial_index` | _Number (opcional)_ | Índice inicial da apresentação `Padrão: 0` `v2.23.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "text": "Example",
  "theme": {
    "name": "Theme name"
  }
}
```


---

### ShowCountdown
- v2.20.0

Exibir uma contagem regressiva na tela público

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `time` | _String_ | HH:MM ou MM:SS |
| `exact_time` | _Boolean (opcional)_ | Se **true**, `time` deve ser HH:MM (hora e minuto exato). Se **false**, `time` deve ser MM:SS (quantidade de minutos e segundos) `Padrão: false` |
| `text_before` | _String (opcional)_ | Texto exibido na parte superior da contagem regressiva |
| `text_after` | _String (opcional)_ | Texto exibido na parte inferior da contagem regressiva |
| `zero_fill` | _Boolean (opcional)_ | Preencher o campo 'minuto' com zero à esquerda `Padrão: false` |
| `hide_zero_minute` | _Boolean (opcional)_ | Ocultar a exibição dos minutos quando for zero `Padrão: false` `v2.25.0+` |
| `countdown_relative_size` | _Number (opcional)_ | Tamanho relativo da contagem regressiva `Padrão: 250` |
| `theme` | _[ThemeFilter](#theme-filter) (opcional)_ | Filtrar tema selecionado para exibição `v2.21.0+` |
| `countdown_style` | _[FontSettings](#font-settings) (opcional)_ | Fonte personalizada para a contagem regressiva `v2.21.0+` |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado `v2.21.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "time": "05:00",
  "zero_fill": true
}
```


---

### GetQuizList
- v2.26.0

Obter os grupos de múltipla escolha existentes



**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Array&lt;[QuizGroup](#quiz-group)&gt;_| 


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
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
}
```


---

### ShowQuiz
- v2.20.0

Iniciar uma apresentação no formato múltipla escolha

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `questions` | _Array&lt;[QuizQuestion](#quiz-question)&gt;_ | Questões para exibir |
| `settings` | _[QuizSettings](#quiz-settings)_ | Configurações |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "questions": [
    {
      "name": "Name",
      "title": "Example 1",
      "alternatives": [
        "Example 1a",
        "Example 2a",
        "Example 3a",
        "Example 4a"
      ],
      "correct_alternative_number": 2
    },
    {
      "title": "Example 2",
      "alternatives": [
        "Example 1b",
        "Example 2b",
        "Example 3b",
        "Example 4b"
      ],
      "correct_alternative_number": 2
    }
  ],
  "settings": {
    "display_alternatives_one_by_one": false,
    "alternative_char_type": "number"
  }
}
```


---

### QuizAction
- v2.20.0

Executar uma ação em uma apresentação de múltipla escolha

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `action` | _String (opcional)_ | Um dos seguintes valores: `previous_slide`  `next_slide`  `previous_question`  `next_question`  `show_result`  `close` |
| `hide_alternative` | _Number (opcional)_ | Ocultar uma alternativa. Começa em 1 |
| `select_alternative` | _Number (opcional)_ | Selecionar uma alternativa. Começa em 1 |
| `countdown` | _Number (opcional)_ | Iniciar uma contagem regressiva. [1-120] |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "action": "next_slide"
}
```


---
