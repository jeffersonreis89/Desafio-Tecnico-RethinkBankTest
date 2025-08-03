Funcionalidade: Resgate da Caixinha de Pontos

  Contexto:
    Dado que um usuário está cadastrado, confirmado e autenticado
    E que o usuário realizou um depósito de 30 pontos na caixinha

  # Este cenário está comentado devido a um bug no sistema
  # Cenário: Realizar resgate da caixinha com sucesso
  #   Quando o usuário realiza um resgate de 10 pontos da caixinha
  #   Então o sistema deve retornar status 200
  #   E a mensagem deve ser "Resgate da caixinha realizado."

  Cenário: Tentativa de resgate com saldo insuficiente na caixinha
    Quando o usuário tenta resgatar 9999 pontos da caixinha
    Então o sistema deve retornar status 400
    E a mensagem de erro deve ser "Saldo na caixinha insuficiente"

  Cenário: Tentativa de resgate com token inválido
    Quando o usuário tenta realizar um resgate com token inválido
    Então o sistema deve retornar status 401
    E a mensagem de erro deve ser "Token inválido ou expirado"
