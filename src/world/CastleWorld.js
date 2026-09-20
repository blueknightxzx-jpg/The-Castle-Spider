export class CastleWorld {
  constructor() {
    this.width = 4200;
    this.height = 540;
    this.minX = 90;
    this.maxX = this.width - 90;
    this.minY = 285;
    this.maxY = 440;

    this.sections = [
      { x: 0, width: 760, name: "ENTRANCE HALL", mood: "cold" },
      { x: 760, width: 920, name: "LONG GALLERY", mood: "quiet" },
      { x: 1680, width: 760, name: "SERVANTS' WING", mood: "dim" },
      { x: 2440, width: 980, name: "OLD HALL", mood: "dark" },
      { x: 3420, width: 780, name: "NORTH PASSAGE", mood: "deep" }
    ];

    this.windows = [
      { x: 290, y: 155 },
      { x: 1040, y: 145 },
      { x: 1370, y: 160 },
      { x: 1920, y: 150 },
      { x: 2740, y: 145 },
      { x: 3160, y: 155 },
      { x: 3710, y: 148 }
    ];

    this.pillars = [
      120, 610, 830, 1250, 1600, 1780, 2180, 2400,
      2590, 3040, 3370, 3520, 3950
    ];

    this.torches = [
      { x: 380, y: 235 },
      { x: 940, y: 230 },
      { x: 1510, y: 235 },
      { x: 2030, y: 235 },
      { x: 2830, y: 232 },
      { x: 3290, y: 232 },
      { x: 3800, y: 230 }
    ];
  }
}