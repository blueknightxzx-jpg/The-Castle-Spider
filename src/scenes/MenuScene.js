import { Scene } from "../core/Scene.js";

export class MenuScene extends Scene {
  constructor(app) {
    super("menu");
    this.app = app;
  }

  update() {
    if (this.app.input.wasPressed("enter")) {
      this.app.states.change("castle");
    }
  }

  render(renderer) {
    const ctx = renderer.getContext();
    ctx.fillStyle = "#101219";
    ctx.fillRect(0, 0, renderer.width, renderer.height);

    const glow = ctx.createRadialGradient(
      renderer.width * 0.55, renderer.height * 0.45, 20,
      renderer.width * 0.55, renderer.height * 0.45, renderer.width * 0.6
    );
    glow.addColorStop(0, "#2a2d39");
    glow.addColorStop(1, "#090a0f");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, renderer.width, renderer.height);

    ctx.fillStyle = "#eeeeee";
    ctx.font = "700 70px Georgia, serif";
    ctx.fillText("THE CASTLE", 58, 150);
    ctx.fillStyle = "#bfc2ca";
    ctx.fillText("SPIDER", 58, 220);

    ctx.fillStyle = "#777b86";
    ctx.font = "italic 18px Georgia, serif";
    ctx.fillText("A survival-horror project.", 62, 258);

    ctx.fillStyle = "#dcdcdc";
    ctx.font = "700 16px Arial, sans-serif";
    ctx.fillText("PRESS ENTER", 62, 330);

    ctx.fillStyle = "#70737c";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("v0.3 CASTLE", 62, 370);
    ctx.fillText("F3  DEBUG OVERLAY", 62, 392);
  }
}