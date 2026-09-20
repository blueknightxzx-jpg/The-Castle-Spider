import { CONFIG } from "./core/Config.js?v=v0.5.1";
import { Input } from "./core/Input.js?v=v0.5.1";
import { Renderer } from "./core/Renderer.js?v=v0.5.1";
import { StateMachine } from "./core/StateMachine.js?v=v0.5.1";
import { Game } from "./core/Game.js?v=v0.5.1";
import { Camera } from "./core/Camera.js?v=v0.5.1";
import { BootScene } from "./scenes/BootScene.js?v=v0.5.1";
import { MenuScene } from "./scenes/MenuScene.js?v=v0.5.1";
import { CastleScene } from "./scenes/CastleScene.js?v=v0.5.1";

function showRuntimeError(error) {
  const message = error instanceof Error ? error.message : String(error);
  let panel = document.getElementById("runtimeError");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "runtimeError";
    panel.style.cssText = [
      "position:fixed",
      "inset:0",
      "display:grid",
      "place-items:center",
      "padding:24px",
      "background:#07090d",
      "color:#eee",
      "font:14px/1.5 Arial,sans-serif",
      "z-index:9999",
      "text-align:center"
    ].join(";");

    document.body.appendChild(panel);
  }

  panel.innerHTML =
    "<div style=\"max-width:720px\">" +
    "<h1 style=\"font:700 28px Georgia,serif;margin:0 0 12px\">The Castle Spider couldn't start</h1>" +
    "<p style=\"color:#aaa;margin:0 0 10px\">A runtime error was caught instead of leaving a blank page.</p>" +
    "<pre style=\"white-space:pre-wrap;text-align:left;background:#12151b;padding:14px;border:1px solid #30343c\">" +
    escapeHtml(message) +
    "</pre></div>";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;");
}

window.addEventListener("error", (event) => {
  if (event.error) showRuntimeError(event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  showRuntimeError(event.reason);
});

try {
  const canvas = document.getElementById("gameCanvas");

  if (!canvas) {
    throw new Error("Game canvas element was not found.");
  }

  const renderer = new Renderer(canvas, CONFIG.width, CONFIG.height);
  const input = new Input(window);
  const states = new StateMachine();
  const camera = new Camera();
  const app = { renderer, input, states, camera, config: CONFIG };

  states
    .add("boot", new BootScene(app))
    .add("menu", new MenuScene(app))
    .add("castle", new CastleScene(app));

  const game = new Game({ renderer, input, states, config: CONFIG });
  game.start("boot");

  window.addEventListener("resize", () => renderer.resize());
  window.castleSpider = { app, game, renderer, input, states, camera };
} catch (error) {
  showRuntimeError(error);
}