export class CastleWorld {
  constructor() {
    // Full-map scale: 1,200 meters at 4px per meter.
    this.meters = 1200;
    this.pixelsPerMeter = 4;
    this.width = this.meters * this.pixelsPerMeter;
    this.height = 540;

    this.ceilingY = 62;
    this.wallTop = 78;
    this.floorY = 430;
    this.playerY = 430;

    this.minX = 90;
    this.maxX = this.width - 90;

    // Five 240m architectural sections share one alignment system.
    const sectionWidth = 240 * this.pixelsPerMeter;
    this.sections = [
      { x: 0, width: sectionWidth, style: "entrance" },
      { x: sectionWidth, width: sectionWidth, style: "gallery" },
      { x: sectionWidth * 2, width: sectionWidth, style: "servants" },
      { x: sectionWidth * 3, width: sectionWidth, style: "old" },
      { x: sectionWidth * 4, width: sectionWidth, style: "deep" }
    ];

    this.columns = [];
    this.windows = [];
    this.sconces = [];
    this.closets = [];

    // Repeating 60m structural bays. Major elements occupy dedicated bay types.
    const bayWidth = 60 * this.pixelsPerMeter;

    for (const section of this.sections) {
      const x0 = section.x;

      for (let offset = 0; offset <= section.width; offset += bayWidth) {
        this.columns.push(x0 + offset);
      }

      // Windows occupy alternating bays.
      for (const offset of [30, 150, 270, 390, 510, 630, 750, 870]) {
        if (offset >= section.width) continue;
        this.windows.push({
          x: x0 + offset * this.pixelsPerMeter / 4,
          y: 142,
          width: 76,
          height: 112
        });
      }

      // Wall sconces use fixed anchors in the open lower wall zones.
      for (const offset of [45, 195]) {
        this.sconces.push({
          x: x0 + offset * this.pixelsPerMeter / 4,
          y: 286
        });
      }
    }

    this.generateClosets();

    // The only exit is the grand main door at the end of the 1,200m map.
    this.exitX = this.width - 86;
  }

  generateClosets() {
    // Seeded randomness means the layout is varied but reproducible.
    let seed = 0xC4573;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const minimumGap = 300; // 75m
    const maximumGap = 520; // 130m
    const minWallClearance = 52;

    let x = 250;

    while (x < this.exitX - 260 && this.closets.length < 18) {
      let candidate = x;
      let accepted = false;

      for (let attempt = 0; attempt < 8; attempt++) {
        const blockedByColumn = this.columns.some((column) =>
          Math.abs(column - candidate) < minWallClearance
        );

        if (!blockedByColumn) {
          accepted = true;
          break;
        }

        candidate += 36;
      }

      if (accepted) {
        const previous = this.closets[this.closets.length - 1];
        const gap = previous ? candidate - previous.x : candidate;

        if (gap >= minimumGap) {
          this.closets.push({
            x: Math.round(candidate),
            y: this.floorY,
            width: 68,
            height: 174,
            // Future hiding/interaction can use this without changing placement.
            spot: gap > 410 ? "good" : "tight"
          });
        }
      }

      const gap = minimumGap + Math.floor(random() * (maximumGap - minimumGap + 1));
      x = candidate + gap;
    }
  }
}