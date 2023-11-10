const acionarmenu = document.querySelector(".container-menu");
const resposta = {
  data: [
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
    {
      from: "alo",
      to: "socorro",
      text: "stevan ferreira",
      type: "message",
      time: "20:07",
    },
  ],
};
let nomeUsuario = "";

let destinatario = "Todos";
const usuariosAtivos = [
  {
    name: "Paulão",
  },
  {
    name: "Maria",
  },
  {
    name: "Lulu",
  },
];

function logar() {
  const acionarHome = document.querySelector(".home");
  const escondeTelaInicial = document.querySelector(".tela-inicial");

  nomeUsuario = document.querySelector(".entrada").value;

  axios
    .post("http://localhost:5000/participants", {
      name: nomeUsuario,
    })
    .then((resp) => {
      acionarHome.classList.remove("escondido");
      escondeTelaInicial.classList.add("escondido");
      setInterval(manterConexaoUsuario, 5000);
    })
    .catch((error) => {
      alert("Usuário já existe");
    });

  usuariosNaTela();
  atualizaMensagens();
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
  const containerMensagens = document.querySelector(".container-mensagens");
  const mensagemDigitada = document.querySelector(".mensagem");

  const objetoMensagem = {
    from: nomeUsuario,
    to: destinatario,
    text: mensagemDigitada.value,
    type: "message",
  };

  axios.post("http://localhost:5000/messages", objetoMensagem);

  containerMensagens.innerHTML = "";
  mensagemDigitada.value = "";
  atualizaMensagens();
}

//manter a requisição para mensagens atualizadas
function atualizaMensagens() {
  // const mensagens = axios.get("http://localhost:5000/messages");
  // mensagens.then(mensagensNaTela);
  // mensagens.catch(() => {
  //   console.log("Deu erro");
  // });
  //esta comentado pq passei um objeto na MARRA

  mensagensNaTela(resposta);
}

// setInterval(atualizaMensagens, 5000);

function mensagensNaTela(resposta) {
  console.log(resposta);
  const containerMensagens = document.querySelector(".container-mensagens");

  for (let i = 0; i < resposta.data.length; i++) {
    if (resposta.data[i].type === "message") {
      containerMensagens.innerHTML += `<div class="mensagem-normais mensagens">
      <p class="textos">
        <span class="horario">(${resposta.data[i].time})</span>
        <span class="nome"> ${resposta.data[i].from} </spa n> para <span class="para-quem">${resposta.data[i].to}:</span>
        <span class="descricao">${resposta.data[i].text}</span>
      </p>
    </div>`;
    } else if (resposta.data[i].type === "status") {
      containerMensagens.innerHTML += `<div class="mensagem-status mensagens">
      <p class="textos">
       <span class="horario">(${resposta.data[i].time})</span>  
        <span class="nome">${resposta.data[i].from}</span>
        <span class="descricao">${resposta.data[i].text}</span>
      </p>
    </div>`;
    } else if (
      resposta.data[i].type === "private" &&
      resposta.data[i].to === nomeUsuario
    ) {
      containerMensagens.innerHTML += `<div class="mensagem-reservada mensagens">
      <p class="textos">
      <span class="horario">(${resposta.data[i].time})</span>
      <span class="nome">${resposta.data[i].from}</span> reservadamente para <span class="para-quem">${resposta.data[i].to}:</span>
      <span class="descricao">${resposta.data[i].text}</span>
      </p> 
    </div>`;
    }
  }
  const scrollMensagens = document.querySelectorAll(".mensagens");
  const ultimaMensagem = scrollMensagens[scrollMensagens.length - 1];
  ultimaMensagem.scrollIntoView();
}

//manter a conexão do usuário depois de logado
function manterConexaoUsuario() {
  const usuarioAtivo = axios.post("http://localhost:5000/status", {
    name: nomeUsuario,
  });
}

function usuariosNaTela() {
  const menuLateral = document.querySelector(".usuarios-ativos");

  for (let i = 0; i < usuariosAtivos.length; i++) {
    menuLateral.innerHTML += `<div class="etapa" onclick="selecionarUsuario(this)">
    <ion-icon name="people" class="icone-menu"></ion-icon>
    <span class="nome-usuario">${usuariosAtivos[i].name}</span>
    <ion-icon name="checkmark" class="check escondido"></ion-icon>
  </div>`;
  }
}

function selecionarUsuario(contato) {
  const selecionado = document.querySelector(".aparece");
  selecionado.classList.remove("aparece");
  selecionado.classList.add("escondido");

  //Estou acessando um elemento a partir de contatos (nem sempre precisa ser do document)
  const iconeCheck = contato.querySelector(".check");
  iconeCheck.classList.remove("escondido");
  iconeCheck.classList.add("aparece");

  destinatario = contato.querySelector(".nome-usuario").innerHTML;
}

//Permitir ao usuario que coloque qual tipo de mensagem e para quem (marcar com check)
