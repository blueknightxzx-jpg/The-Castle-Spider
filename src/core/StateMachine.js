export class StateMachine {
  constructor() {
    this.states = new Map();
    this.current = null;
  }

  add(name, state) {
    if (!name || !state) throw new Error("State requires a name and object.");
    this.states.set(name, state);
    return this;
  }

  change(name, payload) {
    const next = this.states.get(name);
    if (!next) throw new Error("Unknown game state: " + name);
    if (this.current && this.current.exit) this.current.exit();
    this.current = next;
    if (this.current.enter) this.current.enter(payload);
  }

  update(dt) {
    if (this.current && this.current.update) this.current.update(dt);
  }

  render(renderer) {
    if (this.current && this.current.render) this.current.render(renderer);
  }
}