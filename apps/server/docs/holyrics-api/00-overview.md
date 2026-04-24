<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 1-22.
-->

# Visão geral

# API-Server
**PT** | [EN](README-en.md)

O programa Holyrics disponibiliza uma interface de comunicação para receber requisições tanto pela rede local quanto pela internet.
<br/>
Ao realizar uma requisição, a implementação padrão desta documentação será utilizada.
<br/>
Mas também é possível implementar um método JavaScript no próprio programa Holyrics para que as requisições sejam redirecionadas para esse método e executar ações customizadas conforme necessidade.
<br/>
Utilize o método `POST` e o `Content-Type: application/json` para realizar as requisições.
<br/>
É necessário adicionar na URL da requisição o parâmetro `token`, que é criado nas configurações API Server, opção 'gerenciar permissões'.
<br/>
Você pode criar múltiplos tokens e definir as permissões de cada token.
<br/>

Para acessar as configurações API Server:
<br/>
Menu arquivo > Configurações > API Server

`v2.25.0+` Adicionada compatibilidade com [ETag](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/ETag)
