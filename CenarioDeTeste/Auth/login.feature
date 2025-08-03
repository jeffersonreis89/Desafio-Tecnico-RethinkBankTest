Funcionalidade: Login de Usuário
  Como usuário cadastrado e com e-mail confirmado
  Quero realizar login com minhas credenciais válidas
  Para acessar o sistema

  Cenário: Login com sucesso
    Dado que eu sou um usuário cadastrado e com e-mail confirmado
    Quando eu envio meu e-mail e senha corretos para o endpoint de login
    Então o sistema deve retornar status 200
    E a resposta deve conter um token de autenticação

  Cenário: Login com e-mail não cadastrado
    Dado que eu tento logar com um e-mail que não está cadastrado
    Quando eu envio o e-mail e senha para o endpoint de login
    Então o sistema deve retornar status 400
    E a resposta deve conter o erro "Credenciais inválidas"

  Cenário: Login com senha incorreta
    Dado que eu sou um usuário cadastrado e com e-mail confirmado
    E eu forneço uma senha incorreta para o login
    Quando eu envio as credenciais para o endpoint de login
    Então o sistema deve retornar status 400
    E a resposta deve conter o erro "Credenciais inválidas"

  Cenário: Login com e-mail não confirmado
    Dado que eu sou um usuário cadastrado mas ainda não confirmei meu e-mail
    Quando eu tento realizar login com minhas credenciais
    Então o sistema deve retornar status 403
    E a resposta deve conter o erro "E-mail não confirmado"
