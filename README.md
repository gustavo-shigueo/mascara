# Mascáras para inputs de formulários HTML
Esse script permite a utilização de máscaras em inputs HTML **sem a necessidade de usar jQuery.**
Se tiver sugestões de mais tipos de máscaras, crie um _issue_ neste repositório.
Este repositório contém um arquivo HTML e um arquivo CSS para a página de demonstração, que pode ser acessada [aqui](https://gustavo-shigueo.github.io/mascara/). Esses arquivos não são necessários, apenas o arquivo masks.js é.

## Como usar?
Para adicionar as máscaras, basta criar um arquivo HTML, adicionar a tag `<script src="masks.js" defer></script>` , direcionando o atributo src ao arquivo masks.js.
 Depois, nas tags `<input type="text">`, **é necessário adicionar um id** qualquer (desde que não haja mais elementos com o mesmo id no arquivo HTML) **e um atributo data-mask.**
 O valor de data-mask irá determinar o tipo de máscara aplicada.

## Máscaras padrão disponíveis:
* fone: (00) 00000-0000 ou (00) 0000-0000
* cpf: 000.000.000-00
* rg: 00.000.000-0
* cep: 00000-000
* data: 00/00/0000
* moeda: de R$ 0,00 até R$ 0.000.000.000.000,00
* uf: AA (permite apenas a digitação de siglas de estados brasileiros, ex: SP, RJ, DF)

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
        <input type="text" id="exemplo1" data-mask="fone">
        <input type="text" id="exemplo2" data-mask="cpf">
        <input type="text" id="exemplo3" data-mask="rg">
        <input type="text" id="exemplo4" data-mask="cep">
        <input type="text" id="exemplo5" data-mask="data">
        <input type="text" id="exemplo6" data-mask="moeda">
        <input type="text" id="exemplo7" data-mask="uf">
        <input type="text" id="exemplo8" data-mask="000 00-0.0@000!000">
    </body>
</html>
```
