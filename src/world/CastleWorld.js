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

    // The only exit is the grand main door at the end of the 1,200m map.
    // It must be initialized before closet generation.
    this.exitX = this.width - 86;

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

    // 60m structural bays.
    const bayWidth = 60 * this.pixelsPerMeter;

    for (const section of this.sections) {
      const x0 = section.x;

      for (let offset = 0; offset <= section.width; offset += bayWidth) {
        this.columns.push(x0 + offset);
      }

      // Window centers: 30m, 90m, 150m, 210m into each section.
      for (const metersOffset of [30, 90, 150, 210]) {
        this.windows.push({
          x: x0 + metersOffset * this.pixelsPerMeter,
          y: 142,
          width: 76,
          height: 112
        });
      }

      for (const metersOffset of [45, 195]) {
        this.sconces.push({
          x: x0 + metersOffset * this.pixelsPerMeter,
          y: 286
        });
      }
    }

    this.generateClosets();
  }

  generateClosets() {
    // Seeded layout: varied on purpose, but exactly reproducible.
    let seed = 0xC4573;

    const randomInt = (min, max) => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return min + Math.floor((seed / 4294967296) * (max - min + 1));
    };

    // Columns occupy even 30m slots. Starting from an odd slot keeps closets
    // in open bays rather than directly on columns.
    const slotStep = 30 * this.pixelsPerMeter;
    const gapChoices = [2, 4]; // 60m or 120m
    const lastAllowedSlot = Math.floor((this.exitX - 165) / slotStep);

    let slotIndex = 3; // first closet at 90m

    // The bound is a second line of defense against future generator changes.
    const maxPlacements = 40;

    while (slotIndex <= lastAllowedSlot && this.closets.length < maxPlacements) {
      const candidate = slotIndex * slotStep;

      this.closets.push({
        x: candidate,
        y: this.floorY,
        width: 68,
        height: 174,
        spacing: this.closets.length === 0
          ? "start"
          : candidate - this.closets[this.closets.length - 1].x >= 480
            ? "spread"
            : "tight"
      });

      slotIndex += gapChoices[randomInt(0, gapChoices.length - 1)];
    }
  }
}