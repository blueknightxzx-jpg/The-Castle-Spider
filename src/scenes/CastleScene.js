import { Scene } from "../core/Scene.js";
import { Player } from "../entities/Player.js";
import { CastleWorld } from "../world/CastleWorld.js";
import { CastleRenderer } from "../world/CastleRenderer.js";

export class CastleScene extends Scene {
  constructor(app) {
    super("castle");
    this.app = app;
    this.world = new CastleWorld();
    this.castleRenderer = new CastleRenderer();
    this.player = null;
    this.cameraX = 0;
  }

  enter() {
    this.player = new Player({
      x: 170,
      y: this.world.playerY,
      skin: "default"
    });
    this.cameraX = 0;
  }

  update(dt) {
    this.player.update(dt, this.app.input, this.world);

    const viewportWidth = this.app.renderer.width;
    const target = this.player.x - viewportWidth * 0.38;

    this.cameraX = Math.max(
      0,
      Math.min(target, this.world.width - viewportWidth)
    );

    this.app.camera.x = this.cameraX;
    this.app.camera.y = 0;
  }

  render(renderer) {
    renderer.clear();
    const ctx = renderer.getContext();

    this.castleRenderer.draw(
      ctx,
      this.world,
      this.cameraX,
      renderer.width,
      renderer.height
    );

    ctx.save();
    ctx.translate(-Math.round(this.cameraX), 0);
    this.player.render(ctx);
    ctx.restore();

    this.drawHud(ctx, renderer);
  }

  drawHud(ctx, renderer) {
    ctx.fillStyle = "rgba(6,8,12,.82)";
    ctx.fillRect(22, 18, 330, 72);

    ctx.fillStyle = "#dadce2";
    ctx.font = "700 12px Arial, sans-serif";
    ctx.fillText("THE CASTLE SPIDER", 36, 38);

    ctx.fillStyle = "#757a84";
    ctx.font = "11px Arial, sans-serif";
    ctx.fillText("v0.3 • HALLWAY", 36, 58);
    ctx.fillText("E • INTERACT (SOON)", 36, 75);

    const barX = renderer.width - 226;
    const barY = 26;
    const barW = 190;

    ctx.fillStyle = "#777c86";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText("STAMINA", barX, barY);

    ctx.fillStyle = "#22252d";
    ctx.fillRect(barX, barY + 8, barW, 7);

    ctx.fillStyle = "#d2d4d9";
    ctx.fillRect(
      barX,
      barY + 8,
      barW * (this.player.stamina / this.player.maxStamina),
      7
    );

    ctx.fillStyle = "#70757f";
    ctx.fillText("A/D • SHIFT", barX, barY + 34);

    ctx.fillStyle = "#626771";
    ctx.font = "11px Arial, sans-serif";
    ctx.fillText("Sections: " + this.world.sections.length, barX, barY + 52);
  }
}