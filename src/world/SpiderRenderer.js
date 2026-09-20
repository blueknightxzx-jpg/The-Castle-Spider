const atlas = new Image();

atlas.src = new URL(
  "../../assets/player_spider/knight_spider_idle_atlas.png",
  import.meta.url
).href;

export class SpiderRenderer {
  draw(ctx, spider) {
    if (!spider) return;

    if (!atlas.complete || atlas.naturalWidth === 0) {
      this.drawFallback(ctx, spider);
      return;
    }

    const directionColumn = 0;
    const cellSize = 96;
    const left = Math.round(spider.x - 48);
    const top = Math.round(spider.y - 44);

    ctx.save();
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      atlas,
      directionColumn * cellSize,
      cellSize,
      cellSize,
      cellSize,
      left,
      top,
      cellSize,
      cellSize
    );

    if (spider.state === "listening") {
      const pulse =
        0.5 +
        Math.sin(performance.now() / 180) * 0.5;

      ctx.globalAlpha = 0.18 + pulse * 0.12;
      ctx.strokeStyle = "#c9ccd3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        spider.x,
        spider.y + 8,
        42 + pulse * 4,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    ctx.restore();
  }

  drawFallback(ctx, spider) {
    const x = spider.x;
    const y = spider.y;

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,.38)";
    ctx.beginPath();
    ctx.ellipse(
      x,
      y + 38,
      48,
      10,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    const listening =
      spider.state === "listening";

    ctx.strokeStyle =
      listening
        ? "#444852"
        : "#343840";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    const legPoints = [
      [-28,20,-66,8],
      [-33,24,-70,23],
      [-27,29,-62,43],
      [-15,31,-42,54],
      [28,20,66,8],
      [33,24,70,23],
      [27,29,62,43],
      [15,31,42,54]
    ];

    for (const [sx,sy,ex,ey] of legPoints) {
      ctx.beginPath();
      ctx.moveTo(x + sx, y + sy);
      ctx.lineTo(x + ex, y + ey);
      ctx.stroke();
    }

    const bodyGradient =
      ctx.createRadialGradient(
        x - 8,
        y + 8,
        4,
        x,
        y + 16,
        34
      );

    bodyGradient.addColorStop(0, "#4b4e56");
    bodyGradient.addColorStop(0.55, "#25282f");
    bodyGradient.addColorStop(1, "#0b0d11");

    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(
      x,
      y + 18,
      31,
      20,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = "#0a0b0f";
    ctx.beginPath();
    ctx.ellipse(
      x,
      y + 36,
      13,
      8,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle =
      listening
        ? "#dadde3"
        : "#8e929a";

    ctx.beginPath();
    ctx.arc(x - 8, y + 13, 2.2, 0, Math.PI * 2);
    ctx.arc(x + 8, y + 13, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}
