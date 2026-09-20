export function renderDefaultSkin(ctx, player) {
  const left = Math.round(player.x - player.width / 2);
  const top = Math.round(player.y - player.height);

  ctx.save();

  // Neutral starter appearance. Final art and future skins plug into the same Player entity.
  ctx.fillStyle = "#20242c";
  ctx.fillRect(left + 6, top + 22, player.width - 12, 24);

  ctx.fillStyle = "#2d3440";
  ctx.fillRect(left + 4, top + 42, player.width - 8, 13);

  ctx.fillStyle = "#d0ab8b";
  ctx.fillRect(left + 8, top + 5, player.width - 16, 18);

  ctx.fillStyle = "#343942";
  ctx.fillRect(left + 7, top + 1, player.width - 14, 7);

  ctx.fillStyle = "#13161c";
  ctx.fillRect(left + 6, top + 23, 5, 17);
  ctx.fillRect(left + player.width - 11, top + 23, 5, 17);

  ctx.fillStyle = "#3b414b";
  ctx.fillRect(left + 6, top + 55, 8, 3);
  ctx.fillRect(left + player.width - 14, top + 55, 8, 3);

  const eyeX = player.facing > 0 ? left + player.width - 10 : left + 5;
  ctx.fillStyle = "#1a1d23";
  ctx.fillRect(eyeX, top + 11, 2, 2);

  ctx.restore();
}