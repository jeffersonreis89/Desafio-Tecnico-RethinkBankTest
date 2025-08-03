Funcionalidade: Cadastro de Usuário
  Como um novo usuário
  Quero me cadastrar no sistema
  Para poder utilizar as funcionalidades protegidas

  Contexto:
    Dado que estou acessando a API de cadastro de usuário

  Cenário: Cadastro bem-sucedido
    Quando eu envio um payload válido com CPF, nome, e-mail, senha e confirmação de senha corretos
    Então o sistema deve responder com status 201
    E deve retornar a mensagem "Cadastro realizado com sucesso."
    E deve retornar um campo "confirmToken" no corpo da resposta

  Cenário: Resposta deve conter apenas campos esperados
    Quando eu realizo o cadastro com sucesso
    Então o corpo da resposta deve conter apenas os campos "message" e "confirmToken"

  Cenário: Senhas diferentes
    Quando eu envio um cadastro com senha e confirmação de senha diferentes
    Então o sistema deve responder com status 400
    E a mensagem de erro deve ser "Senhas não conferem"

  Cenário: Senha muito curta
    Quando eu envio uma senha com menos de 8 caracteres
    Então o sistema deve retornar status 400 e mensagem "Senha fraca"

  Cenário: Senha sem letra maiúscula
    Quando eu envio uma senha sem nenhuma letra maiúscula
    Então o sistema deve retornar status 400 e mensagem "Senha fraca"

  Cenário: Senha sem caractere especial
    Quando eu envio uma senha sem caractere especial
    Então o sistema deve retornar status 400 e mensagem "Senha fraca"

  Cenário: E-mail inválido
    Quando eu envio um e-mail no formato inválido
    Então o sistema deve retornar status 400 e mensagem "Email inválido"

  Cenário: Nome incompleto
    Quando eu envio um nome com apenas um nome
    Então o sistema deve retornar status 400 e mensagem "Nome completo obrigatório"

  Cenário: CPF com letras
    Quando eu envio um CPF com caracteres não numéricos
    Então o sistema deve retornar status 400 e mensagem "CPF inválido"

  Cenário: CPF com menos de 11 dígitos
    Quando eu envio um CPF com menos de 11 números
    Então o sistema deve retornar status 400 e mensagem "CPF inválido"
