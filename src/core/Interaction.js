export class InteractionSystem {
  constructor({ range = 110 } = {}) {
    this.range = range;
    this.active = null;
    this.lastAction = null;
  }

  update({ player, input, world, dt }) {
    this.lastAction = null;

    for (const object of world.closets) {
      const target = object.isOpen ? 1 : 0;
      const response = 1 - Math.exp(-dt * 8);

      object.openAmount +=
        (target - object.openAmount) * response;

      object.interactionPulse = Math.max(
        0,
        (object.interactionPulse || 0) - dt * 2.5
      );
    }

    let nearest = null;
    let nearestDistance = Infinity;

    for (const object of world.closets) {
      const distance = Math.abs(player.x - object.x);
      const reach =
        this.range +
        object.width / 2 +
        player.width / 2;

      if (distance <= reach && distance < nearestDistance) {
        nearest = object;
        nearestDistance = distance;
      }
    }

    this.active = nearest;

    if (nearest && input.wasPressed("e")) {
      nearest.isOpen = !nearest.isOpen;
      nearest.interactionPulse = 1;

      this.lastAction = nearest.isOpen
        ? "closet_opened"
        : "closet_closed";
    }
  }

  getPrompt() {
    if (!this.active) return null;

    return {
      key: "E",
      action: this.active.isOpen
        ? "CLOSE CLOSET"
        : "OPEN CLOSET"
    };
  }
}
