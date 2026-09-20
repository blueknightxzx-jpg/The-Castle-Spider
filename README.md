# The Castle Spider

A browser-based 2D survival-horror game.

## Development status

**Current:** v0.4 — Interaction system started

The project follows a locked master roadmap.

## Current world

- Full map length: **1,200 meters**
- **12 pixels per meter**
- **14,400px** total world width
- One continuous side-view hallway
- Five 240m architectural sections
- Seeded closet positions with 60–120m spacing
- Larger closets intended to become future hiding locations
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
- Sprint lock at 0% until 100% recovery
- Smooth visual stamina refueling
- One-shot exhaustion warning
- Horizontal world bounds
- Neutral Default character skin
- Replaceable skin architecture
- Meter-derived castle architecture
- Aligned windows, columns, sconces and closets
- Enlarged interactive closets
- v0.4 E-key interaction system
- Closet open/close animation
- Contextual interaction prompt
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
- E: interact with nearby closets

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

Closets are now interactive in v0.4. Their future hiding behavior is reserved for v0.6.

The final exit is a large golden double door at the end of the 1,200m hallway.


## Sprint rule
When stamina reaches 0, sprint stops and locks. The player must recover to 100% before sprinting is available again. During recovery the stamina bar visibly refuels, and the exhaustion message appears once per exhaustion event.
