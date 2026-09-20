import { renderDefaultSkin } from "./DefaultSkin.js?v=v0.5.1";

const SKINS = Object.freeze({
  default: renderDefaultSkin
});

export function getSkinRenderer(name) {
  return SKINS[name] || SKINS.default;
}

export function hasSkin(name) {
  return Boolean(SKINS[name]);
}
