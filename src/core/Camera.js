export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  follow(targetX, targetY, viewportWidth, viewportHeight, worldWidth, worldHeight) {
    this.x = Math.max(0, Math.min(targetX - viewportWidth / 2, worldWidth - viewportWidth));
    this.y = Math.max(0, Math.min(targetY - viewportHeight / 2, worldHeight - viewportHeight));
  }
}