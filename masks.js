// Armazena todos os elementos do DOM que tiverem o atributo data-mask definido
const fields = [...document.querySelectorAll('[data-mask]')]

// Adiciona Event Listeners a todos os items do array fields
for (let field of fields) {
	field.addEventListener('onKeyPress', maskInput)
	field.addEventListener('input'     , maskInput)
}

function maskInput(target) {
	if (target.type !== 'input') return // Rejeita o elemento caso não seja um input
	const dataType = target.srcElement.getAttribute('data-mask') // Obtém o valor de data-mask
	const id       = target.srcElement.getAttribute('id')        // Obtém o ID do elemento
	
	// Aciona a função adequada de acordo com o dataType, passando o ID como parâmetro
	switch(dataType){
		case 'fone': maskFone(id)
			break
		case 'cpf': maskCPF(id)
			break
		case 'rg': maskRG(id)
			break
		case 'cep': maskCEP(id)
			break
		case 'data': maskData(id)
			break
		case 'moeda': maskMoeda(id)
			break
		default: return
	}

}

function maskFone(id) {
	const element = document.getElementById(id) // Seleciona o input correto com base no ID
	element.setAttribute('maxLength', '15')     // Limita o número de caracteres do input
	element.value = element.value		    // Aplica a máscara fazendo uso de expressões regulares
			    .replace(/\D/g, '')
			    .replace(/^(\d{2})(\d)/g, "($1) $2")
			    .replace(/(\d)(\d{4})$/, "$1-$2")
}

function maskCPF(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '14')
	element.value = element.value
			    .replace(/\D/g, '')
			    .replace(/^(\d{3})(\d)/g, "$1.$2")
			    .replace(/(\d{3}\.\d{3})(\d)/g, "$1.$2")
			    .replace(/(\d{3}\.\d{3}\.\d{3})(\d|\d{2})$/, "$1-$2")
}

function maskRG(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '12')
	element.value = element.value
			    .replace(/\D/g, '')
			    .replace(/^(\d{2})(\d)/g, "$1.$2")
			    .replace(/(\d{2}\.\d{3})(\d)/g, "$1.$2")
			    .replace(/(\d{2}\.\d{3}\.\d{3})(\d)$/, "$1-$2")
}
function maskCEP(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '9')
	element.value = element.value
			    .replace(/\D/g, '')
			    .replace(/^(\d{5})(\d)/g, "$1-$2")
}

function maskData(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '10')
	element.value = element.value
			    .replace(/\D/g, '')
			    .replace(/^(\d{2})(\d)/g, "$1/$2")
			    .replace(/^(\d{2}\/\d{2})(\d)/g, "$1/$2")
}

function maskMoeda(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '23')
	element.value = 'R$ ' + 
			    (Number(element.value.replace(/\D/g, '')) / 100)
			    .toFixed(2)
			    .toString()
			    .replace('.', ',')
			    .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
	if (element.value === 'R$ 0,00') element.value = ''
}
