Funcionalidade: Enviar Pontos

  Contexto:
    Dado que existem dois usuários cadastrados e confirmados
    E que o usuário remetente está autenticado

  Cenário: Enviar pontos com sucesso para um CPF válido
    Quando o usuário remetente envia 50 pontos para o CPF válido do destinatário
    Então o sistema deve retornar o status 200
    E a mensagem "Pontos enviados com sucesso."

  Cenário: Retornar erro 400 para valor inválido (amount = 0)
    Quando o usuário remetente envia 0 pontos para o CPF válido do destinatário
    Então o sistema deve retornar o status 400
    E a mensagem de erro "Valor inválido"

  Cenário: Retornar erro 401 para token inválido
    Quando um token inválido é usado para enviar 50 pontos para o CPF válido do destinatário
    Então o sistema deve retornar o status 401
    E a mensagem de erro "Token inválido ou expirado"

  Cenário: Retornar erro 404 para CPF destinatário inexistente
    Quando o usuário remetente envia 50 pontos para um CPF que não existe
    Então o sistema deve retornar o status 404
    E a mensagem de erro "Usuário destino não encontrado"

  Cenário: Retornar erro 400 para saldo insuficiente
    Quando o usuário remetente tenta enviar 300 pontos para o CPF válido do destinatário, mas não possui saldo suficiente
    Então o sistema deve retornar o status 400
    E a mensagem de erro "Saldo insuficiente"
