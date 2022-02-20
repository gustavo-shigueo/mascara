# Mascáras para inputs de formulários HTML

Esse script permite a utilização de máscaras em inputs HTML **sem a necessidade de usar jQuery.**
Se tiver sugestões de mais tipos de máscaras, crie um _issue_ neste repositório.
Este repositório contém um arquivo HTML e um arquivo CSS para a página de demonstração, que pode ser acessada [aqui](https://gustavo-shigueo.github.io/mascara/). Esses arquivos não são necessários, apenas o arquivo masks.js é.

## Como usar?

Para adicionar as máscaras, basta criar um arquivo HTML, adicionar a tag `<script src="masks.js" defer></script>` , direcionando o atributo src ao arquivo masks.js.
Depois, nas tags `<input type="text">`,
O valor de data-mask irá determinar o tipo de máscara aplicada.

## Máscaras padrão disponíveis:

- fone: (00) 00000-0000 ou (00) 0000-0000
- cpf: 000.000.000-00
- cnpj: 00.000.000/0000-00
- rg: 00.000.000-0
- cep: 00000-000
- data: 00/00/0000
- moeda: de R$ 0,00 até R$ 0.000.000.000.000,00
- uf: AA (permite apenas a digitação de siglas de estados brasileiros, ex: SP, RJ, DF)

## Validação de datas

Campos com `data-mask="data"` agora serão automáticamente validados para o formato `dd/mm/aaaa`

## Validadores de CPF e CNPJ

Agora campos com `data-mask="cpf"` e `data-mask="cnpj"` serão validados automaticamente e impedirão o formulário de ser enviado caso as validações falhem

### Sobre validação de RG

RGs ainda não são consistentes em nível nacional, e mesmo que venham a ser, eles não têm data de expiração, portanto pessoas com RGs antigos podem ter documentos que não sigam a norma, portanto validar RGs costuma ser uma má ideia

## Máscaras personalizadas:

Agora é possível criar suas próprias máscaras! Basta digitar o padrão desejado dentro do atributo **data-mask**.
A criação de padrões usa zeros como caracteres numéricos e símbolos digitados pelo usuário como máscara.

## Uso no HTML:

```html
<!DOCTYPE html>
<html lang="pt-BR">
	<head>
		<script src="masks.js" defer></script>
	</head>
	<body>
		<input type="text" data-mask="fone" />
		<input type="text" data-mask="cpf" />
		<input type="text" data-mask="cnpj" />
		<input type="text" data-mask="rg" />
		<input type="text" data-mask="cep" />
		<input type="text" data-mask="data" />
		<input type="text" data-mask="moeda" />
		<input type="text" data-mask="uf" />
		<input type="text" data-mask="000 00-0.0@000!000" />
	</body>
</html>
```
