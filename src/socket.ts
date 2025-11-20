import io from "socket.io-client";

interface Player {
  [id: string]: { x: number; y: number };
}

interface MoveData {
  id?: string;
  x: number;
  y: number;
}

const socket = io("/", {
  path: "/socket.io",
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});

socket.on("players", (players: Player) => {
  console.log("Current players:", players);
});

socket.on("move", (data: MoveData) => {
  console.log("Player moved:", data);
});

socket.on("playerDisconnected", (id: string) => {
  console.log("Player disconnected:", id);
});

export default socket;
