import { Scene } from "../core/Scene.js?v=v0.3.2";
import { Player } from "../entities/Player.js?v=v0.3.2";
import { CastleWorld } from "../world/CastleWorld.js?v=v0.3.2";
import { CastleRenderer } from "../world/CastleRenderer.js?v=v0.3.2";

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
    ctx.fillStyle = "rgba(6,8,12,.88)";
    ctx.fillRect(22, 18, 300, 78);

    ctx.fillStyle = "#dadce2";
    ctx.font = "700 12px Arial, sans-serif";
    ctx.fillText("THE CASTLE SPIDER", 36, 38);

    ctx.fillStyle = "#777c86";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText("HALLWAY • 1,200m", 36, 57);

    const meters = Math.max(
      0,
      Math.min(this.world.meters, this.player.x / this.world.pixelsPerMeter)
    );

    ctx.fillText(
      "DISTANCE • " + meters.toFixed(1) + "m / 1,200m",
      36,
      76
    );

    const barX = renderer.width - 226;
    const barY = 26;
    const barW = 190;
    const locked = this.player.sprintLocked;

    ctx.fillStyle = locked ? "#ff5252" : "#777c86";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText(
      locked ? "STAMINA • EXHAUSTED" : "STAMINA",
      barX,
      barY
    );

    if (locked) {
      const pulse = 0.5 + Math.sin(performance.now() / 95) * 0.5;

      ctx.fillStyle = pulse > 0.5 ? "#4f1117" : "#261015";
      ctx.fillRect(barX, barY + 8, barW, 8);

      ctx.strokeStyle = pulse > 0.5 ? "#ff3d46" : "#a41620";
      ctx.lineWidth = 2;
      ctx.strokeRect(barX - 1, barY + 7, barW + 2, 10);
    } else {
      ctx.fillStyle = "#22252d";
      ctx.fillRect(barX, barY + 8, barW, 8);
    }

    if (!locked) {
      ctx.fillStyle = "#d2d4d9";
      ctx.fillRect(
        barX,
        barY + 8,
        barW * (this.player.stamina / this.player.maxStamina),
        8
      );
    }

    ctx.fillStyle = locked ? "#ff6262" : "#70757f";
    ctx.fillText(
      locked ? "RECOVER TO 100% • A/D TO WALK" : "A/D • SHIFT",
      barX,
      barY + 34
    );

    if (this.player.exhaustionNoticeTimer > 0) {
      const maxTime = 2.2;
      const fadeIn = Math.min(1, (maxTime - this.player.exhaustionNoticeTimer) / 0.16);
      const fadeOut = Math.min(1, this.player.exhaustionNoticeTimer / 0.55);
      const alpha = Math.max(0, Math.min(fadeIn, fadeOut));

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.font = "700 17px Arial, sans-serif";
      ctx.fillStyle = "#f0f0f0";
      ctx.fillText(
        "TOO EXHAUSTED — RECOVER YOUR STAMINA TO SPRINT",
        renderer.width / 2,
        renderer.height - 42
      );
      ctx.restore();
    }
  }
}