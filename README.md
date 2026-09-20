# The Castle Spider

A browser-based 2D survival-horror game.

## Development status

**Current:** v0.3 — Castle, Structural Amendment 01

The project follows a locked master roadmap.

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
- Data-driven multi-section castle hallway
- Structured architecture grid
- Aligned windows, columns, doors, sconces and floor
- Long world camera traversal
- North exit marker
- Optional F3 debug overlay
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

## Architecture

- `src/core/` — reusable engine systems
- `src/entities/` — gameplay entities and skin renderers
- `src/world/` — castle data and rendering
- `src/scenes/` — game scenes
- `src/main.js` — application composition
- `DESIGN/` — locked milestone and structural documents

The castle visuals are intentionally structured around a fixed architectural grid so future content can be added without creating overlapping, unaligned scenery.
