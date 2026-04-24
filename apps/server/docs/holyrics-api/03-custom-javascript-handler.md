<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 291-330.
-->

# Implementação JavaScript customizada

# Exemplo de implementação JavaScript

Utilize os métodos da classe [JSLIB](https://github.com/holyrics/jslib/blob/main/README.md) para criar sua própria implementação.
<br/>
Se você criar sua própria implementação, é necessário retornar 'true' se quiser que o programa consuma a requisição utilizando a implementação padrão.
<br/>
Qualquer valor retornado que seja diferente de 'true', o programa irá considerar que a requisição já foi consumida e vai respondê-la com o valor retornado.

```javascript
function request(action, headers, content, info) {
    switch (action) {
        case 'my_custom_action':
            //executar sua própria ação e resposta
            return {'status': 'ok'}; //  <-  Resposta da requisição
    }
    //Retornando 'true' para o programa consumir esta requisição com a implementação padrão
    return true;
}

```

### Parâmetros do método

`action` - Nome da ação

`headers` - Contém os cabeçalhos da requisição. Exemplo: `headers.Authorization`

`content` - Objeto com o conteúdo extraído da requisição. Exemplo: `content.theme.id`

`info` - Informações da requisição.
<br/>
`info.client_address` Endereço da origem da requisição
<br/>
`info.token` token de acesso utilizado na requisição
<br/>
`info.local` **true** se a origem da requisição for da rede local
<br/>
`info.web` **true** se a origem da requisição for da internet
<br/>
