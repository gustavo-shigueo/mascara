// Armazena todos os elementos do DOM que tiverem o atributo data-mask definido
const fields = document.querySelectorAll('[data-mask]')

// Adiciona Event Listeners a todos os items do array fields
for (let field of fields) field.addEventListener('input', maskInput)

function maskInput(event) {
	if (event.target.tagName !== 'INPUT') return            // Rejeita o elemento caso não seja um input
	const dataType = event.target.getAttribute('data-mask') // Obtém o valor de data-mask
	const id       = event.target.getAttribute('id')        // Obtém o ID do elemento

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
		case 'uf': maskUF(id)
			break
		default: maskGeneral(id)
	}
}

function maskFone(id) {
	const element = document.getElementById(id) // Seleciona o input correto com base no ID
	element.setAttribute('maxLength', '15')     // Limita o número de caracteres do input
	element.value = element.value               // Aplica a máscara fazendo uso de expressões regulares
						.replace(/\D/g, '')
						.replace(/^(\d{2})(\d)/g, "($1) $2")
						.replace(/(\d)(\d{4})$/, "$1-$2")
}

function maskCPF(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '14')
	element.value = element.value
						.replace(/\D/g, '')
						.replace(/(\d{3})(?=\d)(?<!.{9,})/g, "$1.")
						.replace(/^(.{11})(\d+)$/, "$1-$2")
}

function maskRG(id) {
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '12')
	element.value = element.value
						.replace(/\D/g, '')
						.replace(/(^\d{2}|\d{3})(?=\d)(?<!\d{8,})/g, "$1.")
						.replace(/^(.{10})(\d)$/, "$1-$2")
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
						.replace(/(\d{2})(?=\d)(?<!.{6,})/g, "$1/")
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

function maskUF(id) {
	// Combinações possíveis de sigla (a chave representa o primeiro caracter e o valor representa as possibilidades do segundo)
	// Exemplo {S: 'CEP'} significa que as combinações 'SC', 'SE' e 'SP' são siglas válidas
	const regexes = { A: 'CLMP', B: 'A', C: 'E', D: 'F', E: 'S', G: 'O', M: 'AGST', P: 'ABEIR', R: 'JNORS', S: 'CEP', T: 'O' }
	let primeiro = ''
	for (let key in regexes) primeiro += key
	const element = document.getElementById(id)
	element.setAttribute('maxLength', '2')
	element.value = element.value
						.replace(/[^A-Za-z]/g, '')                                                // Permite apenas letras
						.toUpperCase()                                                            // Converte em letras maiúsculas
						.replace(new RegExp(`^[^${primeiro}]$`, 'g'), '')                         // Filtra o 1º caracter
						.replace(new RegExp(`^([A-Z])([^${regexes[element.value[0]]}])$`), '$1')  // Filtra o 2º caracter
}

function maskGeneral(id) {
	const element = document.getElementById(id)
	const mask = element.getAttribute('data-mask').trim()

	element.setAttribute('maxLength', `${mask.length}`)

	let maskSymbols = []
	let l = 0
	for (const char of mask) {
		if (char !== '0') {
			maskSymbols.push(l)
			maskSymbols.push(char)
			l = 0
		} 
		else l++
	}

	apply()

	function apply() {
		element.value = element.value.replace(/\D/g, '')
		let replaces = []

		for (let i = typeof(maskSymbols[0]) === 'string' ? 0 : 1; i < maskSymbols.length; i += 2) {
			let regex = replaces.length !== 0 ? `${replaces[replaces.length - 1][0].replace('})', '}')}\\${maskSymbols[i - 2]}` : ``
			if (i === 0) replaces.push(['^(\\d)', `${maskSymbols[i]}$1`])
			else if (i % 2 === 0)	regex = i === 2 ? `^(\\${maskSymbols[0]}\\d{${maskSymbols[1]}})` : `${regex}\\d{${maskSymbols[i - 1]}})`
			else regex += `${i === 1 ? '(' : ''}\\d{${maskSymbols[i - 1]}})`

			if (i !== 0) replaces.push([regex, `$1${maskSymbols[i]}`])

		}
		for (const replace of replaces) element.value = element.value.replace(new RegExp(`${replace[0]}(\\d)`), `${replace[1]}$2`)
	}
}