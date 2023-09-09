import { getElementFromHtml, messageTypes } from "./utils.js";

export class App {
  constructor() {
    this.root = document.querySelector(".main-content");
    this.userName = null;
    this.renderLoginForm();
  }

  renderLoginForm() {
    const loginHtml = `<div class="login">
      <input type="text" id="user-name" />
      <button id="login-button">Join Session</button>
    </div>`;
    const loginElement = getElementFromHtml(loginHtml);

    const loginButton = loginElement.querySelector("#login-button");
    loginButton.addEventListener("click", () => {
      this.handleLogin();
    });
    this.root.appendChild(loginElement);
  }

  handleSocketConnection() {
    const socket = new WebSocket("ws://localhost:8001");

    socket.addEventListener("open", () => {
      console.log("Client opened a new connection");

      socket.send(
        JSON.stringify({ type: messageTypes.USER_EVENT, data: this.userName })
      );
    });

    socket.addEventListener("message", ({ data }) => {
      const { users } = JSON.parse(data);
      console.log({ users });
    });
  }

  handleLogin() {
    const userName = document.querySelector("#user-name").value;
    this.userName = userName;
    this.handleSocketConnection();
  }
}

new App();
