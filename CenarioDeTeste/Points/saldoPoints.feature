Funcionalidade: Saldo Geral de Pontos

  Contexto:
    Dado que um usuário está cadastrado, confirmado e autenticado

  Cenário: Consultar saldo geral com token válido
    Quando o usuário consulta seu saldo geral
    Então o sistema deve retornar status 200
    E o saldo normal e o saldo da caixinha devem ser números

  Cenário: Novo usuário inicia com 100 pontos no saldo normal
    Dado que um novo usuário foi cadastrado e confirmado
    Quando esse novo usuário consulta seu saldo geral
    Então o sistema deve retornar status 200
    E o saldo normal deve ser igual a 100

  Cenário: Consultar saldo geral com token inválido
    Quando o usuário consulta o saldo com um token inválido
    Então o sistema deve retornar status 401
    E a mensagem de erro deve ser "Token inválido ou expirado"
