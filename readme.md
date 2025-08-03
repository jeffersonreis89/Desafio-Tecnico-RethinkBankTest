# Testes Automatizados

Este projeto conta com uma suíte de testes automatizados utilizando Jest e Supertest para validar os principais fluxos e funcionalidades da API.

## Objetivo

Garantir a qualidade e confiabilidade do sistema por meio da validação automática dos endpoints, cobrindo cenários de sucesso e casos de erro esperados, tais como:

* Cadastro, confirmação de e-mail, login e exclusão de conta.
* Envio e consulta de pontos entre usuários.
* Gestão da caixinha de pontos, incluindo depósito, saque e consulta de extrato.
* Validação de autenticação e autorização via tokens JWT.
* Tratamento de situações de erro como token inválido, saldo insuficiente, dados incorretos e usuários inexistentes.

## Ferramentas utilizadas

* **Jest:** Framework de testes para JavaScript, responsável pela execução e organização dos testes.
* **Supertest:** Biblioteca para testes de APIs HTTP, utilizada para simular requisições aos endpoints da aplicação.

## Estrutura dos testes

Os testes estão organizados em pastas por funcionalidade, por exemplo:

* `__tests__/Auth` — testes relacionados a autenticação e cadastro.
* `__tests__/Points` — testes para funcionalidades de pontos.
* `__tests__/Caixinha` — testes para funcionalidades da caixinha de pontos.

Cada arquivo de teste cobre endpoints específicos, validando tanto os fluxos positivos quanto os fluxos de erro para garantir a robustez do sistema.

> Dentro do projeto, há uma pasta dedicada que contém os cenários de testes escritos no formato BDD Gherkin. Esses cenários servem como base e referência para a criação das automações, facilitando o desenvolvimento e garantindo maior clareza no entendimento de cada caso de teste.

## Como rodar os testes

1. **Instalar as dependências**

```bash
npm install
```

2. **Configurar o arquivo `.env`**

Crie um arquivo .env na raiz do projeto com o conteúdo abaixo:

```bash
API_BASE_URL=https://points-app-backend.vercel.app
EXPIRED_CONFIRM_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ODIxNjllYS00MDE4LTRkZjEtYjhiOC0yMTI1OTkyYWY1NzYiLCJpYXQiOjE3NTQxMjU5NzcsImV4cCI6MTc1NDIxMjM3N30.OOUTBo5L6P-V7RSk0kXIwhn2V0A4bbHMAY4apYmk-Qg
```

> **Importante:** O arquivo `.env` está incluído no `.gitignore` para proteger dados sensíveis e evitar o versionamento de informações confidenciais.

3. **Executar os testes**

```bash
npm test
```

Os testes irão rodar todos os cenários definidos, com relatórios no console indicando sucessos e falhas.

---

## Há bugs? Se sim, quais são e quais são os cenários esperados?

Sim foram encontrados bugs, durante a execução dos testes automatizados e manuais via Postman, foram identificadas as seguintes divergências entre o comportamento da API e o contrato esperado (Swagger):

---

### 🔧 Bug 1 - Mensagem divergente para token inválido

**Descrição:**
Conforme o Swagger, quando o JWT é ausente, inválido ou expirado, o sistema deveria retornar:

```json
{
  "error": "Não autorizado"
}
```

**Comportamento atual:**

* Quando **o token é inválido**, o status `401` está correto, **mas a mensagem retornada é:**
  `"Token inválido ou expirado"`
* Quando **o token está ausente**, a mensagem esperada é retornada corretamente:
  `"Não autorizado"`

**Endpoints impactados:**

* `DELETE /account`
* `POST /points/send`
* `GET /points/saldo`
* `GET /points/extrato`
* `GET /caixinha/extrato`

> ℹ️ *Nos testes automatizados, o token inválido é utilizado e o comentário no código sinaliza a divergência.*

---

### 🔧 Bug 2 - Transferência de pontos não reflete no destinatário

**Descrição:**
Ao realizar uma transferência de pontos, o valor é debitado corretamente do remetente, mas **não é creditado no destinatário**. Isso faz com que o saldo do destinatário permaneça inalterado.

**Esperado:**
O destinatário deveria ter seu `normal_balance` incrementado com o valor recebido.

**Endpoints impactados:**

* `POST /points/send`
* `GET /points/saldo`

---

### 🔧 Bug 3 - Mensagem incorreta para saldo insuficiente

**Descrição:**
Ao tentar realizar uma transferência com valor maior que o saldo do remetente, a API retorna:

```json
{
  "error": "Saldo insuficiente"
}
```

**Esperado (conforme Swagger):**

```json
{
  "error": "Valor inválido"
}
```

**Impacto:**
Pode causar confusão em usuários e desenvolvedores que esperam mensagens conforme o contrato da API.

---

### 🔧 Bug 4 - Resgate da caixinha sempre falha mesmo após depósito

**Descrição:**
Mesmo após realizar depósitos com sucesso na caixinha (`POST /caixinha/deposit`), ao tentar efetuar o resgate (`POST /caixinha/withdraw`), a API retorna:

```json
{
  "error": "Saldo na caixinha insuficiente"
}
```

**Observação:**
Consultando o extrato via `GET /caixinha/extrato`, os depósitos são registrados corretamente. No entanto, ao consultar o saldo via `GET /points/saldo`, o campo `piggy_bank_balance` permanece zerado.

**Endpoints impactados:**

* `POST /caixinha/deposit`
* `POST /caixinha/withdraw`

> ℹ️ *Esse teste está comentado para evitar falhas na execução automatizada, mas está documentado como bug.*

---

### 🐞 Tabela de Criticidade dos Bugs

| Bug | Título                                                        | Nível    | Justificativa                                                                                       |
| --- | ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| 1   | Mensagem divergente no Token inválido                         | Baixo    | A resposta vem com o status certo, mas a mensagem foge do combinado. Nada quebra, mas confunde quem integra. |
| 2   | Transferência não reflete no saldo do destinatário            | **Alto** | O dinheiro (ou ponto) “some no caminho”. Isso quebra a lógica central do sistema.                            |
| 3   | Mensagem errada ao transferir com saldo insuficiente          | Médio    | A lógica bloqueia, mas a mensagem não ajuda. Pode gerar dúvida em quem está testando.                        |
| 4   | Depósito na caixinha não atualiza o saldo, impedindo resgates | **Alto** | O sistema diz que recebeu o valor, mas não deixa usar. Parece que a caixinha some com os valores.             |

---

### 🚦 Está pronto para produção?

**Ainda não é recomendado subir para produção.**
Apesar de boa parte dos fluxos principais estarem funcionando, há falhas críticas, como inconsistência no saldo de transferências e caixinha, que impactam diretamente a experiência do usuário e a integridade dos dados. Melhor resolver essas pendências antes de liberar.

---
