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
