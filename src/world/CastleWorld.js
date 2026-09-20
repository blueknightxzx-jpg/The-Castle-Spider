export class CastleWorld {
  constructor() {
    // Real world scale: 1,200m × 12px/m = 14,400px of traversable map.
    this.meters = 1200;
    this.pixelsPerMeter = 12;
    this.width = this.meters * this.pixelsPerMeter;
    this.height = 540;

    this.ceilingY = 54;
    this.wallTop = 72;
    this.floorY = 430;
    this.playerY = 430;

    this.minX = 90;
    this.maxX = this.width - 90;

    // The only exit is the grand main door at the exact end of the map.
    this.exitX = this.width - 72;

    // Five 240m architectural sections. Every important measurement below
    // derives from meters, keeping the entire castle on one consistent scale.
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

    // v0.5 begins with one deterministic spider presence.
    // It is far enough into the castle to avoid turning the opening into
    // an immediate threat encounter.
    this.spiderSpawn = {
      x: 390 * this.pixelsPerMeter,
      y: 86
    };

    // Structural columns every 60m.
    const bayWidth = 60 * this.pixelsPerMeter;

    for (const section of this.sections) {
      const x0 = section.x;

      for (let offset = 0; offset <= section.width; offset += bayWidth) {
        this.columns.push(x0 + offset);
      }

      // Four centered windows per 240m section.
      for (const metersOffset of [30, 90, 150, 210]) {
        this.windows.push({
          x: x0 + metersOffset * this.pixelsPerMeter,
          y: 142,
          width: 48,
          height: 94
        });
      }

      // Two wall sconces per section.
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
    // Seeded and reproducible. Odd slots sit in the middle of structural bays;
    // even slots are column lines, so closets never land on a column.
    let seed = 0xC4573;

    const randomInt = (min, max) => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return min + Math.floor((seed / 4294967296) * (max - min + 1));
    };

    const slotStep = 30 * this.pixelsPerMeter;
    const gapChoices = [2, 4]; // 60m or 120m
    const lastAllowedSlot = Math.floor((this.exitX - 15 * this.pixelsPerMeter) / slotStep);

    let slotIndex = 3; // first closet at 90m

    while (slotIndex <= lastAllowedSlot && this.closets.length < 40) {
      const candidate = slotIndex * slotStep;

      this.closets.push({
        x: candidate,
        y: this.floorY,
        width: 7 * this.pixelsPerMeter,
        height: 8.5 * this.pixelsPerMeter,
        interactive: true,
        isOpen: false,
        openAmount: 0,
        interactionPulse: 0,
        spacing: this.closets.length === 0
          ? "start"
          : candidate - this.closets[this.closets.length - 1].x >= 90 * this.pixelsPerMeter
            ? "spread"
            : "tight"
      });

      slotIndex += gapChoices[randomInt(0, gapChoices.length - 1)];
    }
  }
}