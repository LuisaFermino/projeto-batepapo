const acionarmenu = document.querySelector(".container-menu");

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
    <span class="nome">Teste</span>
    ${mensagemDigitada}
  </p>
</div>`;
}
