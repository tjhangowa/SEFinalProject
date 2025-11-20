import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple REST API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// HTTP server + Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

// Track connected players
const players: Record<string, { x: number; y: number }> = {};

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Assign new player a random position
  players[socket.id] = {
    x: Math.floor(Math.random() * 800),
    y: Math.floor(Math.random() * 600),
  };

  // Send all current players (including the new player) to the new client
  socket.emit("players", players);

  //// Movement updates
  socket.on("move", (data: { x: number; y: number }) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;

      io.emit("move", {
        id: socket.id,
        x: data.x,
        y: data.y,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);

    delete players[socket.id];

    io.emit("playerDisconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
