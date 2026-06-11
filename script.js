let conta = 0
let pessoas = 0
let porcentagem = 0

const contaInput = document.querySelector("#conta")
contaInput.addEventListener("input", receberValorConta)

function receberValorConta(evento) {
    conta = Number(evento.target.value)
    calcular()
}

const pessoasInput = document.querySelector("#pessoas")
pessoasInput.addEventListener("input", receberQuantidadePessoas)

function receberQuantidadePessoas(evento) {
    const paragrafoErro = document.querySelector(".pessoas #erro")
    const divErro = document.querySelector(".pessoas .input-box")

    if(evento.target.value === "0" || evento.target.value === "") {
        if(paragrafoErro) paragrafoErro.style.display = "block"
        if(divErro) divErro.setAttribute("id", "erro-div")
        pessoas = 0
    } else {
        if(paragrafoErro) paragrafoErro.style.display = "none"
        if(divErro) divErro.setAttribute("id", "")
        pessoas = Number(evento.target.value)
    }

    calcular()
}

const botoesGorjeta = document.querySelectorAll(".gorjeta input[type='button']")
botoesGorjeta.forEach(botao => {
    botao.addEventListener("click", receberPorcentagem)
})

function receberPorcentagem(evento){
    botoesGorjeta.forEach(botao => {
        botao.classList.remove("botao-ativo")

        if(botao.value === evento.target.value){
            botao.classList.add("botao-ativo")
        }
    })

    if(evento.target.value !== ""){
        porcentagem = parseFloat(evento.target.value) / 100
    } else {
        porcentagem = 0
    }

    calcular()
}

const gorjetaInput = document.querySelector("#outra") 
if (gorjetaInput) {
    gorjetaInput.addEventListener("input", receberPorcentagem)
}

function calcular(){
    if(conta > 0 && pessoas > 0){
        const gorjetaPorPessoa = (conta * porcentagem) / pessoas
        const totalPorPessoa = (conta / pessoas) + gorjetaPorPessoa

        const strongGorjetaTotal = document.querySelector(".gorjeta-total > strong")
        if(strongGorjetaTotal) strongGorjetaTotal.innerHTML = `R$ ${gorjetaPorPessoa.toFixed(2)}`

        const strongTotal = document.querySelector(".total > strong")
        if(strongTotal) strongTotal.innerHTML = `R$ ${totalPorPessoa.toFixed(2)}`
    }
}

const botaoLimpar = document.querySelector(".resultado button")
if (botaoLimpar) {
    botaoLimpar.addEventListener("click", limpar)
}

function limpar(){
    if(contaInput) contaInput.value = ""

    botoesGorjeta.forEach(botao => {
        botao.classList.remove("botao-ativo")
    })

    if(gorjetaInput) gorjetaInput.value = ""
    if(pessoasInput) pessoasInput.value = ""

    const strongGorjeta = document.querySelector(".gorjeta-total > strong")
    const strongTotal = document.querySelector(".total > strong")
    
    if(strongGorjeta) strongGorjeta.innerHTML = "R$ 0.00"
    if(strongTotal) strongTotal.innerHTML = "R$ 0.00"

    conta = 0
    porcentagem = 0
    pessoas = 0
}