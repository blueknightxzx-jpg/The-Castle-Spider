import { Scene } from "../core/Scene.js?v=v0.5.0";
import { InteractionSystem } from "../core/Interaction.js?v=v0.5.0";
import { Player } from "../entities/Player.js?v=v0.5.0";
import { CastleWorld } from "../world/CastleWorld.js?v=v0.5.0";
import { CastleRenderer } from "../world/CastleRenderer.js?v=v0.5.0";
import { Spider } from "../entities/Spider.js?v=v0.5.0";
import { SpiderRenderer } from "../world/SpiderRenderer.js?v=v0.5.0";

export class CastleScene extends Scene {
  constructor(app) {
    super("castle");
    this.app = app;
    this.world = new CastleWorld();
    this.castleRenderer = new CastleRenderer();
    this.spiderRenderer = new SpiderRenderer();
    this.interaction = new InteractionSystem({ range: 110 });
    this.player = null;
    this.spider = null;
    this.cameraX = 0;
    this.hudTime = 0;
  }

  enter() {
    this.player = new Player({
      x: 170,
      y: this.world.playerY,
      skin: "default"
    });
    this.cameraX = 0;
    this.hudTime = 0;
    this.interaction.active = null;
    this.spider = new Spider({
      x: this.world.spiderSpawn.x,
      y: this.world.spiderSpawn.y
    });
  }

  update(dt) {
    this.hudTime += dt;
    this.player.update(dt, this.app.input, this.world);

    this.interaction.update({
      player: this.player,
      input: this.app.input,
      world: this.world,
      dt
    });

    this.spider.update(
      dt,
      this.player,
      this.world
    );

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

    this.drawInteractionPrompt(ctx);
    this.drawSpiderStateFx(ctx, renderer);
    this.drawHud(ctx, renderer);
  }

  drawInteractionPrompt(ctx) {
    const prompt = this.interaction.getPrompt();
    const target = this.interaction.active;
    if (!prompt || !target) return;

    const x = target.x - this.cameraX;
    const y = target.y - target.height - 24;
    const boxW = prompt.action === "CLOSE CLOSET" ? 154 : 148;
    const boxH = 30;
    const left = Math.round(x - boxW / 2);
    const top = Math.round(y - boxH / 2);

    ctx.save();
    ctx.fillStyle = "rgba(7,9,13,.94)";
    ctx.fillRect(left, top, boxW, boxH);
    ctx.strokeStyle = "rgba(210,214,221,.75)";
    ctx.lineWidth = 1;
    ctx.strokeRect(left + 0.5, top + 0.5, boxW - 1, boxH - 1);

    ctx.fillStyle = "#f0f1f4";
    ctx.fillRect(left + 8, top + 6, 20, 18);
    ctx.fillStyle = "#101319";
    ctx.font = "700 11px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(prompt.key, left + 18, top + 19);

    ctx.fillStyle = "#dadce2";
    ctx.textAlign = "left";
    ctx.font = "700 10px Arial, sans-serif";
    ctx.fillText(prompt.action, left + 36, top + 19);
    ctx.restore();
  }

  drawSpiderStateFx(ctx, renderer) {
    if (!this.spider || this.spider.state === "dormant") return;

    const x = this.spider.x - this.cameraX;
    if (x < -140 || x > ctx.canvas.width + 140) return;

    ctx.save();
    ctx.globalAlpha =
      this.spider.state === "listening"
        ? 0.3 + Math.sin(this.hudTime * 4) * 0.08
        : 0.18;
    ctx.strokeStyle = "#d7d9de";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      x,
      this.spider.y + 26,
      7,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.restore();
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
    const recovering = this.player.isRecovering;
    const locked = this.player.sprintLocked;

    ctx.fillStyle = locked ? "#ff6262" : recovering ? "#c4c7ce" : "#777c86";
    ctx.font = "10px Arial, sans-serif";
    ctx.fillText(
      locked
        ? "STAMINA • RECOVERING"
        : recovering
          ? "STAMINA • REFUELING"
          : "STAMINA",
      barX,
      barY
    );

    ctx.fillStyle = locked ? "#26161a" : "#22252d";
    ctx.fillRect(barX, barY + 8, barW, 8);

    const visualRatio = this.player.visualStamina / this.player.maxStamina;
    const targetRatio = this.player.stamina / this.player.maxStamina;

    if (recovering) {
      const targetW = barW * targetRatio;
      const visualW = barW * visualRatio;

      ctx.fillStyle = locked ? "rgba(205,125,130,.24)" : "rgba(210,212,218,.20)";
      ctx.fillRect(barX + visualW, barY + 8, Math.max(0, targetW - visualW), 8);

      ctx.fillStyle = locked ? "#d8a2a7" : "#d2d4d9";
      ctx.fillRect(barX, barY + 8, barW * visualRatio, 8);

      const filledWidth = Math.max(1, barW * visualRatio);
      const sweep = (this.hudTime * 42) % (filledWidth + 32);
      const shineX = barX + Math.max(-20, sweep - 20);
      const shine = ctx.createLinearGradient(shineX - 12, 0, shineX + 12, 0);
      shine.addColorStop(0, "rgba(255,255,255,0)");
      shine.addColorStop(0.5, "rgba(255,255,255,.35)");
      shine.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = shine;
      ctx.fillRect(barX, barY + 8, filledWidth, 8);

      const pulse = 0.5 + Math.sin(performance.now() / 120) * 0.5;
      ctx.strokeStyle = locked
        ? pulse > 0.5 ? "#ff525a" : "#8f2933"
        : "rgba(210,214,221,.45)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barX - 1, barY + 7, barW + 2, 10);
    } else {
      ctx.fillStyle = "#d2d4d9";
      ctx.fillRect(barX, barY + 8, barW * visualRatio, 8);
    }

    ctx.fillStyle = locked ? "#ff7777" : recovering ? "#9297a0" : "#70757f";
    ctx.fillText(
      locked
        ? "RECOVER TO 100% • A/D TO WALK"
        : recovering
          ? "REFUELING • SPRINT RETURNS AT 100%"
          : "A/D • SHIFT",
      barX,
      barY + 34
    );

    if (this.player.exhaustionNoticeTimer > 0) {
      const maxTime = 3.2;
      const elapsed = maxTime - this.player.exhaustionNoticeTimer;
      const fadeIn = Math.min(1, elapsed / 0.2);
      const fadeOut = Math.min(1, this.player.exhaustionNoticeTimer / 0.7);
      const alpha = Math.max(0, Math.min(fadeIn, fadeOut));

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = "center";
      ctx.font = "700 17px Arial, sans-serif";
      ctx.fillStyle = "#f0f0f0";
      ctx.fillText(
        "TOO EXHAUSTED — RECOVER TO 100% TO SPRINT AGAIN",
        renderer.width / 2,
        renderer.height - 42
      );
      ctx.restore();
    }
  }
}