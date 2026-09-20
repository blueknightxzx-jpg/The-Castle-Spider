import { clamp, resolveHorizontal } from "../core/Collision.js?v=v0.3.2";
import { getSkinRenderer } from "./skins/Registry.js?v=v0.3.2";

export class Player {
  constructor({ x = 160, y = 430, skin = "default" } = {}) {
    this.x = x;
    this.y = y;

    this.width = 28;
    this.height = 58;

    this.walkSpeed = 155;
    this.sprintMultiplier = 1.75;

    this.maxStamina = 100;
    this.stamina = this.maxStamina;
    this.sprintDrain = 32;
    this.staminaRecovery = 22;

    this.maxSpeedSmoothing = 900;
    this.velocityX = 0;

    this.facing = 1;
    this.isSprinting = false;
    this.isMoving = false;

    // Sprint lock: once stamina reaches zero, sprint stays unavailable
    // until stamina has completely recovered to 100.
    this.sprintLocked = false;
    this.sprintAttemptCooldown = 0;
    this.exhaustionNoticeTimer = 0;
    this.staminaFlashTimer = 0;

    this.skin = skin;
    this.skinRenderer = getSkinRenderer(skin);
  }

  update(dt, input, world) {
    const left = input.isDown("a") || input.isDown("arrowleft");
    const right = input.isDown("d") || input.isDown("arrowright");

    // W/S and Up/Down intentionally do nothing.
    const axisX = Number(right) - Number(left);
    this.isMoving = axisX !== 0;

    if (axisX !== 0) {
      this.facing = axisX > 0 ? 1 : -1;
    }

    this.sprintAttemptCooldown = Math.max(0, this.sprintAttemptCooldown - dt);
    this.exhaustionNoticeTimer = Math.max(0, this.exhaustionNoticeTimer - dt);
    this.staminaFlashTimer = Math.max(0, this.staminaFlashTimer - dt);

    // A sprint lock is only cleared at a completely full stamina bar.
    if (this.sprintLocked) {
      this.stamina = clamp(
        this.stamina + this.staminaRecovery * dt,
        0,
        this.maxStamina
      );

      if (this.stamina >= this.maxStamina) {
        this.stamina = this.maxStamina;
        this.sprintLocked = false;
      }
    }

    const wantsSprint =
      input.isDown("shift") &&
      this.isMoving;

    if (wantsSprint && this.sprintLocked) {
      this.isSprinting = false;

      if (this.sprintAttemptCooldown <= 0) {
        this.exhaustionNoticeTimer = 2.2;
        this.staminaFlashTimer = 0.9;
        this.sprintAttemptCooldown = 0.85;
      }
    } else if (wantsSprint && this.stamina > 0 && !this.sprintLocked) {
      this.isSprinting = true;
      this.stamina = clamp(
        this.stamina - this.sprintDrain * dt,
        0,
        this.maxStamina
      );

      // The exact frame that hits zero enters the lock state.
      if (this.stamina <= 0) {
        this.stamina = 0;
        this.sprintLocked = true;
        this.isSprinting = false;
        this.exhaustionNoticeTimer = 2.2;
        this.staminaFlashTimer = 0.9;
        this.sprintAttemptCooldown = 0.85;
      }
    } else {
      this.isSprinting = false;

      if (!this.sprintLocked) {
        this.stamina = clamp(
          this.stamina + this.staminaRecovery * dt,
          0,
          this.maxStamina
        );
      }
    }

    const speed =
      this.walkSpeed *
      (this.isSprinting ? this.sprintMultiplier : 1);

    const targetVX = axisX * speed;

    this.velocityX = approach(
      this.velocityX,
      targetVX,
      this.maxSpeedSmoothing * dt
    );

    const result = resolveHorizontal(
      this.x,
      this.velocityX,
      world.minX + this.width / 2,
      world.maxX - this.width / 2,
      dt
    );

    this.x = result.position;
    this.velocityX = result.velocity;

    // The hallway is a single movement plane.
    this.y = world.playerY;
  }

  render(ctx) {
    this.skinRenderer(ctx, this);
  }

  setSkin(name) {
    this.skin = name;
    this.skinRenderer = getSkinRenderer(name);
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