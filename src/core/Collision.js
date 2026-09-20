export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function resolveAxis(position, velocity, min, max, dt) {
  const next = position + velocity * dt;
  if (next < min) return { position: min, velocity: 0, blocked: true };
  if (next > max) return { position: max, velocity: 0, blocked: true };
  return { position: next, velocity, blocked: false };
}