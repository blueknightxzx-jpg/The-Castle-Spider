# The Castle Spider

A browser-based 2D survival-horror game.

## Development status

**Current:** v0.3 — Castle, Structural Amendments 01–02

The project follows a locked master roadmap.

## Current world

- Full map length: **1,200 meters**
- **12 pixels per meter**
- **14,400px** total world width
- One continuous side-view hallway
- Five 240m architectural sections
- Seeded closet positions with 60–120m spacing
- Single grand golden main exit with a curved upper door edge matching its arch

## Current systems

- Fixed internal game resolution with responsive browser scaling
- Central game loop and delta-time handling
- Scene/state manager
- Keyboard input abstraction
- Canvas renderer
- Camera/world traversal
- Boot and main menu scenes
- Modular player entity
- Horizontal movement with acceleration/deceleration
- Sprint and stamina
- Horizontal world bounds
- Neutral Default character skin
- Replaceable skin architecture
- Meter-derived castle architecture
- Aligned windows, columns, sconces and closets
- Grand golden exit
- F3 debug telemetry for FPS, state, map meters and player position
- Low-spec performance-conscious rendering defaults

## Controls

Menu:
- Enter: enter the hallway

Hallway:
- A / Left Arrow: move left
- D / Right Arrow: move right
- Shift: sprint
- E: reserved interaction key (not active until v0.4)

Not used for movement:
- W
- S
- Up Arrow
- Down Arrow

## Character system

The starting character uses the **Default** skin.

Knight and other character designs will be added later as skins without changing the underlying player controller.

## World rules

Room names and exit labels are not rendered into the game world.

Closets are currently visual-only. Interaction and hiding behavior arrive in their roadmap phases.

The final exit is a large golden double door at the end of the 1,200m hallway.
