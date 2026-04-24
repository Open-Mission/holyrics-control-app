<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 1015-1335.
-->

# Ações: áudios, vídeos, imagens e arquivos

### GetAudios
### GetVideos
### GetImages
### GetFiles
- v2.19.0

Retorna a lista de arquivos da respectiva aba: áudio, vídeo, imagem, arquivo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `folder` | _String (opcional)_ | Nome da subpasta para listar os arquivos |
| `filter` | _String (opcional)_ | Filtrar arquivos pelo nome |
| `include_metadata` | _Boolean (opcional)_ | Adicionar metadados na resposta `Padrão: false` `v2.22.0+` |
| `include_thumbnail` | _Boolean (opcional)_ | Adicionar thumbnail na resposta (80x45) `Padrão: false` `v2.22.0+` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Array&lt;Object&gt;_ |  |
| `data.*.name` | _String_ | Nome do item |
| `data.*.isDir` | _Boolean_ | Retorna **true** se for uma pasta ou **false** se for arquivo. |
| `data.*.properties` | _Object_ | Mapa com as propriedades customizadas definidas para o arquivo `v2.24.0+` |
| <br>Disponível se **include_metadata=true** |  |  |
| `data.*.length` | _Number_ | Tamanho do arquivo (bytes). Disponível se **isDir=false** `v2.22.0+` |
| `data.*.modified_time` | _String_ | Data de modificação do arquivo. Data e hora no formato: YYYY-MM-DD HH:MM `v2.22.0+` |
| `data.*.modified_time_millis` | _String_ | Data de modificação do arquivo. (timestamp) `v2.24.0+` |
| `data.*.duration_ms` | _Number_ | Duração do arquivo. Disponível se o arquivo for: audio ou vídeo `v2.22.0+` |
| `data.*.width` | _Number_ | Largura. Disponível se o arquivo for: imagem ou vídeo `v2.22.0+` |
| `data.*.height` | _Number_ | Altura. Disponível se o arquivo for: imagem ou vídeo `v2.22.0+` |
| `data.*.position` | _String_ | Ajuste da imagem. Disponível para imagens. Pode ser: `adjust` `extend` `fill` `v2.22.0+` |
| `data.*.blur` | _Boolean_ | Aplicar efeito blur `v2.22.0+` |
| `data.*.transparent` | _Boolean_ | Exibir imagens com transparência `v2.22.0+` |
| `data.*.last_executed_time` | _String_ | Data da última execução do arquivo. Data e hora no formato: YYYY-MM-DD HH:MM `v2.24.0+` |
| `data.*.last_executed_time_millis` | _Number_ | Data da última execução do arquivo. (timestamp) `v2.24.0+` |
| <br>Disponível se **include_thumbnail=true** |  |  |
| `data.*.thumbnail` | _String_ | Imagem no formato base64 `v2.22.0+` |


**Exemplo:**
```
Requisição
{
  "folder": "folder_name",
  "filter": "abc"
}

Resposta
{
  "status": "ok",
  "data": [
    {
      "name": "abcd",
      "isDir": true,
      "properties": {}
    },
    {
      "name": "abcd.jpg",
      "isDir": false,
      "properties": {}
    }
  ]
}
```


---

### GetAudio
### GetVideo
### GetImage
### GetFile
- v2.24.0

Retorna os dados de um arquivo da lista de arquivos da respectiva aba: áudio, vídeo, imagem, arquivo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do arquivo (incluindo subpasta) |
| `include_metadata` | _Boolean (opcional)_ | Adicionar metadados na resposta `Padrão: false` |
| `include_thumbnail` | _Boolean (opcional)_ | Adicionar thumbnail na resposta (80x45) `Padrão: false` |


