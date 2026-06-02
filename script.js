const casas = document.querySelectorAll(".casa");
const statusTexto = document.getElementById("status");

let jogadorAtual = "H";

let tabuleiro = [
    "", "", "",
    "", "", "",
    "", "", ""
];

let jogoAtivo = true;

const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

function jogar(){

    const index = this.dataset.index;

    if(tabuleiro[index] !== "" || !jogoAtivo){
        return;
    }

    tabuleiro[index] = jogadorAtual;

    const img = document.createElement("img");

    if(jogadorAtual === "H"){

        img.src = "hacker.png";
        this.classList.add("hacker");

    }else{

        img.src = "seguranca.png";
        this.classList.add("seguranca");

    }

    this.appendChild(img);

    if(verificarVitoria()){
        return;
    }

    if(!tabuleiro.includes("")){
        statusTexto.textContent = "Empate!";
        jogoAtivo = false;
        return;
    }

    jogadorAtual = jogadorAtual === "H" ? "S" : "H";

    statusTexto.textContent =
        jogadorAtual === "H"
        ? "Vez do Hacker"
        : "Vez da Segurança";
}

function verificarVitoria(){

    for(let c of combinacoes){

        let a = c[0];
        let b = c[1];
        let d = c[2];

        if(
            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[d]
        ){

            jogoAtivo = false;

    if(tabuleiro[a] === "H"){

    statusTexto.textContent =
    "O Hacker invadiu tudo!";
}
   else{

    statusTexto.textContent =
    "A Segurança protegeu tudo!";
}

            return true;
        }
    }

    return false;
}

function reiniciar(){

    tabuleiro = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    jogadorAtual = "H";
    jogoAtivo = true;

    statusTexto.textContent = "Vez do Hacker";

    casas.forEach(casa => {
        casa.innerHTML = "";
        casa.classList.remove("hacker");
        casa.classList.remove("seguranca");
    });
}