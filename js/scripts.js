const acionarmenu = document.querySelector(".container-menu");
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
  containerMensagens.innerHTML += `<div class="mensagem-status">
  <p class="textos">
    <span class="horario">(10:43)</span>
    <span class="nome">${usuarios.pessoa}</span>
    ${mensagemDigitada}
  </p>
</div>`;
}
