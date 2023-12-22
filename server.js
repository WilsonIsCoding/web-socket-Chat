const express = require("express");
const ServerSocket = require("ws").Server; // 引用 Server

const PORT = 8080;

// 建立 express 物件並用來監聽 8080 port
const server = express().listen(PORT, () =>
  console.log(`[Server] Listening on https://localhost:${PORT}`)
);

// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
const wss = new ServerSocket({ server });

// Connection opened
wss.on("connection", (ws, req) => {
  ws.id = req.headers["sec-websocket-key"].substring(0, 8);
  userName = req.url.split("?")[1];
  ws.send(ws.id);
  ws.on("message", (data) => {
    const parsedData = JSON.parse(data);
    parsedData.id = ws.id;
    let clients = wss.clients;
    clients.forEach((client) => {
      client.send(JSON.stringify(parsedData));
    });
  });

  // Connection closed
  ws.on("close", () => {
    console.log("[Close connected]");
  });
});
