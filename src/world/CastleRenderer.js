export class CastleRenderer {
  draw(ctx, world, cameraX, viewportWidth, viewportHeight) {
    const cam = Math.round(cameraX);
    this.drawBackground(ctx, viewportWidth, viewportHeight);
    this.drawWallShell(ctx, world, cam, viewportWidth);
    this.drawSections(ctx, world, cam, viewportWidth);
    this.drawWindows(ctx, world, cam, viewportWidth);
    this.drawColumns(ctx, world, cam, viewportWidth);
    this.drawClosets(ctx, world, cam, viewportWidth);
    this.drawSconces(ctx, world, cam, viewportWidth);
    this.drawFloor(ctx, world, cam, viewportWidth, viewportHeight);
    this.drawExit(ctx, world, cam, viewportWidth);
  }

  drawBackground(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#07090e");
    gradient.addColorStop(0.55, "#121620");
    gradient.addColorStop(1, "#1b1d22");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  drawWallShell(ctx, world, cameraX, viewportWidth) {
    ctx.fillStyle = "#20242b";
    ctx.fillRect(-cameraX, world.wallTop, world.width, world.floorY - world.wallTop);

    ctx.fillStyle = "#101319";
    ctx.fillRect(0, world.ceilingY, viewportWidth, 16);

    ctx.fillStyle = "#454a53";
    ctx.fillRect(0, world.ceilingY + 16, viewportWidth, 5);

    ctx.fillStyle = "#0f1116";
    ctx.fillRect(0, world.floorY - 18, viewportWidth, 18);

    ctx.fillStyle = "#51555e";
    ctx.fillRect(0, world.floorY - 18, viewportWidth, 3);

    ctx.fillStyle = "#17191f";
    ctx.fillRect(0, world.floorY - 94, viewportWidth, 72);

    ctx.fillStyle = "#393d46";
    ctx.fillRect(0, world.floorY - 94, viewportWidth, 4);
  }

  drawSections(ctx, world, cameraX, viewportWidth) {
    for (const section of world.sections) {
      const x = section.x - cameraX;
      if (x + section.width < -20 || x > viewportWidth + 20) continue;

      const tone =
        section.style === "entrance" ? "#292e37" :
        section.style === "gallery" ? "#252a32" :
        section.style === "servants" ? "#23272f" :
        section.style === "old" ? "#20242b" :
        "#1d222a";

      ctx.fillStyle = tone;
      ctx.fillRect(
        x + 3,
        world.wallTop + 8,
        section.width - 6,
        world.floorY - world.wallTop - 102
      );

      // Subtle vertical wall segmentation; no room names or labels.
      ctx.strokeStyle = "rgba(93,98,108,.20)";
      ctx.lineWidth = 2;

      const bay = 240;
      for (let bayX = x + bay; bayX < x + section.width; bayX += bay) {
        ctx.beginPath();
        ctx.moveTo(bayX, world.wallTop + 22);
        ctx.lineTo(bayX, world.floorY - 104);
        ctx.stroke();
      }
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

      ctx.strokeStyle = "#666b75";
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

  drawColumns(ctx, world, cameraX, viewportWidth) {
    for (const columnX of world.columns) {
      const x = columnX - cameraX;
      if (x < -70 || x > viewportWidth + 70) continue;

      const top = 92;
      const bottom = world.floorY;
      const shaftTop = 112;

      ctx.fillStyle = "#101319";
      ctx.fillRect(x - 24, shaftTop, 48, bottom - shaftTop);

      ctx.fillStyle = "#4b5059";
      ctx.fillRect(x - 17, shaftTop + 3, 34, bottom - shaftTop - 6);

      ctx.fillStyle = "#686d77";
      ctx.fillRect(x - 28, top, 56, 18);
      ctx.fillRect(x - 31, bottom - 13, 62, 13);

      ctx.fillStyle = "#252a32";
      ctx.fillRect(x - 5, shaftTop + 4, 10, bottom - shaftTop - 10);
    }
  }

  drawClosets(ctx, world, cameraX, viewportWidth) {
    for (const closet of world.closets) {
      const x = closet.x - cameraX;
      if (x < -120 || x > viewportWidth + 120) continue;

      const left = x - closet.width / 2;
      const top = closet.y - closet.height;

      // Crown molding.
      ctx.fillStyle = "#626770";
      ctx.fillRect(left - 6, top - 8, closet.width + 12, 10);

      // Dark wood body.
      ctx.fillStyle = "#251b18";
      ctx.fillRect(left, top, closet.width, closet.height);

      // Raised frame.
      ctx.strokeStyle = "#7b5a43";
      ctx.lineWidth = 4;
      ctx.strokeRect(left + 3, top + 3, closet.width - 6, closet.height - 6);

      // Twin doors.
      ctx.strokeStyle = "#4b3529";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, top + 10);
      ctx.lineTo(x, closet.y - 8);
      ctx.stroke();

      // Recessed panels.
      ctx.strokeStyle = "#684b37";
      ctx.strokeRect(left + 10, top + 16, closet.width / 2 - 15, 58);
      ctx.strokeRect(x + 5, top + 16, closet.width / 2 - 15, 58);
      ctx.strokeRect(left + 10, top + 84, closet.width / 2 - 15, 66);
      ctx.strokeRect(x + 5, top + 84, closet.width / 2 - 15, 66);

      // Handles.
      ctx.fillStyle = "#b5a27a";
      ctx.beginPath();
      ctx.arc(x - 6, top + 46, 3, 0, Math.PI * 2);
      ctx.arc(x + 6, top + 46, 3, 0, Math.PI * 2);
      ctx.fill();

      // Base plinth.
      ctx.fillStyle = "#4c4038";
      ctx.fillRect(left - 5, closet.y - 8, closet.width + 10, 8);

      // Small shadow anchors the closet to the floor.
      ctx.fillStyle = "rgba(0,0,0,.34)";
      ctx.fillRect(left - 8, closet.y, closet.width + 16, 7);
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
      ctx.lineTo(x - 20, viewportHeight);
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
    if (x < -260 || x > viewportWidth + 260) return;

    const floor = world.floorY;
    const width = 210;
    const height = 328;
    const left = x - width / 2;
    const top = floor - height;

    // Deep architectural recess.
    ctx.fillStyle = "#06080b";
    ctx.fillRect(left - 18, top - 18, width + 36, height + 18);

    // Stone arch frame.
    ctx.strokeStyle = "#7a7d83";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(left - 6, floor);
    ctx.lineTo(left - 6, top + 46);
    ctx.quadraticCurveTo(x, top - 44, left + width + 6, top + 46);
    ctx.lineTo(left + width + 6, floor);
    ctx.stroke();

    // Golden double door.
    const gold = ctx.createLinearGradient(left, top, left + width, top);
    gold.addColorStop(0, "#8a5a12");
    gold.addColorStop(0.18, "#d9a62d");
    gold.addColorStop(0.5, "#ffe27a");
    gold.addColorStop(0.82, "#d09b24");
    gold.addColorStop(1, "#80530e");

    ctx.fillStyle = gold;
    ctx.fillRect(left, top + 34, width, height - 34);

    ctx.strokeStyle = "#f3cb59";
    ctx.lineWidth = 5;
    ctx.strokeRect(left + 5, top + 39, width - 10, height - 44);

    // Door split.
    ctx.strokeStyle = "#8d6618";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, top + 42);
    ctx.lineTo(x, floor - 6);
    ctx.stroke();

    // Decorative panels.
    ctx.strokeStyle = "#fff0a5";
    ctx.lineWidth = 2;
    for (const panelY of [top + 72, top + 160, top + 248]) {
      ctx.strokeRect(left + 22, panelY, width / 2 - 31, 62);
      ctx.strokeRect(x + 9, panelY, width / 2 - 31, 62);
    }

    // Handles.
    ctx.fillStyle = "#5f4210";
    ctx.beginPath();
    ctx.arc(x - 12, top + 184, 5, 0, Math.PI * 2);
    ctx.arc(x + 12, top + 184, 5, 0, Math.PI * 2);
    ctx.fill();

    // Gold floor threshold.
    ctx.fillStyle = "#a7791c";
    ctx.fillRect(left - 12, floor - 8, width + 24, 8);

    // No label: the silhouette and placement make this the obvious final exit.
  }
}