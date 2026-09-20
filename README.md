# The Castle Spider

A browser-based 2D survival-horror game.

## Development status

**Current:** v0.3 — Castle

The project is being developed from a locked master roadmap.

## Current systems

- Fixed internal game resolution with responsive browser scaling
- Central game loop and delta-time handling
- Scene/state manager
- Keyboard input abstraction
- Canvas renderer
- Camera foundation and world travel
- Boot and main menu scenes
- Modular player entity
- Movement with acceleration/deceleration
- Sprint and stamina
- World bounds/collision foundation
- Data-driven multi-section castle world
- Castle architecture renderer
- Windows, pillars, floor, torches and section identities
- Long world camera traversal
- North exit marker
- Optional F3 debug overlay
- Low-spec performance-conscious rendering defaults

## Controls

Menu:
- Enter: enter the castle

Castle:
- A / Left Arrow: move left
- D / Right Arrow: move right
- W / Up Arrow: move up
- S / Down Arrow: move down
- Shift: sprint
- F3: toggle debug overlay

## Architecture

- `src/core/` — reusable engine systems
- `src/entities/` — gameplay entities
- `src/world/` — world data and world rendering
- `src/scenes/` — game scenes
- `src/main.js` — application composition
- `DESIGN/` — locked milestone documents

The temporary visual assets are intentionally replaceable. The underlying systems are being built first.
