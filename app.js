// Conectar ao servidor WebSocket (assumindo que o servidor está rodando na porta 8080)
const socket = new WebSocket('ws://localhost:8080');

// Referências aos elementos da interface do usuário
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('messages-container');

// Evento de conexão estabelecida
socket.addEventListener('open', () => {
  console.log('Conectado ao servidor WebSocket');
});

// Evento de recebimento de mensagens
socket.addEventListener('message', (event) => {
  const message = event.data;
  displayMessage(message);  // Exibe a mensagem recebida
});

// Função para exibir mensagens no chat
function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Rola para a última mensagem
}

// Função para enviar mensagem
sendBtn.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.send(message);  // Envia a mensagem para o servidor WebSocket
    displayMessage(`Você: ${message}`);  // Exibe a mensagem localmente
    messageInput.value = '';  // Limpa o campo de entrada
  }
});

// Enviar mensagem ao pressionar a tecla "Enter"
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendBtn.click();
  }
});

// Variáveis globais
let nome = "";
let usuarioId = ""; // ID único para cada usuário
const mensagensContainer = document.getElementById("mensagens");
const botaoIniciar = document.getElementById("iniciar");
const inputNome = document.getElementById("nome");
const botaoEnviar = document.getElementById("enviar");
const inputMensagem = document.getElementById("mensagem");
const chat = document.getElementById("chat");
const login = document.getElementById("login");

// Função para mostrar as mensagens
function mostrarMensagens() {
    // Limpa o conteúdo atual
    mensagensContainer.innerHTML = "";

    // Recupera as mensagens do localStorage
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    // Adiciona cada mensagem ao container
    mensagens.forEach(mensagem => {
        const div = document.createElement("div");
        div.classList.add("mensagem");

        // Verifica qual usuário está enviando a mensagem e aplica um estilo diferente
        if (mensagem.usuarioId === usuarioId) {
            div.classList.add("usuario1"); // Estilo para o usuário atual
        } else {
            div.classList.add("usuario2"); // Estilo para outros usuários
        }

        div.innerHTML = `<strong>${mensagem.nome}:</strong> ${mensagem.texto}`;
        mensagensContainer.appendChild(div);
    });

    // Rola para o final da caixa de mensagens
    mensagensContainer.scrollTop = mensagensContainer.scrollHeight;
}

// Função para enviar uma mensagem
function enviarMensagem() {
    const texto = inputMensagem.value.trim();
    if (texto === "") return;

    // Cria o objeto de mensagem com o nome e id do usuário
    const mensagem = {
        nome: nome,
        texto: texto,
        usuarioId: usuarioId, // ID único para cada usuário
    };

    // Recupera as mensagens existentes ou inicializa um array vazio
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];

    // Adiciona a nova mensagem
    mensagens.push(mensagem);

    // Salva as mensagens no localStorage
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    // Mostra as mensagens atualizadas
    mostrarMensagens();

    // Limpa o campo de mensagem
    inputMensagem.value = "";
}

// Função para iniciar a conversa (salvar nome e mostrar o chat)
function iniciarConversa() {
    nome = inputNome.value.trim();
    if (nome === "") return alert("Digite um nome válido!");

    // Gera um ID único para o usuário
    usuarioId = Date.now().toString();

    // Esconde o login e mostra o chat
    login.style.display = "none";
    chat.style.display = "block";

    // Mostra as mensagens
    mostrarMensagens();
}

// Adiciona event listeners aos botões
botaoIniciar.addEventListener("click", iniciarConversa);
botaoEnviar.addEventListener("click", enviarMensagem);

// Permite enviar a mensagem pressionando Enter
inputMensagem.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        enviarMensagem();
        event.preventDefault();
    }
});
