<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 4458-4730.
-->

# Ações: painel de comunicação

### GetCommunicationPanelInfo
### GetCPInfo
### GetCPSettings
- v2.19.0

Configuração atual do painel de comunicação



**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data.text` | _String_ | Texto atual |
| `data.show` | _Boolean_ | Se o texto atual está em exibição |
| `data.display_ahead` | _Boolean_ | Se a opção *'exibir à frente de tudo'* está ativada |
| `data.alert_text` | _String_ | Texto atual do alerta |
| `data.alert_show` | _Boolean_ | Se a exibição do alerta está ativada |
| `data.countdown_show` | _Boolean_ | Se uma contagem regressiva está em exibição |
| `data.countdown_time` | _Number_ | O tempo atual da contagem regressiva em exibição (em segundos) |
| `data.stopwatch_show` | _Boolean_ | Se um cronômetro está em exibição `v2.20.0+` |
| `data.stopwatch_time` | _Number_ | O tempo atual do cronômetro em exibição (em segundos) `v2.20.0+` |
| `data.theme` | _String_ | ID do tema `v2.20.0+` |
| `data.countdown_font_relative_size` | _Number_ | Tamanho relativo da contagem regressiva `v2.20.0+` |
| `data.countdown_font_color` | _String_ | Cor da fonte da contagem regressiva `v2.20.0+` |
| `data.stopwatch_font_color` | _String_ | Cor da fonte do cronômetro `v2.20.0+` |
| `data.time_font_color` | _String_ | Cor da fonte da hora `v2.20.0+` |
| `data.display_clock_as_background` | _Boolean_ | Exibir relógio como plano de fundo `v2.20.0+` |
| `data.display_clock_on_alert` | _Boolean_ | Exibir relógio no alerta `v2.20.0+` |
| `data.countdown_display_location` | _String_ | Local de exibição da contagem regressiva ou cronômetro. `FULLSCREEN`  `FULLSCREEN_OR_ALERT`  `ALERT` `v2.20.0+` |
| `data.display_clock_with_countdown_fullscreen` | _Boolean_ | Exibir relógio junto da contagem regressiva ou cronômetro quando exibido em tela cheia `v2.20.0+` |
| `data.display_vlc_player_remaining_time` | _Boolean_ | Exibir tempo restante da mídia em execução no VLC Player `v2.20.0+` |
| `data.attention_icon_color` | _String_ | Cor do ícone do botão **Atenção** `v2.23.0+` |
| `data.attention_background_color` | _String_ | Cor do fundo do ícone do botão **Atenção** `v2.23.0+` |
| `data.countdown_hide_zero_minute` | _Boolean_ | Ocultar a exibição dos minutos quando for zero `v2.25.0+` |
| `data.countdown_hide_zero_hour` | _Boolean_ | Ocultar a exibição das horas quando for zero `v2.25.0+` |
| `data.stopwatch_hide_zero_minute` | _Boolean_ | Ocultar a exibição dos minutos quando for zero `v2.25.0+` |
| `data.stopwatch_hide_zero_hour` | _Boolean_ | Ocultar a exibição das horas quando for zero `v2.25.0+` |


**Exemplo:**
```
Resposta
{
  "status": "ok",
  "data": {
    "text": "",
    "show": false,
    "display_ahead": false,
    "alert_text": "",
    "alert_show": false,
    "countdown_show": false,
    "countdown_time": 0
  }
}
```


---

### SetCommunicationPanelSettings
### SetCPSettings
- v2.20.0

Alterar configuração atual do painel de comunicação.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String_ | Texto atual |
| `show` | _Boolean_ | Exibir o texto atual |
| `display_ahead` | _Boolean_ | Opção *'exibir à frente de tudo'* |
| `theme` | _Object_ | ID ou nome do tema padrão |
| `theme.id` | _String_ |  |
| `theme.name` | _String_ |  |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado `v2.21.0+` |
| `alert_text` | _String_ | Texto atual do alerta |
| `alert_show` | _Boolean_ | Ativar a exibição do alerta |
| `countdown_font_relative_size` | _Number_ | Tamanho relativo da contagem regressiva |
| `countdown_font_color` | _String_ | Cor da fonte da contagem regressiva |
| `stopwatch_font_color` | _String_ | Cor da fonte do cronômetro |
| `time_font_color` | _String_ | Cor da fonte da hora |
| `display_clock_as_background` | _Boolean_ | Exibir relógio como plano de fundo |
| `display_clock_on_alert` | _Boolean_ | Exibir relógio no alerta |
| `countdown_display_location` | _String_ | Local de exibição da contagem regressiva ou cronômetro. `FULLSCREEN`  `FULLSCREEN_OR_ALERT`  `ALERT` |
| `display_clock_with_countdown_fullscreen` | _Boolean_ | Exibir relógio junto da contagem regressiva ou cronômetro quando exibido em tela cheia |
| `display_vlc_player_remaining_time` | _Boolean_ | Exibir tempo restante da mídia em execução no VLC Player |
| `attention_icon_color` | _String_ | Cor do ícone do botão **Atenção** `v2.23.0+` |
| `attention_background_color` | _String_ | Cor do fundo do ícone do botão **Atenção** `v2.23.0+` |
| `countdown_hide_zero_minute` | _Boolean_ | Ocultar a exibição dos minutos quando for zero `v2.25.0+` |
| `countdown_hide_zero_hour` | _Boolean_ | Ocultar a exibição das horas quando for zero `v2.25.0+` |
| `stopwatch_hide_zero_minute` | _Boolean_ | Ocultar a exibição dos minutos quando for zero `v2.25.0+` |
| `stopwatch_hide_zero_hour` | _Boolean_ | Ocultar a exibição das horas quando for zero `v2.25.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "display_clock_as_background": false,
  "display_clock_on_alert": true
}
```


---

### StartCountdownCommunicationPanel
### StartCountdownCP
- v2.19.0

Inicia uma contagem regressiva no painel de comunicação

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `minutes` | _Number_ | Quantidade de minutos. Opcional se `exact_time` for declarado |
| `seconds` | _Number_ | Quantidade de segundos. Opcional se `exact_time` for declarado |
| `exact_time` | _String_ | Definir uma hora exata. Pode ser: `HH:MM:SS` ou `HH:MM`. Opcional se `minutes` ou `seconds` forem declarados `v2.27.0+` |
| `yellow_starts_at` | _Number (opcional)_ | Valor em segundos para definir a partir de quanto tempo a contagem regressiva ficará amarela |
| `stop_at_zero` | _Boolean (opcional)_ | Parar a contagem regressiva ao chegar em zero `Padrão: false` |
| `text` | _String (opcional)_ | Texto para exibição. Por padrão, o texto é exibido antes da parte numérica. Para formatação especial, utilize a variável `@cp_countdown` no meio do texto para indicar o local de exibição da parte numérica. `v2.24.0+` |
| `alert_text` | _String (opcional)_ | Texto alternativo para ser exibido quando a exibição for no alerta. Por padrão, o texto é exibido antes da parte numérica. Para formatação especial, utilize a variável `@cp_countdown` no meio do texto para indicar o local de exibição da parte numérica. `v2.24.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "minutes": 5,
  "seconds": 0,
  "yellow_starts_at": 60,
  "stop_at_zero": false
}
```


---

### StopCountdownCommunicationPanel
### StopCountdownCP
- v2.19.0

Encerra a contagem regressiva atual do painel de comunicação



_Método sem retorno_



---

### StartTimerCommunicationPanel
### StartTimerCP
- v2.20.0

Inicia um cronômetro no painel de comunicação

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String (opcional)_ | Texto para exibição. Por padrão, o texto é exibido antes da parte numérica. Para formatação especial, utilize a variável `@cp_countdown` no meio do texto para indicar o local de exibição da parte numérica. `v2.24.0+` |
| `alert_text` | _String (opcional)_ | Texto alternativo para ser exibido quando a exibição for no alerta. Por padrão, o texto é exibido antes da parte numérica. Para formatação especial, utilize a variável `@cp_countdown` no meio do texto para indicar o local de exibição da parte numérica. `v2.24.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{}
```


---

### StopTimerCommunicationPanel
### StopTimerCP
- v2.20.0

Encerra o cronômetro atual do painel de comunicação



_Método sem retorno_



---

### SetTextCommunicationPanel
### SetTextCP
- v2.19.0

Alterar o texto do painel de comunicação

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String (opcional)_ | Alterar o texto do painel de comunicação. [Styled Text](https://github.com/holyrics/Scripts/blob/main/StyledText.md) a partir da v2.19.0 |
| `show` | _Boolean (opcional)_ | Exibir/ocultar o texto |
| `display_ahead` | _Boolean (opcional)_ | Alterar a opção *'exibir à frente de tudo'* |
| `theme` | _Object (opcional)_ | ID ou nome do Tema utilizado para exibir o texto `v2.21.0+` |
| `custom_theme` | _[Theme](#theme) (opcional)_ | Tema personalizado para exibir o texto `v2.21.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "text": "",
  "show": true,
  "display_ahead": true
}
```


---

### SetAlertCommunicationPanel
### SetAlertCP
- v2.19.0

Alterar as configurações de alerta do painel de comunicação

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `text` | _String (opcional)_ | Alterar o texto de alerta |
| `show` | _Boolean (opcional)_ | Exibir/ocultar o alerta |
| `close_after_seconds` | _Number (opcional)_ | Remover texto de alerta automaticamente após X segundos. `0 ~ 3600` `Padrão: 0` `v2.27.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "text": "",
  "show": false
}
```


---

### CommunicationPanelCallAttention
### CPCallAttention
- v2.20.0

Executa a opção 'chamar atenção' disponível no painel de comunicação



_Método sem retorno_



---
