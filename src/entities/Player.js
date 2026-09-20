import { clamp, resolveAxis } from "../core/Collision.js";

export class Player {
  constructor({ x = 160, y = 360 } = {}) {
    this.x = x;
    this.y = y;

    this.width = 28;
    this.height = 56;

    this.walkSpeed = 155;
    this.sprintMultiplier = 1.75;

    this.maxStamina = 100;
    this.stamina = this.maxStamina;
    this.sprintDrain = 32;
    this.staminaRecovery = 22;

    this.maxSpeedSmoothing = 900;
    this.velocityX = 0;
    this.velocityY = 0;

    this.facing = 1;
    this.isSprinting = false;
    this.isMoving = false;
  }

  update(dt, input, world) {
    const left = input.isDown("a") || input.isDown("arrowleft");
    const right = input.isDown("d") || input.isDown("arrowright");
    const up = input.isDown("w") || input.isDown("arrowup");
    const down = input.isDown("s") || input.isDown("arrowdown");

    const axisX = Number(right) - Number(left);
    const axisY = Number(down) - Number(up);

    this.isMoving = axisX !== 0 || axisY !== 0;

    if (axisX !== 0) this.facing = axisX > 0 ? 1 : -1;

    const wantsSprint =
      input.isDown("shift") &&
      this.isMoving &&
      this.stamina > 0;

    this.isSprinting = wantsSprint;

    if (wantsSprint) {
      this.stamina = clamp(
        this.stamina - this.sprintDrain * dt,
        0,
        this.maxStamina
      );
    } else {
      this.stamina = clamp(
        this.stamina + this.staminaRecovery * dt,
        0,
        this.maxStamina
      );
    }

    const speed = this.walkSpeed * (this.isSprinting ? this.sprintMultiplier : 1);

    const targetVX = axisX * speed;
    const targetVY = axisY * speed;

    this.velocityX = approach(this.velocityX, targetVX, this.maxSpeedSmoothing * dt);
    this.velocityY = approach(this.velocityY, targetVY, this.maxSpeedSmoothing * dt);

    const xResult = resolveAxis(
      this.x,
      this.velocityX,
      world.minX + this.width / 2,
      world.maxX - this.width / 2,
      dt
    );

    const yResult = resolveAxis(
      this.y,
      this.velocityY,
      world.minY + this.height / 2,
      world.maxY - this.height / 2,
      dt
    );

    this.x = xResult.position;
    this.y = yResult.position;
    this.velocityX = xResult.velocity;
    this.velocityY = yResult.velocity;
  }

  render(ctx) {
    const left = this.x - this.width / 2;
    const top = this.y - this.height;

    ctx.save();

    // Temporary readable knight silhouette.
    ctx.fillStyle = "#222631";
    ctx.fillRect(left + 5, top + 22, this.width - 10, 30);

    ctx.fillStyle = "#d7b18f";
    ctx.fillRect(left + 8, top + 5, this.width - 16, 21);

    ctx.fillStyle = "#adb5c0";
    ctx.fillRect(left + 5, top + 2, this.width - 10, 8);

    ctx.fillStyle = "#c6ccd3";
    ctx.fillRect(left + 5, top + 46, 8, 18);
    ctx.fillRect(left + this.width - 13, top + 46, 8, 18);

    ctx.fillStyle = "#8d98a6";
    if (this.isSprinting) {
      ctx.fillRect(left - 5, top + 25, 7, 18);
    }

    ctx.restore();
  }

  getBounds() {
    return {
      left: this.x - this.width / 2,
      right: this.x + this.width / 2,
      top: this.y - this.height,
      bottom: this.y
    };
  }
}

function approach(current, target, amount) {
  if (current < target) return Math.min(current + amount, target);
  if (current > target) return Math.max(current - amount, target);
  return target;
}