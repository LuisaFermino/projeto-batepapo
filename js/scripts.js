const acionarmenu = document.querySelector(".container-menu");
let nomeUsuario = "";
let destinatario = "Todos";
let visibilidadeInicial = "message";
const API = "http://localhost:5000";

function logar() {
  const acionarHome = document.querySelector(".home");
  const escondeTelaInicial = document.querySelector(".tela-inicial");
  nomeUsuario = document.querySelector(".entrada").value;

  axios
    .post(`${API}/participants`, {
      name: nomeUsuario,
    })
    .then((resp) => {
      acionarHome.classList.remove("escondido");
      escondeTelaInicial.classList.add("escondido");
      atualizaMensagens();
      setInterval(atualizaParticipantes, 1000);
      setInterval(atualizaMensagens, 3000);
      setInterval(manterConexaoUsuario, 5000);
    })
    .catch((error) => {
      alert("Usuário já existe");
    });
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
    type: visibilidadeInicial,
  };
  axios.post(`${API}/messages`, objetoMensagem).then(atualizaMensagens);
  mensagemDigitada.value = "";
}

//manter a requisição para mensagens atualizadas
function atualizaMensagens() {
  const mensagens = axios
    .get(`${API}/messages`)
    .then(mensagensNaTela)
    .catch(() => {
      console.log("Deu erro");
    });
}

function mensagensNaTela(resposta) {
  const containerMensagens = document.querySelector(".container-mensagens");
  containerMensagens.innerHTML = "";

  for (let i = 0; i < resposta.data.length; i++) {
    if (resposta.data[i].type === "message") {
      containerMensagens.innerHTML += `<div class="mensagem-normais mensagens">
      <p class="textos">
        <span class="horario">(${resposta.data[i].time})</span>
        <span class="nome"> ${resposta.data[i].from} </span> para <span class="para-quem">${resposta.data[i].to}:</span>
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
      (resposta.data[i].type === "private_message" &&
        resposta.data[i].to === nomeUsuario) ||
      resposta.data[i].from === nomeUsuario
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
  const usuarioAtivo = axios.post(`${API}/status`, {
    name: nomeUsuario,
  });
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

function selecionarVisibilidade(visibilidade) {
  const selecionado = document.querySelector(".tipo.aparece");
  selecionado.classList.remove("aparece");
  selecionado.classList.add("escondido");

  //Estou acessando um elemento a partir de contatos (nem sempre precisa ser do document)
  const iconeCheck = visibilidade.querySelector(".tipo");
  iconeCheck.classList.remove("escondido");
  iconeCheck.classList.add("aparece");

  const tipo = visibilidade.querySelector(".nome-usuario").innerHTML;
  if (tipo === "Público") {
    visibilidadeInicial = "message";
  } else {
    visibilidadeInicial = "private_message";
  }
}

//Carrega usuários
function atualizaParticipantes() {
  axios
    .get(`${API}/participants`)
    .then(participantesAtivos)
    .catch(() => {
      console.log("Deu erro");
    });
}

function participantesAtivos(resp) {
  //aqui vou montar a estrutura do container onde ficam os participantes
  const menuLateral = document.querySelector(".usuarios-ativos");
  menuLateral.innerHTML = ` <div class="etapa" onclick="selecionarUsuario(this)">
      <ion-icon name="people" class="icone-menu"></ion-icon>
      <span class="nome-usuario"> Todos</span>
      <ion-icon name="checkmark" class="check aparece"></ion-icon>
    </div>`;

  for (let i = 0; i < resp.data.length; i++) {
    if (nomeUsuario !== resp.data[i].name) {
      menuLateral.innerHTML += `<div class="etapa" onclick="selecionarUsuario(this)">
      <ion-icon name="people" class="icone-menu"></ion-icon>
      <span class="nome-usuario"> ${resp.data[i].name} </span>
      <ion-icon name="checkmark" class="check escondido"></ion-icon>
    </div>`;
    }
  }
}
