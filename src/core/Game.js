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
      if (event.key.toLowerCase() === config.debugKey) {
        this.debug = !this.debug;
      }
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
    const state = this.states.current;
    const world = state?.world;
    const player = state?.player;

    const x = this.renderer.width - 250;

    ctx.fillStyle = "rgba(0,0,0,.78)";
    ctx.fillRect(x, 16, 232, 118);

    ctx.fillStyle = "#fff";
    ctx.font = "12px monospace";
    ctx.fillText("FPS    " + this.fps.toFixed(0), x + 14, 36);
    ctx.fillText("DT     " + (this.frameTime * 1000).toFixed(2) + "ms", x + 14, 54);
    ctx.fillText("STATE  " + (state?.name ?? "none"), x + 14, 72);

    if (world?.meters) {
      const mapMeters = Math.round(world.meters);
      const playerMeters = player
        ? Math.max(0, Math.min(mapMeters, player.x / world.pixelsPerMeter))
        : 0;

      ctx.fillText("MAP    " + mapMeters + "m", x + 14, 90);
      ctx.fillText("POS    " + playerMeters.toFixed(1) + "m", x + 14, 108);
    }
  }
}