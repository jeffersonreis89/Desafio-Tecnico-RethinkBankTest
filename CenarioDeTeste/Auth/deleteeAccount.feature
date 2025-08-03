Funcionalidade: Exclusão de Conta
  Como usuário autenticado
  Quero excluir minha conta fornecendo a senha correta
  Para que minha conta seja marcada como deletada no sistema

  Cenário: Excluir conta com sucesso
    Dado que eu sou um usuário autenticado com token válido
    E forneço a senha correta da minha conta
    Quando eu envio a requisição para excluir a conta
    Então o sistema deve retornar status 200
    E a resposta deve conter a mensagem "Conta marcada como deletada."

  Cenário: Tentativa de exclusão com senha incorreta
    Dado que eu sou um usuário autenticado com token válido
    E forneço uma senha incorreta
    Quando eu envio a requisição para excluir a conta
    Então o sistema deve retornar status 400
    E a resposta deve conter o erro "Senha inválida"

  Cenário: Tentativa de exclusão sem token válido
    Dado que eu tento excluir a conta sem um token válido
    Quando eu envio a requisição para excluir a conta
    Então o sistema deve retornar status 401
    E a resposta deve conter o erro "Token inválido ou expirado"
