export class SpiderRenderer {
  draw(ctx, spider) {
    if (!spider) return;

    const x = spider.x;
    const y = spider.y;

    // The scene applies the world-to-screen camera transform before drawing,
    // so this renderer must not cull against raw world-space x.

    ctx.save();

    const listening =
      spider.state === "listening";

    ctx.globalAlpha =
      listening ? 1 : 0.86;

    // Ceiling shadow gives the creature weight
    // without expensive effects.
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

    ctx.strokeStyle =
      listening
        ? "#444852"
        : "#343840";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";

    const legPoints = [
      [-28, 20, -66, 8],
      [-33, 24, -70, 23],
      [-27, 29, -62, 43],
      [-15, 31, -42, 54],
      [28, 20, 66, 8],
      [33, 24, 70, 23],
      [27, 29, 62, 43],
      [15, 31, 42, 54]
    ];

    for (const [
      sx,
      sy,
      ex,
      ey
    ] of legPoints) {
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
    bodyGradient.addColorStop(
      0,
      "#4b4e56"
    );
    bodyGradient.addColorStop(
      0.55,
      "#25282f"
    );
    bodyGradient.addColorStop(
      1,
      "#0b0d11"
    );

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
    ctx.arc(
      x - 8,
      y + 13,
      2.2,
      0,
      Math.PI * 2
    );
    ctx.arc(
      x + 8,
      y + 13,
      2.2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    if (listening) {
      const pulse =
        0.5 +
        Math.sin(
          performance.now() / 180
        ) *
          0.5;

      ctx.globalAlpha =
        0.14 + pulse * 0.10;
      ctx.strokeStyle = "#c9ccd3";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        x,
        y + 22,
        42 + pulse * 4,
        0,
        Math.PI * 2
      );
      ctx.stroke();
    }

    ctx.restore();
  }
}
