// Armazena todos os elementos do DOM que tiverem o atributo data-mask definido
const fields = [...document.querySelectorAll('[data-mask]')]

// Adiciona Event Listeners a todos os items do array fields
fields.forEach(field => field.addEventListener('input', maskInput))

function maskInput(event) {
	/** @type {HTMLInputElement} */
	const target = event.target

	if (target.tagName !== 'INPUT') return // Rejeita o elemento caso não seja um input
	const dataType = target.getAttribute('data-mask').toLowerCase() // Obtém o valor de data-mask

	target.setCustomValidity('')

	// Aciona a função adequada de acordo com o dataType, passando o ID como parâmetro
	switch (dataType) {
		case 'fone':
			maskFone(target)
			break
		case 'cpf':
			maskCPF(target)
			break
		case 'cnpj':
			maskCNPJ(target)
			break
		case 'rg':
			maskRG(target)
			break
		case 'cep':
			maskCEP(target)
			break
		case 'data':
			maskData(target)
			break
		case 'moeda':
			maskMoeda(target)
			break
		case 'uf':
			maskUF(target)
			break
		default:
			maskGeneral(target)
			break
	}

	target.reportValidity()
}

function maskFone(element) {
	element.setAttribute('maxLength', '15') // Limita o número de caracteres do input
	element.value = element.value // Aplica a máscara fazendo uso de expressões regulares
		.replace(/\D/g, '')
		.replace(/^(\d{1,2})$/g, '($1')
		.replace(/^(\d{2})(\d)/g, '($1) $2')
		.replace(/(\d)(\d{4})$/, '$1-$2')
}

/** @param {string} cpf */
const validarCPF = cpf => {
	const cpfDigitado = cpf.replace(/\D/g, '')
	const cpfNums = cpfDigitado.split('').map(char => parseInt(char))

	if (cpfNums.every(i => i === cpfNums[0])) return false

	const soma1 = cpfNums.reduce(
		(acc, cur, i) => (i === 9 ? acc : acc + cur * (10 - i)),
		0
	)

	let primeiroDigito = (soma1 * 10) % 11
	if (primeiroDigito > 9) primeiroDigito = 0

	if (cpfNums[9] !== primeiroDigito) return false

	const soma2 = cpfNums.reduce((acc, cur, i) => {
		if (i === 10) return acc
		return acc + cur * (11 - i)
	}, 0)

	let segundoDigito = (soma2 * 10) % 11
	if (segundoDigito > 9) segundoDigito = 0

	return cpfNums[10] === segundoDigito
}

/** @param {HTMLInputElement} element */
function maskCPF(element) {
	element.setAttribute('maxLength', '14')
	element.value = element.value
		.replace(/\D/g, '')
		.replace(/(\d{3})(?=\d)(?<!.{9,})/g, '$1.')
		.replace(/^(.{11})(\d+)$/, '$1-$2')

	if (element.value.length < 14) return

	element.setCustomValidity(validarCPF(element.value) ? '' : 'CPF inválido')
}

/** @param {string} cnpj */
const validarCNPJ = cnpj => {
	const cnpjDigitado = cnpj.replace(/\D/g, '')
	const cnpjNums = cnpjDigitado.split('').map(i => parseInt(i))

	if (cnpjNums.every(i => i === cnpjNums[0])) return false

	const soma1 = cnpjNums.reduce((acc, cur, i) => {
		const c = i < 4 ? 5 : 13

		return i > 11 ? acc : acc + cur * (c - i)
	}, 0)

	const modulo1 = soma1 % 11
	const primeiroDigito = modulo1 < 2 ? 0 : 11 - modulo1

	if (primeiroDigito !== cnpjNums[12]) return false

	const soma2 = cnpjNums.reduce((acc, cur, i) => {
		const c = i < 5 ? 6 : 14

		return i > 12 ? acc : acc + cur * (c - i)
	}, 0)

	const modulo2 = soma2 % 11
	const segundoDigito = modulo2 < 2 ? 0 : 11 - modulo2

	return cnpjNums[13] === segundoDigito
}

/** @param {HTMLInputElement} element */
function maskCNPJ(element) {
	element.setAttribute('maxLength', '18')
	element.value = element.value
		.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/, '$1.$2')
		.replace(/^(\d{2}\.\d{3})(\d)/, '$1.$2')
		.replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, '$1/$2')
		.replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, '$1-$2')

	if (element.value.length < 18) return
	element.setCustomValidity(validarCNPJ(element.value) ? '' : 'CNPJ inválido')
}

