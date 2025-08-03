Funcionalidade: Depósito na Caixinha de Pontos

  Contexto:
    Dado que um usuário está cadastrado, confirmado e autenticado

  Cenário: Realizar depósito na caixinha com sucesso
    Quando o usuário realiza um depósito de 30 pontos na caixinha
    Então o sistema deve retornar status 200
    E a mensagem deve ser "Depósito na caixinha realizado."

  Cenário: Tentativa de depósito com saldo insuficiente
    Quando o usuário tenta depositar 9999 pontos na caixinha
    Então o sistema deve retornar status 400
    E a mensagem de erro deve ser "Saldo insuficiente"

  Cenário: Tentativa de depósito com token inválido
    Quando o usuário tenta realizar um depósito com token inválido
    Então o sistema deve retornar status 401
    E a mensagem de erro deve ser "Token inválido ou expirado"
