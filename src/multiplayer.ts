import * as PIXI from "pixi.js";
import socket from "./socket";

interface PlayerData {
  id: string;
  x: number;
  y: number;
}

export class Multiplayer {
  app: PIXI.Application;
  players: Record<string, PIXI.Graphics>;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.players = {};

    // Receive full state
    socket.on("players", (players: Record<string, PlayerData>) => {
      for (const id in players) {
        const p = players[id];
        this.spawnPlayer(id, p.x, p.y);
      }
    });

    // Receive movement updates
    socket.on("move", (data: PlayerData) => {
      const player = this.players[data.id];
      if (player) {
        player.x = data.x;
        player.y = data.y;
      }
    });

    // Remove player on disconnect
    socket.on("playerDisconnected", (id: string) => {
      if (this.players[id]) {
        this.app.stage.removeChild(this.players[id]);
        delete this.players[id];
      }
    });
  }

  spawnPlayer(id: string, x: number, y: number) {
    if (this.players[id]) return;

    const g = new PIXI.Graphics();
    g.beginFill(0xff0000);
    g.drawCircle(0, 0, 20);
    g.endFill();
    g.x = x;
    g.y = y;

    this.players[id] = g;
    this.app.stage.addChild(g);
  }
}
