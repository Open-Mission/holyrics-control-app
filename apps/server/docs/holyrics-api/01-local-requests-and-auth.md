<!--
Fonte original: /Users/claudio/Downloads/holyrics-api.md
Recorte gerado de forma mecânica. Linhas originais: 23-172.
-->

# Requisições locais, token, hash e nonce

# Exemplo de requisição pela rede local

Você pode passar o token na URL para realizar a requisição.
<br/>
Porém por se tratar de conexão local sem SSL, se você quiser uma maior segurança, utilize o método "hash" para enviar as requisições sem precisar informar o token de acesso na requisição.

URL padrão - Utilizando token

```
http://[IP]:[PORT]/api/{action}?token=abcdef
```

URL padrão - Utilizando hash

```
http://[IP]:[PORT]/api/{action}?dtoken=xyz123&sid=456&rid=3

dtoken
hash gerado para cada requisição a partir de um 'nonce' (token temporário) obtido pelo servidor

sid
ID da sessão, obtido junto com o nonce

rid: request id
Enviado pelo cliente, um número positivo que deve ser sempre maior do que o utilizado na requisição anterior
```

Requisição

```
Utilizando token
curl -X 'POST' \
  'http://ip:port/api/GetCPInfo?token=abcdef' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

```
Utilizando hash
nonce = '1a2b3c';  <- token temporário
rid   = 4;         <- id da requisição
token = 'abcdef';  <- token de acesso
data  = '{}';      <- conteúdo da requisição

dtoken é o resumo sha256 da concatenação das informações da requisição conforme exemplo
dtoken = sha256(nonce + ':' + rid + ':' + token + ':' + data);
resultado: f3391f69cbe03940bd0d4a63ee191092aab2f3573f56b410a9cf94da05d4cdb5

curl -X 'POST' \
  'http://ip:port/api/GetCPInfo?sid=abc&rid=4&dtoken=f3391f69cbe03940bd0d4a63ee191092aab2f3573f56b410a9cf94da05d4cdb5' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

Resposta

```
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

Requisição

```
Utilizando token
curl -X 'POST' \
  'http://ip:port/api/SetTextCP?token=abcdef' \
  -H 'Content-Type: application/json' \
  -d '{"text": "Example", "show": true, "display_ahead": true}'
```

```
Utilizando hash
nonce = '1a2b3c';
rid   = 5;
token = 'abcdef';
data  = '{"text": "Example", "show": true, "display_ahead": true}';

dtoken = sha256(nonce + ':' + rid + ':' + token + ':' + data);
resultado: 02a7789759694c535cd032489bf101110837c972d76cec51c7ad7e797696749d

curl -X 'POST' \
  'http://ip:port/api/SetTextCP?sid=abc&rid=5&dtoken=02a7789759694c535cd032489bf101110837c972d76cec51c7ad7e797696749d' \
  -H 'Content-Type: application/json' \
  -d '{"text": "Example", "show": true, "display_ahead": true}'
```

Resposta

```
{ "status": "ok" }
```

---

No caso de erro, **status** irá retornar **error**, exemplo:

```
{
    "status": "error",
    "error": "invalid token"
}
```

### Como obter um nonce

Utilize a ação 'Auth' sem incluir parâmetros na URL para obter um nonce
```
Requisição
http://ip:port/api/Auth

Resposta
{
    "status": "ok",
    "data": {
        "sid": "u80fbjbcknir",
        "nonce":"b58ba4f605bed27c40a20be53ee3cf3d"
    }
}
```

Utilize a ação 'Auth' novamente para se autenticar, passando os parâmetros na URL

```
nonce = 'b58ba4f605bed27c40a20be53ee3cf3d';
rid   = 0;       <- deve ser zero para autenticação
token = '1234';  <- token de acesso
data  = 'auth';  <- deve ser 'auth' para autenticação

dtoken = sha256(nonce + ':' + rid + ':' + token + ':' + data);
resultado: 5d632009dfde5e9771b4f98f1b28c88ac2f73ae1f9d81b62a9af241a304c4d7a

http://ip:port/api/Auth?sid=u80fbjbcknir&rid=0&dtoken=5d632009dfde5e9771b4f98f1b28c88ac2f73ae1f9d81b62a9af241a304c4d7a

Resposta
{ "status": "ok" }
```
