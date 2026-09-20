export class Spider {
  constructor({ x = 4680, y = 86 } = {}) {
    this.x = x;
    this.y = y;

    this.width = 88;
    this.height = 46;

    this.state = "dormant";
    this.stateTime = 0;

    this.listeningDistance = 520;
    this.sprintListeningDistance = 760;
    this.returnToDormantTime = 4.5;

    this.noise = 0;
    this.targetNoise = 0;
  }

  update(dt, player, world) {
    const distance = Math.abs(player.x - this.x);

    this.targetNoise = player.isMoving
      ? player.isSprinting
        ? 1
        : 0.32
      : 0;

    const response = 1 - Math.exp(-dt * 7);
    this.noise +=
      (this.targetNoise - this.noise) * response;

    this.stateTime += dt;

    if (this.state === "dormant") {
      const sprintAlert =
        player.isSprinting &&
        distance <= this.sprintListeningDistance;

      const movementAlert =
        player.isMoving &&
        distance <= this.listeningDistance;

      if (
        sprintAlert ||
        movementAlert ||
        this.noise > 0.55
      ) {
        this.state = "listening";
        this.stateTime = 0;
      }
    } else if (this.state === "listening") {
      const stillFarAndQuiet =
        distance > this.listeningDistance + 140 &&
        this.noise < 0.04;

      if (
        stillFarAndQuiet &&
        this.stateTime >= this.returnToDormantTime
      ) {
        this.state = "dormant";
        this.stateTime = 0;
      }
    }

    // v0.5 does not move the spider.
    // Hunting/chasing/damage are reserved for later milestones.
    this.x = Math.max(
      0,
      Math.min(world.width, this.x)
    );
  }
}
