Funcionalidade: Extrato de Pontos

  Contexto:
    Dado que existem dois usuários cadastrados e confirmados
    E que o usuário remetente está autenticado

  Cenário: Retornar extrato vazio quando nenhum ponto foi enviado
    Quando o usuário consulta o extrato de pontos
    Então o sistema deve retornar status 200
    E a lista do extrato deve estar vazia

  Cenário: Enviar pontos com sucesso para um CPF válido
    Quando o usuário remetente envia 50 pontos para o CPF válido do destinatário
    Então o sistema deve retornar status 200
    E a mensagem "Pontos enviados com sucesso."

  Cenário: Retornar extrato com transação após envio de pontos
    Quando o usuário consulta o extrato de pontos após realizar uma transferência
    Então o sistema deve retornar status 200
    E o extrato deve conter ao menos uma transação
    E a transação deve conter as propriedades: id, from_user, to_user, amount (50) e created_at
