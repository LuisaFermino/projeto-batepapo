function logar() {
  let nomeUsuario = document.querySelector(".entrada").value;

  if (nomeUsuario === "lulu") {
    location.href = "home.html";
  } else {
    alert("Usuário ou senha incorretos");
  }
}

function acionarMenu() {
  const acionarmenu = document.querySelector(".container-menu");
  if (acionarmenu !== null) {
    acionarmenu.classList.remove("escondido");
  }
}

function fecharMenu() {
  const fecharMenu = document.querySelector(".container-menu");

  fecharMenu.classList.add("escondido");
}
