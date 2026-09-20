import { Scene } from "../core/Scene.js";
import { Player } from "../entities/Player.js";

export class PlayerScene extends Scene {
  constructor(app) {
    super("player");
    this.app = app;
    this.player = null;

    this.world = {
      minX: 80,
      maxX: 880,
      minY: 215,
      maxY: 440
    };
  }

  enter() {
    this.player = new Player({ x: 170, y: 400 });
  }

  update(dt) {
    this.player.update(dt, this.app.input, this.world);

    const camera = this.app.camera;
    camera.follow(
      this.player.x,
      this.player.y,
      this.app.renderer.width,
      this.app.renderer.height,
      this.app.renderer.width,
      this.app.renderer.height
    );
  }

  render(renderer) {
    renderer.clear();
    const ctx = renderer.getContext();

    drawCastleTestRoom(ctx, renderer.width, renderer.height);
    this.player.render(ctx);
    drawHud(ctx, this.player);

    ctx.fillStyle = "#747983";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("v0.2 PLAYER TEST", 28, 30);
    ctx.fillText("A/D or ←/→ move • W/S or ↑/↓ move vertically • SHIFT sprint", 28, 49);
  }
}

function drawCastleTestRoom(ctx, width, height) {
  const floorY = 455;

  ctx.fillStyle = "#11141a";
  ctx.fillRect(0, 0, width, height);

  const wall = ctx.createLinearGradient(0, 70, 0, floorY);
  wall.addColorStop(0, "#161a22");
  wall.addColorStop(1, "#2b2d32");
  ctx.fillStyle = wall;
  ctx.fillRect(0, 70, width, floorY - 70);

  ctx.fillStyle = "#17191e";
  ctx.fillRect(0, floorY, width, height - floorY);

  ctx.strokeStyle = "#3c3f48";
  ctx.lineWidth = 2;

  for (let x = 40; x < width; x += 120) {
    ctx.strokeRect(x, 130, 80, 270);
  }

  ctx.fillStyle = "#30343b";
  ctx.fillRect(0, floorY - 18, width, 18);
  ctx.fillStyle = "#0a0c10";
  ctx.fillRect(0, floorY - 6, width, 6);

  ctx.fillStyle = "#080a0e";
  ctx.fillRect(60, 160, 110, 160);
  ctx.strokeStyle = "#5a5e67";
  ctx.strokeRect(60, 160, 110, 160);

  ctx.fillStyle = "#4a4f59";
  ctx.fillRect(width - 180, 150, 110, 170);
  ctx.fillStyle = "#0b0d11";
  ctx.fillRect(width - 168, 166, 86, 142);

  ctx.fillStyle = "#555a64";
  ctx.fillRect(width / 2 - 7, 115, 14, 80);
}

function drawHud(ctx, player) {
  const barX = 28;
  const barY = 70;
  const barW = 190;
  const barH = 8;

  ctx.fillStyle = "#9a9da5";
  ctx.font = "11px Arial, sans-serif";
  ctx.fillText("STAMINA", barX, barY - 8);

  ctx.fillStyle = "#242731";
  ctx.fillRect(barX, barY, barW, barH);

  ctx.fillStyle = "#d5d7dc";
  ctx.fillRect(
    barX,
    barY,
    barW * (player.stamina / player.maxStamina),
    barH
  );

  ctx.fillStyle = "#777b85";
  ctx.font = "11px Arial, sans-serif";
  ctx.fillText(
    player.isSprinting ? "SPRINTING" : "WALKING",
    barX,
    barY + 29
  );
}