function maskRG(element) {
	element.setAttribute('maxLength', '12')
	element.value = element.value
		.replace(/\D/g, '')
		.replace(/(^\d{2}|\d{3})(?=\d)(?<!\d{8,})/g, '$1.')
		.replace(/^(.{10})(\d)$/, '$1-$2')
}

function maskCEP(element) {
	element.setAttribute('maxLength', '9')
	element.value = element.value
		.replace(/\D/g, '')
		.replace(/^(\d{5})(\d)/g, '$1-$2')
}

function maskData(element) {
	element.setAttribute('maxLength', '10')
	element.value = element.value
		.replace(/\D/g, '')
		.replace(/^[4-9]$/, '')
		.replace(/^(0)0$/, '$1')
		.replace(/^(3)([2-9])/, '$1')
		.replace(/^(\d{2})[2-9]/, '$1')
		.replace(/^(\d{2}0)0/, '$1')
		.replace(/^(\d{2}1)[3-9]/, '$1')
		.replace(/^(\d{4})0/, '$1')
		.replace(/(\d{2})(?=\d)(?<!.{6,})/g, '$1/')

	if (element.value.length < 10) return

	const [day, month, year] = element.value.split('/').map(i => parseInt(i))
	const date = new Date(year, month - 1, day)

	element.value = date.toLocaleDateString()
}

function maskMoeda(element) {
	element.setAttribute('maxLength', '23')
	element.value =
		'R$ ' +
		(Number(element.value.replace(/\D/g, '')) / 100)
			.toFixed(2)
			.toString()
			.replace('.', ',')
			.replace(/(\d)(?=(\d{3})+\,)/g, '$1.')
	if (element.value === 'R$ 0,00') element.value = ''
}

function maskUF(element) {
	// Combinações possíveis de sigla (a chave representa o primeiro caracter e o valor representa as possibilidades do segundo)
	// Exemplo {S: 'CEP'} significa que as combinações 'SC', 'SE' e 'SP' são siglas válidas
	const regexes = {
		A: 'CLMP',
		B: 'A',
		C: 'E',
		D: 'F',
		E: 'S',
		G: 'O',
		M: 'AGST',
		P: 'ABEIR',
		R: 'JNORS',
		S: 'CEP',
		T: 'O',
	}

	let primeiro = ''
	for (let key in regexes) primeiro += key
	element.setAttribute('maxLength', '2')
	element.value = element.value
		.replace(/[^A-Za-z]/g, '') // Permite apenas letras
		.toUpperCase() // Converte em letras maiúsculas
		.replace(new RegExp(`^[^${primeiro}]$`, 'g'), '') // Filtra o 1º caracter
		.replace(new RegExp(`^([A-Z])([^${regexes[element.value[0]]}])$`), '$1') // Filtra o 2º caracter
}

function maskGeneral(element) {
	const mask = element.getAttribute('data-mask').trim()
	const maskSymbols = []

	element.setAttribute('maxLength', `${mask.length}`)

	let l = 0
	for (const char of mask) {
		if (char === '0') {
			l++
			continue
		}

		maskSymbols.push(l, char)
		l = 0
	}

	apply()

	function apply() {
		element.value = element.value.replace(/\D/g, '')
		const replaces = []

		const start = typeof maskSymbols[0] === 'string' ? 0 : 1
		for (let i = start; i < maskSymbols.length; i += 2) {
			const symbol = maskSymbols[i - 2]
			const replacement = replaces[replaces.length - 1]?.[0]?.replace('})', '}')
			let regex = replaces.length !== 0 ? `${replacement}\\${symbol}` : ''

			switch (i) {
				case 0:
					replaces.push(['^(\\d)', `${maskSymbols[i]}$1`])
					break
				case 2:
					regex = `^(\\${maskSymbols[0]}\\d{${maskSymbols[1]}})`
					break
				default:
					regex +=
						i % 2 === 0
							? `\\d{${maskSymbols[i - 1]}})`
							: `${i === 1 ? '(' : ''}\\d{${maskSymbols[i - 1]}})`
			}

			if (i !== 0) replaces.push([regex, `$1${maskSymbols[i]}`])
		}

		for (const [reg, group] of replaces) {
			element.value = element.value.replace(
				new RegExp(`${reg}(\\d)`),
				`${group}$2`
			)
		}
	}
}
