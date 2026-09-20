export class CastleWorld {
  constructor() {
    this.width = 4200;
    this.height = 540;

    this.ceilingY = 62;
    this.wallTop = 78;
    this.floorY = 430;
    this.playerY = 430;

    this.minX = 90;
    this.maxX = this.width - 90;

    const bayWidth = 840;

    this.sections = [
      { x: 0, width: bayWidth, name: "ENTRANCE HALL", style: "entrance" },
      { x: bayWidth, width: bayWidth, name: "LONG GALLERY", style: "gallery" },
      { x: bayWidth * 2, width: bayWidth, name: "SERVANTS' WING", style: "servants" },
      { x: bayWidth * 3, width: bayWidth, name: "OLD HALL", style: "old" },
      { x: bayWidth * 4, width: bayWidth, name: "NORTH PASSAGE", style: "north" }
    ];

    // One structural grid across the entire castle.
    this.columns = [];
    this.windows = [];
    this.doors = [];
    this.sconces = [];

    for (const section of this.sections) {
      const x0 = section.x;

      for (const offset of [0, 280, 560, 840]) {
        this.columns.push(x0 + offset);
      }

      for (const offset of [140, 420, 700]) {
        this.windows.push({
          x: x0 + offset,
          y: 142,
          width: 76,
          height: 112
        });
      }

      if (section.style === "entrance" || section.style === "servants" || section.style === "north") {
        this.doors.push({
          x: x0 + 420,
          y: 152,
          width: 94,
          height: 278,
          kind: section.style === "north" ? "iron" : "wood"
        });
      }

      for (const offset of [70, 770]) {
        this.sconces.push({
          x: x0 + offset,
          y: 286
        });
      }
    }

    const doorCenters = new Set(this.doors.map((door) => door.x));
    this.windows = this.windows.filter((window) => !doorCenters.has(window.x));

    this.exitX = this.width - 92;
  }
}