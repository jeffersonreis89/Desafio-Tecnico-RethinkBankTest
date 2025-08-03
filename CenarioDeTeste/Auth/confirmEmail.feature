Funcionalidade: Confirmação de E-mail
  Como usuário recém cadastrado
  Quero confirmar meu e-mail usando um token válido
  Para ativar minha conta e poder acessar o sistema

  Cenário: Confirmar e-mail com token válido
    Dado que eu realizei o cadastro e recebi um token de confirmação válido
    Quando eu acesso o endpoint de confirmação com esse token
    Então o sistema deve retornar status 200
    E a resposta deve ser "E-mail confirmado com sucesso."

  Cenário: Confirmar e-mail com token inválido
    Quando eu tento confirmar o e-mail com um token inválido
    Então o sistema deve retornar status 400
    E a resposta deve ser "Token inválido ou expirado."

  Cenário: Confirmar e-mail com token expirado
    Dado que eu tenho um token de confirmação expirado
    Quando eu tento confirmar o e-mail com esse token
    Então o sistema deve retornar status 400
    E a resposta deve ser "Token inválido ou expirado."
