const { WebSocketServer } = require("ws");
// const http = require("http");

const webSocketServer = new WebSocketServer({ port: 8001 });

const users = {};
const clients = {};

const messageTypes = {
  CONTENT_CHANGE: "contentchange",
  USER_EVENT: "userevent",
};

let contentValue = null;

const sendMessageToAllClients = (data) => {
  Object.keys(clients).forEach((client) => {
    clients[client].send(JSON.stringify(data));
  });
};

webSocketServer.on("connection", (ws) => {
  const userId = Date.now();
  clients[userId] = ws;
  console.log(`New ${userId} is connected!`);

  ws.on("message", (message) => {
    const { type, data } = JSON.parse(message);
    if (type === messageTypes.CONTENT_CHANGE) {
      contentValue = data;
    } else if (type === messageTypes.USER_EVENT) {
      // TODO: update user activity
      users[userId] = data;
    }
    // TODO: send user activity to all clients
    sendMessageToAllClients({ users });
  });

  ws.on("close", () => {
    ws.send("Bye client");
  });
});
