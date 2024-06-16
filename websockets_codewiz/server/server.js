import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

server.listen(8001, () => {
  console.log("Server listening on port 8001");
});
