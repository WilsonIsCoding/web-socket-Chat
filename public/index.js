var ws;
const messageContainer = document.getElementById("message-container");
const messageInput = document.querySelector("#sendMsg");
const clientsTotal = document.getElementById("client-total");
let nameInput;
let userId;
// 監聽 click 事件
document.querySelector("#connect")?.addEventListener("click", (e) => {
  connect();
});
function connect() {
  if(userId)return
  nameInput = document.querySelector("#name-input");
  ws = new WebSocket(`ws://localhost:8080`);
  ws.onopen = () => {
    console.log("[open connection]");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.totalUser) {
        if (!userId) {
          userId = data.id;
        }
        clientsTotal.innerText = `Total Clients: ${data.totalUser}`;
        return;
      } else if (data.id !== userId) {
        addMessageToUI(false, data);
        return;
      }
    };
  };
}
document.querySelector("#disconnect")?.addEventListener("click", (e) => {
  disconnect();
});
document.querySelector("#sendBtn")?.addEventListener("click", (e) => {
  sendMessage(messageInput?.value);
});

function sendMessage() {
  if (messageInput.value === "") return;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  ws.send(JSON.stringify(data));
  addMessageToUI(true, data);
  messageInput.value = "";
}
function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const liElement = document.createElement("li");
  liElement.className = isOwnMessage ? "message-right" : "message-left";

  const pElement = document.createElement("p");
  pElement.className = "message";
  pElement.textContent = data.message;

  const spanElement = document.createElement("span");
  spanElement.textContent = `${data.name} ● ${data.dateTime}`;

  pElement.appendChild(spanElement);
  liElement.appendChild(pElement);

  messageContainer.appendChild(liElement);
  scrollToBottom();
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}
function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
function disconnect() {
  ws.onclose = (event) => {
    console.log("[close connection]");
    clientsTotal.innerText = `You are out lined~`;
  };
  ws.close();
}
