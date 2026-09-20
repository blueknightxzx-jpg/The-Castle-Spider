export class Game {
  constructor({ renderer, input, states, config }) {
    this.renderer = renderer;
    this.input = input;
    this.states = states;
    this.config = config;
    this.running = false;
    this.lastTime = 0;
    this.debug = false;
    this.fps = 0;
    this.frameTime = 0;

    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === config.debugKey) this.debug = !this.debug;
    });
  }

  start(initialState) {
    this.states.change(initialState);
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame((time) => this.frame(time));
  }

  frame(time) {
    if (!this.running) return;

    const rawDt = Math.max(0, (time - this.lastTime) / 1000);
    const dt = Math.min(rawDt, this.config.maxDelta);
    this.lastTime = time;
    this.frameTime = rawDt;
    this.fps = rawDt > 0 ? 1 / rawDt : this.config.targetFps;

    this.states.update(dt);
    this.renderer.clear();
    this.states.render(this.renderer);

    if (this.debug) this.renderDebug();

    this.input.endFrame();
    requestAnimationFrame((next) => this.frame(next));
  }

  renderDebug() {
    const ctx = this.renderer.getContext();
    const x = this.renderer.width - 220;
    ctx.fillStyle = "rgba(0,0,0,.72)";
    ctx.fillRect(x, 16, 200, 74);
    ctx.fillStyle = "#fff";
    ctx.font = "12px monospace";
    ctx.fillText("FPS   " + this.fps.toFixed(0), x + 15, 38);
    ctx.fillText("DT    " + (this.frameTime * 1000).toFixed(2) + "ms", x + 15, 56);
    ctx.fillText("STATE " + (this.states.current ? this.states.current.name : "none"), x + 15, 74);
  }
}