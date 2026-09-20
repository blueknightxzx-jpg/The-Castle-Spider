import { Scene } from "../core/Scene.js";

export class SandboxScene extends Scene {
  constructor(app) {
    super("sandbox");
    this.app = app;
    this.time = 0;
    this.dotX = 180;
    this.dotY = 270;
  }

  update(dt) {
    this.time += dt;
    const speed = 220;

    if (this.app.input.isDown("a") || this.app.input.isDown("arrowleft")) this.dotX -= speed * dt;
    if (this.app.input.isDown("d") || this.app.input.isDown("arrowright")) this.dotX += speed * dt;
    if (this.app.input.isDown("w") || this.app.input.isDown("arrowup")) this.dotY -= speed * dt;
    if (this.app.input.isDown("s") || this.app.input.isDown("arrowdown")) this.dotY += speed * dt;

    this.dotX = Math.max(40, Math.min(this.app.renderer.width - 40, this.dotX));
    this.dotY = Math.max(100, Math.min(this.app.renderer.height - 60, this.dotY));
  }

  render(renderer) {
    renderer.clear();
    const ctx = renderer.getContext();

    ctx.fillStyle = "#151820";
    ctx.fillRect(0, 0, renderer.width, 78);

    ctx.fillStyle = "#d9d9dd";
    ctx.font = "700 18px Arial, sans-serif";
    ctx.fillText("FOUNDATION SANDBOX", 30, 32);

    ctx.fillStyle = "#777b84";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("Input • Game Loop • Scene Manager • Renderer", 30, 53);

    ctx.strokeStyle = "#30333c";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 102, renderer.width - 48, renderer.height - 136);

    ctx.fillStyle = "#484c57";
    for (let x = 54; x < renderer.width - 54; x += 64) {
      ctx.fillRect(x, 150, 2, 2);
      ctx.fillRect(x, 430, 2, 2);
    }

    ctx.fillStyle = "#d7d8dc";
    ctx.beginPath();
    ctx.arc(this.dotX, this.dotY, 14 + Math.sin(this.time * 3) * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#858992";
    ctx.font = "13px Arial, sans-serif";
    ctx.fillText("ARROW KEYS / WASD", 40, renderer.height - 42);
    ctx.fillText("The moving marker proves the real-time loop is working.", 40, renderer.height - 24);
  }
}