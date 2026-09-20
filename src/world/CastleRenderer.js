export class CastleRenderer {
  draw(ctx, world, cameraX, viewportWidth, viewportHeight) {
    this.drawSky(ctx, viewportWidth, viewportHeight);
    this.drawSections(ctx, world, cameraX, viewportWidth);
    this.drawWindows(ctx, world, cameraX, viewportWidth);
    this.drawPillars(ctx, world, cameraX, viewportWidth, viewportHeight);
    this.drawFloor(ctx, world, cameraX, viewportWidth, viewportHeight);
    this.drawTorches(ctx, world, cameraX, viewportWidth);
    this.drawExitMarker(ctx, world, cameraX, viewportWidth, viewportHeight);
  }

  drawSky(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.72);
    gradient.addColorStop(0, "#090b11");
    gradient.addColorStop(0.55, "#141821");
    gradient.addColorStop(1, "#252830");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  drawSections(ctx, world, cameraX, viewportWidth) {
    const startY = 85;
    const endY = 455;

    for (const section of world.sections) {
      const x = section.x - cameraX;
      if (x + section.width < -50 || x > viewportWidth + 50) continue;

      ctx.fillStyle = "#1b1e25";
      ctx.fillRect(x, startY, section.width, endY - startY);

      ctx.fillStyle = section.mood === "cold" ? "#292e38" :
        section.mood === "dim" ? "#24262d" :
        section.mood === "dark" ? "#1c1e24" : "#20232a";
      ctx.fillRect(x + 8, startY + 8, section.width - 16, endY - startY - 16);

      ctx.strokeStyle = "#343842";
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 8, startY + 8, section.width - 16, endY - startY - 16);

      ctx.fillStyle = "#686d77";
      ctx.font = "10px Arial, sans-serif";
      ctx.fillText(section.name, x + 24, 112);
    }
  }

  drawWindows(ctx, world, cameraX, viewportWidth) {
    for (const win of world.windows) {
      const x = win.x - cameraX;
      if (x < -120 || x > viewportWidth + 120) continue;

      ctx.fillStyle = "#080a0f";
      ctx.fillRect(x - 36, win.y, 72, 112);

      ctx.strokeStyle = "#646975";
      ctx.lineWidth = 3;
      ctx.strokeRect(x - 36, win.y, 72, 112);

      ctx.strokeStyle = "#30343d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, win.y);
      ctx.lineTo(x, win.y + 112);
      ctx.moveTo(x - 36, win.y + 56);
      ctx.lineTo(x + 36, win.y + 56);
      ctx.stroke();

      ctx.fillStyle = "rgba(120,135,160,.10)";
      ctx.fillRect(x - 30, win.y + 6, 60, 100);
    }
  }

  drawPillars(ctx, world, cameraX, viewportWidth, viewportHeight) {
    for (const px of world.pillars) {
      const x = px - cameraX;
      if (x < -70 || x > viewportWidth + 70) continue;

      ctx.fillStyle = "#111319";
      ctx.fillRect(x - 22, 120, 44, 335);

      ctx.fillStyle = "#3b3f48";
      ctx.fillRect(x - 15, 125, 30, 325);

      ctx.fillStyle = "#555a65";
      ctx.fillRect(x - 22, 112, 44, 16);
      ctx.fillRect(x - 25, 444, 50, 12);

      ctx.fillStyle = "#23262e";
      ctx.fillRect(x - 4, 128, 8, 315);
    }
  }

  drawFloor(ctx, world, cameraX, viewportWidth, viewportHeight) {
    const floorY = 455;

    ctx.fillStyle = "#0e1015";
    ctx.fillRect(0, floorY, viewportWidth, viewportHeight - floorY);

    ctx.fillStyle = "#2b2e35";
    ctx.fillRect(0, floorY - 18, viewportWidth, 18);

    ctx.fillStyle = "#121419";
    ctx.fillRect(0, floorY - 5, viewportWidth, 5);

    ctx.strokeStyle = "#20232a";
    ctx.lineWidth = 2;

    const start = Math.floor(cameraX / 80) * 80 - cameraX;
    for (let x = start; x < viewportWidth; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, floorY);
      ctx.lineTo(x - 20, viewportHeight);
      ctx.stroke();
    }
  }

  drawTorches(ctx, world, cameraX, viewportWidth) {
    for (const torch of world.torches) {
      const x = torch.x - cameraX;
      if (x < -50 || x > viewportWidth + 50) continue;

      ctx.fillStyle = "#30343d";
      ctx.fillRect(x - 4, torch.y, 8, 34);

      const glow = ctx.createRadialGradient(x, torch.y - 8, 2, x, torch.y - 8, 75);
      glow.addColorStop(0, "rgba(220,220,190,.20)");
      glow.addColorStop(1, "rgba(220,220,190,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, torch.y - 8, 75, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#b8b29b";
      ctx.beginPath();
      ctx.arc(x, torch.y - 8, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawExitMarker(ctx, world, cameraX, viewportWidth, viewportHeight) {
    const x = world.width - 145 - cameraX;
    if (x < -180 || x > viewportWidth + 180) return;

    const floor = 455;

    ctx.fillStyle = "#090b0f";
    ctx.fillRect(x - 52, floor - 170, 104, 170);

    ctx.strokeStyle = "#686d77";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 52, floor - 170, 104, 170);

    ctx.fillStyle = "#0e1117";
    ctx.fillRect(x - 37, floor - 148, 74, 148);

    ctx.fillStyle = "#aeb1b8";
    ctx.font = "700 12px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NORTH EXIT", x, floor + 26);
    ctx.textAlign = "left";
  }
}