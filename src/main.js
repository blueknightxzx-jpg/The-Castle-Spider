import { CONFIG } from "./core/Config.js";
import { Input } from "./core/Input.js";
import { Renderer } from "./core/Renderer.js";
import { StateMachine } from "./core/StateMachine.js";
import { Game } from "./core/Game.js";
import { Camera } from "./core/Camera.js";
import { BootScene } from "./scenes/BootScene.js";
import { MenuScene } from "./scenes/MenuScene.js";
import { CastleScene } from "./scenes/CastleScene.js";

const canvas = document.getElementById("gameCanvas");
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