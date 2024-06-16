import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import url from "url";
const server = createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const location = url.parse(req.url, true);
  const userId = location.query.userId;
  const timestamp = new Date().toLocaleString("en-US", { hour12: false });

  //get all connected users and send a message wen a user gets connected
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          message: `${userId} has connected for chat`,
          userId: "Mwaka the Admin",
          timestamp,
        })
      );
    }
  });

  console.log(`User ${userId} Connected`);

  //wen a user sends a message
  ws.on("message", (messageStr) => {
    // const location = url.parse(req.url, true);
    const messageDetails = JSON.parse(messageStr);
    const { userId, message } = messageDetails;
    const timestamp = new Date().toLocaleString("en-US", { hour12: false });
    // console.log("Message received...");
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            message,
            userId,
            timestamp,
          })
        );
      }
    });
  });

  ws.on("close", (wss) => {
    console.log("Connection is closed...");
  });
});
server.listen(8001, () => {
  console.log("Server listening on port 8001");
});

// npm init - initialize npm
// npm i ws - for web socket
// npm --watch server.js - alternative for nodemon
