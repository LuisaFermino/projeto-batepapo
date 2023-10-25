function logar() {
  let nomeUsuario = document.querySelector(".entrada").value;

  if (nomeUsuario === "lulu") {
    location.href = "home.html";
  } else {
    alert("Usuário ou senha incorretos");
  }
}
