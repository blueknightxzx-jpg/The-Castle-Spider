export class CastleRenderer {
  draw(ctx, world, cameraX, viewportWidth, viewportHeight) {
    const cam = Math.round(cameraX);
    this.drawBackground(ctx, viewportWidth, viewportHeight);
    this.drawWallShell(ctx, world, cam, viewportWidth);
    this.drawSections(ctx, world, cam, viewportWidth);
    this.drawWindows(ctx, world, cam, viewportWidth);
    this.drawDoors(ctx, world, cam, viewportWidth);
    this.drawColumns(ctx, world, cam, viewportWidth);
    this.drawSconces(ctx, world, cam, viewportWidth);
    this.drawFloor(ctx, world, cam, viewportWidth, viewportHeight);
    this.drawExit(ctx, world, cam, viewportWidth);
  }

  drawBackground(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#080a0f");
    gradient.addColorStop(0.55, "#121620");
    gradient.addColorStop(1, "#1c1e23");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  drawWallShell(ctx, world, cameraX, viewportWidth) {
    ctx.fillStyle = "#20242b";
    ctx.fillRect(-cameraX, world.wallTop, world.width, world.floorY - world.wallTop);

    ctx.fillStyle = "#11141a";
    ctx.fillRect(0, world.ceilingY, viewportWidth, 16);

    ctx.fillStyle = "#3f444d";
    ctx.fillRect(0, world.ceilingY + 16, viewportWidth, 5);

    ctx.fillStyle = "#111419";
    ctx.fillRect(0, world.floorY - 18, viewportWidth, 18);

    ctx.fillStyle = "#4b4f58";
    ctx.fillRect(0, world.floorY - 18, viewportWidth, 3);

    ctx.fillStyle = "#15181e";
    ctx.fillRect(0, world.floorY - 94, viewportWidth, 72);

    ctx.fillStyle = "#373b44";
    ctx.fillRect(0, world.floorY - 94, viewportWidth, 4);

    ctx.fillStyle = "#11141a";
    ctx.fillRect(0, world.floorY - 24, viewportWidth, 4);
  }

  drawSections(ctx, world, cameraX, viewportWidth) {
    for (const section of world.sections) {
      const x = section.x - cameraX;
      if (x + section.width < -20 || x > viewportWidth + 20) continue;

      const tone =
        section.style === "entrance" ? "#272c35" :
        section.style === "gallery" ? "#242931" :
        section.style === "servants" ? "#22262e" :
        section.style === "old" ? "#20242b" :
        "#1e232b";

      ctx.fillStyle = tone;
      ctx.fillRect(
        x + 3,
        world.wallTop + 8,
        section.width - 6,
        world.floorY - world.wallTop - 102
      );

      ctx.fillStyle = "#777c86";
      ctx.font = "700 10px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(section.name, x + section.width / 2, 104);
      ctx.textAlign = "left";
    }
  }

  drawWindows(ctx, world, cameraX, viewportWidth) {
    for (const window of world.windows) {
      const x = window.x - cameraX;
      if (x < -110 || x > viewportWidth + 110) continue;

      const left = x - window.width / 2;
      const top = window.y;

      ctx.fillStyle = "#07090d";
      ctx.fillRect(left, top, window.width, window.height);

      ctx.strokeStyle = "#656b75";
      ctx.lineWidth = 4;
      ctx.strokeRect(left, top, window.width, window.height);

      ctx.strokeStyle = "#2d323b";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, top);
      ctx.lineTo(x, top + window.height);
      ctx.moveTo(left, top + window.height / 2);
      ctx.lineTo(left + window.width, top + window.height / 2);
      ctx.stroke();

      ctx.fillStyle = "rgba(120,140,170,.10)";
      ctx.fillRect(left + 7, top + 7, window.width - 14, window.height - 14);
    }
  }

  drawDoors(ctx, world, cameraX, viewportWidth) {
    for (const door of world.doors) {
      const x = door.x - cameraX;
      if (x < -150 || x > viewportWidth + 150) continue;

      const left = x - door.width / 2;
      const bottom = world.floorY;
      const top = bottom - door.height;

      ctx.fillStyle = door.kind === "iron" ? "#101319" : "#16151a";
      ctx.fillRect(left, top + 28, door.width, door.height - 28);

      ctx.beginPath();
      ctx.moveTo(left, top + 28);
      ctx.lineTo(left, top + 16);
      ctx.quadraticCurveTo(x, top - 22, left + door.width, top + 16);
      ctx.lineTo(left + door.width, top + 28);
      ctx.closePath();

      ctx.fillStyle = door.kind === "iron" ? "#171b22" : "#231f1c";
      ctx.fill();

      ctx.strokeStyle = "#5b6069";
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.fillStyle = "#0a0c10";
      ctx.fillRect(left + 12, top + 40, door.width - 24, door.height - 52);

      ctx.fillStyle = "#6e737b";
      ctx.fillRect(left - 6, bottom - 10, door.width + 12, 10);

      if (door.kind === "wood") {
        ctx.strokeStyle = "#4d3f34";
        ctx.lineWidth = 2;
        for (let y = top + 66; y < bottom - 20; y += 42) {
          ctx.beginPath();
          ctx.moveTo(left + 10, y);
          ctx.lineTo(left + door.width - 10, y);
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = "#70757d";
        ctx.fillRect(x - 3, top + 55, 6, 6);
      }
    }
  }

  drawColumns(ctx, world, cameraX, viewportWidth) {
    for (const columnX of world.columns) {
      const x = columnX - cameraX;
      if (x < -70 || x > viewportWidth + 70) continue;

      const top = 92;
      const bottom = world.floorY;
      const shaftTop = 112;

      ctx.fillStyle = "#101319";
      ctx.fillRect(x - 24, shaftTop, 48, bottom - shaftTop);

      ctx.fillStyle = "#4a4f58";
      ctx.fillRect(x - 17, shaftTop + 3, 34, bottom - shaftTop - 6);

      ctx.fillStyle = "#666b75";
      ctx.fillRect(x - 28, top, 56, 18);
      ctx.fillRect(x - 31, bottom - 13, 62, 13);

      ctx.fillStyle = "#252a32";
      ctx.fillRect(x - 5, shaftTop + 4, 10, bottom - shaftTop - 10);
    }
  }

  drawSconces(ctx, world, cameraX, viewportWidth) {
    for (const sconce of world.sconces) {
      const x = sconce.x - cameraX;
      if (x < -80 || x > viewportWidth + 80) continue;

      const glow = ctx.createRadialGradient(x, sconce.y, 3, x, sconce.y, 70);
      glow.addColorStop(0, "rgba(225,220,190,.18)");
      glow.addColorStop(1, "rgba(225,220,190,0)");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, sconce.y, 70, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#30343d";
      ctx.fillRect(x - 4, sconce.y, 8, 20);

      ctx.fillStyle = "#b8b29c";
      ctx.beginPath();
      ctx.arc(x, sconce.y - 5, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#676c75";
      ctx.fillRect(x - 10, sconce.y + 18, 20, 4);
    }
  }

  drawFloor(ctx, world, cameraX, viewportWidth, viewportHeight) {
    const y = world.floorY;

    ctx.fillStyle = "#0c0f14";
    ctx.fillRect(0, y, viewportWidth, viewportHeight - y);

    ctx.fillStyle = "#1b1d24";
    ctx.fillRect(0, y, viewportWidth, 54);

    ctx.fillStyle = "#41444d";
    ctx.fillRect(0, y, viewportWidth, 3);
    ctx.fillRect(0, y + 51, viewportWidth, 3);

    ctx.strokeStyle = "#30333b";
    ctx.lineWidth = 2;

    const seamStart = -(Math.floor(cameraX / 140) * 140);
    for (let x = seamStart; x < viewportWidth + 140; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, y + 54);
      ctx.lineTo(x, viewportHeight);
      ctx.stroke();
    }

    ctx.strokeStyle = "#262a31";
    for (let x = seamStart - 70; x < viewportWidth + 140; x += 140) {
      ctx.beginPath();
      ctx.moveTo(x, y + 78);
      ctx.lineTo(x, viewportHeight);
      ctx.stroke();
    }
  }

  drawExit(ctx, world, cameraX, viewportWidth) {
    const x = world.exitX - cameraX;
    if (x < -150 || x > viewportWidth + 150) return;

    const floor = world.floorY;
    const left = x - 56;
    const width = 112;
    const height = 300;
    const top = floor - height;

    ctx.fillStyle = "#0a0d12";
    ctx.fillRect(left, top, width, height);

    ctx.strokeStyle = "#7a7f87";
    ctx.lineWidth = 5;
    ctx.strokeRect(left, top, width, height);

    ctx.fillStyle = "#15191f";
    ctx.fillRect(left + 14, top + 18, width - 28, height - 18);

    ctx.fillStyle = "#b5b8bf";
    ctx.font = "700 11px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NORTH EXIT", x, top - 16);
    ctx.textAlign = "left";
  }
}