let criptografia = {
    "e" : "enter",
    "i" : "imes",
    "a" : "ai",
    "o" : "ober",
    "u" : "ufat"
};

let descriptografia = {
    "enter" : "e",
    "imes" : "i",
    "ai" : "a",
    "ober" : "o",
    "ufat" : "u"
};

function criptografar(texto) {
    return texto.split('').map(letra=> {return criptografia[letra] || letra;
    }).join('');
}

function descriptografar(texto) {
    return Object.keys(descriptografia).reduce((textoDescriptografado, chave) =>{
        let letra = descriptografia[chave];
        let regex = new RegExp(chave, 'g');
        return textoDescriptografado.replace(regex, letra);
    }, texto);
}

function validarEntrada(texto) {
    let caracteresProibidos = /[A-Z]|[^a-z\s]/;
    return caracteresProibidos.test(texto);
}

let textarea = document.querySelector(".area_texto")
let saidaTexto = document.querySelector(".mensagem");
let criptoBotao = document.querySelector(".botao_cripto");
let descriptoBotao = document.querySelector(".botao_descripto");
let copiarBotao = document.querySelector(".botao_copiar");
let mensagemValidacao = document.querySelector(".aviso h6");

function atualizarBackground() {
    if (saidaTexto.value.trim() === "") {
        saidaTexto.style.backgroundImage = "url('assets/High\ quality\ products\ 1\ 1.png')";
    } else {
        saidaTexto.style.backgroundImage = "none";
    }
}

criptoBotao.addEventListener("click", function() {
    let texto = textarea.value.trim();

    if (validarEntrada(texto)) {
        mensagemValidacao.textContent = "Letras maiúsculas e caracteres especiais não são permitidos.";
        mensagemValidacao.style.display = "block";
    } else {
        mensagemValidacao.style.display = "none";
        let textoCriptografado = criptografar(texto); 
        saidaTexto.value = textoCriptografado;
        atualizarBackground();
        }
    });

descriptoBotao.addEventListener("click", function() {
        let texto = saidaTexto.value.trim();
    
        if (validarEntrada(texto)) {
            mensagemValidacao.textContent = "Letras maiúsculas e caracteres especiais não são permitidos.";
            mensagemValidacao.style.display = "block";
        } else {
            mensagemValidacao.style.display = "none";
            let textoDescriptografado = descriptografar(texto);
            saidaTexto.value = textoDescriptografado;
            atualizarBackground();
        }
    });

copiarBotao.addEventListener("click", function () {
    saidaTexto.select();
    document.execCommand('copy');
    alert("Texto copiado para a àrea de transferência!");
})

textarea.addEventListener("input", function () {
    saidaTexto.value = "";
    atualizarBackground();
});

document.addEventListener("DOMContentLoaded", atualizarBackground);