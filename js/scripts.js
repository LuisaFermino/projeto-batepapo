const acionarmenu = document.querySelector(".container-menu");
let mensagemNormais;
let mensagemStatus;
let mensagemPrivada;
let mensagemEscolhida;
const usuarios = [
  {
    pessoa: "João",
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: "08:01:17",
  },
  {
    from: "João",
    to: "Todos",
    text: "Bom dia",
    type: "message",
    time: "08:02:50",
  },
  {
    from: "João",
    to: "Todos",
    text: "Bom dia",
    type: "message",
    time: "08:02:50",
  },
];

function logar() {
  let nomeUsuario = document.querySelector(".entrada").value;
  if (nomeUsuario === "lulu") {
    location.href = "home.html";
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function acionarMenu() {
  if (acionarmenu !== null) {
    acionarmenu.classList.remove("escondido");
  }
}

function fecharMenu() {
  acionarmenu.classList.add("escondido");
}

function enviarMensagem() {
  const mensagemDigitada = document.querySelector(".mensagem").value;
  const containerMensagens = document.querySelector(".container-mensagens");
  if (mensagemEscolhida === mensagemNormais) {
    containerMensagens.innerHTML += `<div class="mensagem-normais">
    <p class="textos">
      <span class="horario">(10:43)</span>
      <span class="nome">João</span>
      entra na sala...
    </p>
  </div>`;
  } else if (mensagemEscolhida === mensagemStatus) {
    containerMensagens.innerHTML += `<div class="mensagem-status">
    <p class="textos">
      <span class="horario">(10:43)</span>
      <span class="nome">João</span>
      entra na sala...
    </p>
  </div>`;
  } else if (mensagemEscolhida === mensagemPrivada) {
    containerMensagens.innerHTML += `<div class="mensagem-reservada">
    <p class="textos">
      <span class="horario">(10:43)</span>
      <span class="nome">João</span>
      entra na sala...
    </p> 
  </div>`;
  }
}

//identificar o tipo da mensagem atrasves do type que esta no objeto
//Fazer um for para conseguir lançar as mensagens e utilizar o objeto para preenche-las
//Permitir ao usuario que coloque qual tipo de mensagem e para quem (marcar com check)
