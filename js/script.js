const slider = document.getElementById('sliderInput')
const valText = document.getElementById('qtdPassword')
const passDisplay = document.querySelector("#passContent")
const strengthPass = document.querySelector(".strengthLabel")
const strengthBar = document.querySelector(".strengthBarContainer")


function updateSlider() {
    const min = Number(slider.min) || 0
    const max = Number(slider.max) || 100
    const value = Number(slider.value)

    const rawPercentage = ((value - min) / (max - min)) * 100

    const thumbRadius = 10

    const fillPosition = `calc(${rawPercentage}% + ${thumbRadius - (rawPercentage * (thumbRadius * 2 / 100))}px)`

    slider.style.background = `linear-gradient(to right, #6abaf0 0%, #6abaf0 ${fillPosition}, #112635 ${fillPosition}, #112635 100%)`

    if (valText) valText.textContent = value
}


addEventListener('DOMContentLoaded', () => {
    generatePassword(slider.value)
    updateSlider()
})

const checkMaiuscula = document.querySelector("#ckbMaiuscula")
const checkMinuscula = document.querySelector("#ckbMinuscula")
const checkSimbolo = document.querySelector("#ckbSimbolos")
const checkNumero = document.querySelector("#ckbNumeros")
const checkboxMarked = document.querySelectorAll('.option-check')

checkboxMarked.forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const marcados = document.querySelectorAll('.option-check:checked')

    console.log(marcados)
    
    if (marcados.length === 0) {
      e.target.checked = true
      alert("Você precisa manter pelo menos uma opção selecionada!")
    } else {
      generatePassword(slider.value)
    }
  })
})


function validateCheckedBoxes() {
    const temMaiuscula = checkMaiuscula.checked
    const temMinuscula = checkMinuscula.checked
    const temSimbolo = checkSimbolo.checked
    const temNumero = checkNumero.checked

    const checkedCount = document.querySelectorAll('.option-check:checked').length

    if (!temMaiuscula && !temMinuscula && !temSimbolo && !temNumero) {
        alert("Selecione ao menos uma opção para gerar a senha!")
    }

    return { temMaiuscula, temMinuscula, temSimbolo, temNumero, qtdCheckMarked: checkedCount }
}


function getSelectedCharacters() {
    let pool = ''
    if (checkMaiuscula.checked) pool += maiusculas
    if (checkMinuscula.checked) pool += minusculas
    if (checkNumero.checked) pool += numeros
    if (checkSimbolo.checked) pool += simbolos
    return pool
}


const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const minusculas = 'abcdefghijklmnopqrstuvwxyz'
const numeros = '123456789'
const simbolos = "'!@#$%&*()-+=´`^~?:;><.,_/|"
let senhaGlobal = ''


function generatePassword(qtdCharacter) {
    let senhaGerada = ''
    const pool = getSelectedCharacters()

    for (let i = 0; i < qtdCharacter; i++) {
        const indiceRandom = Math.floor(Math.random() * pool.length)
        const caracSorteado = pool.charAt(indiceRandom)

        senhaGerada += caracSorteado
    }
    senhaGlobal = senhaGerada
    passDisplay.textContent = senhaGerada
    validatePassStrength(senhaGerada)
}


slider.addEventListener('input', () => {
    const valueSlider = slider.value
    updateSlider()
    generatePassword(valueSlider)
})


function validatePassStrength(senha) {
    const checkedBoxes = validateCheckedBoxes()
    const qtd = checkedBoxes.qtdCheckMarked
    const len = senha.length

    if (len < 8 || qtd <= 1) {
        strengthPass.textContent = 'FRACA'
        strengthPass.style.color = '#e03838'
        strengthBar.style.backgroundColor = '#e03838'
    } else if (len >= 8 && len <= 11) {
        strengthPass.textContent = 'MÉDIA'
        strengthPass.style.color = '#e9c838'
        strengthBar.style.backgroundColor = '#e9c838'
    } else {
        strengthPass.textContent = 'FORTE'
        strengthPass.style.color = '#65ca22'
        strengthBar.style.backgroundColor = '#65ca22'
    }
}


const copyIcon = document.querySelector("#copyIconChange")

function chanceCopyIcon() {
    copyIcon.classList.remove('fa-regular', 'fa-copy')
    copyIcon.classList.add('fa-solid', 'fa-circle-check')
    copyIcon.style.color = '#65ca22'

    setTimeout(() => {
        copyIcon.classList.remove('fa-solid', 'fa-circle-check')
        copyIcon.classList.add('fa-regular', 'fa-copy')
        copyIcon.style.color = '#000'
    }, 3000)
}


function copyPass(pass) {
    navigator.clipboard.writeText(pass)
        .then(() => {
            chanceCopyIcon()
        })
}