**Resposta:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `data` | _Object_ |  |
| `data.name` | _String_ | Nome do item |
| `data.isDir` | _Boolean_ | Retorna **true** se for uma pasta ou **false** se for arquivo. |
| `data.properties` | _Object_ | Mapa com as informações customizadas salvas no arquivo |
| <br>Disponível se **include_metadata=true** |  |  |
| `data.length` | _Number_ | Tamanho do arquivo (bytes). Disponível se **isDir=false** |
| `data.modified_time` | _String_ | Data de modificação do arquivo. Data e hora no formato: YYYY-MM-DD HH:MM |
| `data.modified_time_millis` | _Number_ | Data de modificação do arquivo. (timestamp) |
| `data.duration_ms` | _Number_ | Duração do arquivo. Disponível se o arquivo for: audio ou vídeo |
| `data.width` | _Number_ | Largura. Disponível se o arquivo for: imagem ou vídeo |
| `data.height` | _Number_ | Altura. Disponível se o arquivo for: imagem ou vídeo |
| `data.position` | _String_ | Ajuste da imagem. Disponível para imagens. Pode ser: `adjust` `extend` `fill` |
| `data.blur` | _Boolean_ | Aplicar efeito blur |
| `data.transparent` | _Boolean_ | Exibir imagens com transparência |
| `data.last_executed_time` | _String_ | Data da última execução do arquivo. Data e hora no formato: YYYY-MM-DD HH:MM |
| `data.last_executed_time_millis` | _Number_ |  |
| <br>Disponível se **include_thumbnail=true** |  |  |
| `data.thumbnail` | _String_ | Imagem no formato base64 |


**Exemplo:**
```
Requisição
{
  "name": "filename.mp3",
  "include_metadata": true
}

Resposta
{
  "status": "ok",
  "data": {
    "name": "",
    "isDir": false,
    "length": 0,
    "modified_time": "",
    "modified_time_millis": 0,
    "duration_ms": 0,
    "width": 0,
    "height": 0,
    "position": "",
    "blur": false,
    "transparent": false,
    "last_executed_time": "",
    "last_executed_time_millis": 0,
    "properties": {}
  }
}
```


---

### SetAudioItemProperty
### SetVideoItemProperty
### SetImageItemProperty
### SetFileItemProperty
- v2.24.0

Altera as informações customizadas de um arquivo

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `name` | _String_ | Nome do arquivo (incluindo subpasta) |
| `properties` | _Object_ | Mapa chave/valor com as informações que serão alteradas. Os valores passados serão MESCLADOS com os valores existentes. Ou seja, não é necessário enviar parâmetros que não serão alterados (ou removidos). |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "name": "filename.mp3",
  "properties": {
    "key": "value 1",
    "abc": "value 2",
    "example": "value 3"
  }
}
```


---

### PlayAudio
- v2.19.0

Executa um áudio ou uma lista de áudios (pasta)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String_ | Nome do arquivo ou da pasta. Exemplo: **arquivo.mp3** ou **pasta** ou **pasta/arquivo.mp3** |
| `settings` | _[PlayMediaSettings](#play-media-settings) (opcional)_ | Configurações para execução da mídia `v2.21.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "file": "audio.mp3"
}
```


---

### PlayVideo
- v2.19.0

Executa um vídeo ou uma lista de vídeos (pasta)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String_ | Nome do arquivo ou da pasta. Exemplo: **arquivo.mp4** ou **pasta** ou **pasta/arquivo.mp4** |
| `settings` | _[PlayMediaSettings](#play-media-settings) (opcional)_ | Configurações para execução da mídia `v2.21.0+` |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "file": "video.mp4"
}
```


---

### ShowImage
- v2.19.0

Apresenta uma imagem ou uma lista de imagens (pasta)

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String_ | Nome do arquivo ou da pasta. Exemplo: **arquivo.jpg** ou **pasta** ou **pasta/arquivo.jpg** |
| `automatic` | _[Automatic](#automatic) (opcional)_ | Se informado, a apresentação dos itens será automática |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "file": "image.jpg"
}
```


---

### ExecuteFile
- v2.21.0

Executa um arquivo. Somente extensões seguras ou adicionadas na lista de exceção.

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String_ | Nome do arquivo |


_Método sem retorno_

**Exemplo:**
```
Requisição
{
  "file": "file.txt"
}
```


---

### AudioExists
### VideoExists
### ImageExists
### FileExists
- v2.21.0

Verifica se existe o arquivo com o nome informado

**Parâmetros:**

| Nome | Tipo  | Descrição |
| ---- | :---: | ------------|
| `file` | _String_ | Nome do arquivo |


**Resposta:**

| Nome | Tipo  |
| ---- | :---: |
| `data` | _Boolean_| 


**Exemplo:**
```
Requisição
{
  "file": "file.mp3"
}

Resposta
{
  "status": "ok",
  "data": true
}
```


---
