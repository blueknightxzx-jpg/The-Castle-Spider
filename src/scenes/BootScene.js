import { Scene } from "../core/Scene.js?v=v0.3.2";

export class BootScene extends Scene {
  constructor(app) {
    super("boot");
    this.app = app;
    this.elapsed = 0;
  }

  enter() { this.elapsed = 0; }

  update(dt) {
    this.elapsed += dt;
    if (this.elapsed >= 0.45) this.app.states.change("menu");
  }

  render(renderer) {
    const ctx = renderer.getContext();
    ctx.fillStyle = "#07090d";
    ctx.fillRect(0, 0, renderer.width, renderer.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#d7d7d7";
    ctx.font = "700 24px Georgia, serif";
    ctx.fillText("THE CASTLE SPIDER", renderer.width / 2, renderer.height / 2 - 10);
    ctx.fillStyle = "#777";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("INITIALIZING CASTLE SYSTEMS", renderer.width / 2, renderer.height / 2 + 18);
    ctx.textAlign = "left";
  }
}