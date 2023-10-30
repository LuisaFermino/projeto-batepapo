const acionarmenu = document.querySelector(".container-menu");
let nomeUsuario = "";
const usuarios = [
  {
    from: "João",
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: "08:01:17",
  },
  {
    from: "Lulu",
    to: "Todos",
    text: "Bom dia",
    type: "message",
    time: "08:02:50",
  },
  {
    from: "Paulão",
    to: "lulu",
    text: "Seis tão bão??",
    type: "private",
    time: "08:02:50",
  },
];

function logar() {
  const acionarHome = document.querySelector(".home");
  const escondeTelaInicial = document.querySelector(".tela-inicial");
  nomeUsuario = document.querySelector(".entrada").value;
  if (nomeUsuario === "lulu") {
    acionarHome.classList.remove("escondido");
    escondeTelaInicial.classList.add("escondido");
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
  const objetoMensagem = {
    from: "Lulu",
    to: "Todos",
    text: mensagemDigitada,
    type: "message",
    time: "08:02:50",
  };
  usuarios.push(objetoMensagem);
  mensagensNaTela();
}

function mensagensNaTela() {
  const containerMensagens = document.querySelector(".container-mensagens");

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].type === "message") {
      containerMensagens.innerHTML += `<div class="mensagem-normais">
      <p class="textos">
        <span class="horario">${usuarios[i].time}</span>
        <span class="nome">${usuarios[i].from} </span> para <span class="para-quem">${usuarios[i].to}:</span>
        ${usuarios[i].text}
      </p>
    </div>`;
    } else if (usuarios[i].type === "status") {
      containerMensagens.innerHTML += `<div class="mensagem-status">
      <p class="textos">
       <span class="horario">${usuarios[i].time}</span>
        <span class="nome">${usuarios[i].from}</span>
        ${usuarios[i].text}
      </p>
    </div>`;
    } else if (
      usuarios[i].type === "private" &&
      usuarios[i].to === nomeUsuario
    ) {
      containerMensagens.innerHTML += `<div class="mensagem-reservada">
      <p class="textos">
        <span class="horario">${usuarios[i].time}</span>
        <span class="nome">${usuarios[i].from}</span> reservadamente para <span class="para-quem">${usuarios[i].to}:</span>
        ${usuarios[i].text}
      </p> 
    </div>`;
    }
  }
}
mensagensNaTela();

//identificar o tipo da mensagem atraves do type que esta no objeto
//Fazer um for para conseguir lançar as mensagens e utilizar o objeto para preenche-las
//Permitir ao usuario que coloque qual tipo de mensagem e para quem (marcar com check)
