export class Input {
  constructor(target = window) {
    this.keys = new Set();
    this.pressed = new Set();
    this.released = new Set();

    target.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if (!this.keys.has(key)) this.pressed.add(key);
      this.keys.add(key);
    });

    target.addEventListener("keyup", (event) => {
      const key = event.key.toLowerCase();
      this.keys.delete(key);
      this.released.add(key);
    });

    target.addEventListener("blur", () => this.clear());
  }

  isDown(key) { return this.keys.has(key.toLowerCase()); }
  wasPressed(key) { return this.pressed.has(key.toLowerCase()); }
  wasReleased(key) { return this.released.has(key.toLowerCase()); }

  endFrame() {
    this.pressed.clear();
    this.released.clear();
  }

  clear() {
    this.keys.clear();
    this.pressed.clear();
    this.released.clear();
  }
}