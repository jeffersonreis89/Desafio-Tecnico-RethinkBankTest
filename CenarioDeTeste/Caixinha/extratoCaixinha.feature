Funcionalidade: Extrato da Caixinha de Pontos

  Contexto:
    Dado que um usuário está cadastrado, confirmado e autenticado

  Cenário: Consultar extrato vazio ou sem registros antes de qualquer depósito
    Quando o usuário solicita o extrato da caixinha
    Então o sistema deve retornar status 200
    E o extrato deve ser um array (pode estar vazio)

  Cenário: Consultar extrato após realizar um depósito
    Dado que o usuário realizou um depósito de 30 pontos na caixinha
    Quando o usuário solicita o extrato da caixinha
    Então o sistema deve retornar status 200
    E o extrato deve ser um array com pelo menos uma entrada
    E a primeira entrada deve conter:
      | campo      | valor esperado  |
      | id         | qualquer valor  |
      | user_id    | qualquer valor  |
      | type       | "deposit"      |
      | amount     | 30             |
      | created_at | qualquer valor  |

  Cenário: Consultar extrato com token inválido
    Quando o usuário solicita o extrato da caixinha com token inválido
    Então o sistema deve retornar status 401
    E a mensagem de erro deve ser "Token inválido ou expirado"
