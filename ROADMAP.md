# THE CASTLE SPIDER — MASTER ROADMAP
## LOCKED DEVELOPMENT PLAN

Status: LOCKED — STRUCTURAL AMENDMENTS 01–02 APPLIED
Current version: v0.3
Rule: Follow this roadmap unless the roadmap itself is deliberately changed and re-locked.

## Vision
The Castle Spider is a 2D side-view survival-horror game set inside a huge mysterious castle.

Core loop:
Explore → listen → detect danger → find safety → hide → survive → continue → discover → escape

## Core structural decisions
- The primary traversal space is a side-view castle hallway.
- Full map length is **1,200 meters**.
- Player traversal is strictly horizontal.
- **A / Left Arrow** moves left.
- **D / Right Arrow** moves right.
- **Shift** sprints.
- **W, S, Up Arrow and Down Arrow are NOT movement controls.**
- **E is reserved as the interaction key.** Its gameplay function begins in v0.4 or later.
- The player begins with a neutral **Default** character appearance.
- Knight and other character skins are future content and must not be hard-coded into the base player controller.
- Castle architecture uses deliberate alignment/grid rules.
- Current door-like hiding structures are **closets**, not generic doors.
- Closets are placed on a 30m grid with deterministic 60–120m gaps.
- The final exit is a single large golden main door.
- Room/section names are not shown in the world.
- Performance remains a first-class constraint for low-spec browser hardware.

## Development phases
0. Game Design Lock
1. Technical Foundation
2. Player
3. Castle
4. Atmosphere
5. The Spider
6. Screech System
7. Hiding
8. Randomization
9. Events
10. Items & Resources
11. Progression
12. Escalation
13. Story & Discovery
14. Puzzles
15. Major Areas & Set Pieces
16. Major Encounters
17. Endgame
18. Replayability
19. UI / UX Polish
20. Visual Polish
21. Audio Polish
22. Save System
23. Testing
24. Optimization
25. Final Release Build
26. Release

## Locked development rules
1. No rushing.
2. No random feature dumping.
3. Build systems before content.
4. Every milestone must work before stacking more systems.
5. Performance is considered from day one.
6. Placeholder art remains placeholder art until replaced.
7. Horror relies on uncertainty, not constant attacks.
8. Failure must be understandable and fair.
9. Test every milestone.
10. This roadmap is the authority unless explicitly changed and re-locked.
11. Structural decisions such as controls, traversal model, world scale, character architecture and castle composition are documented rather than silently patched.

## Version structure
v0.1 Foundation
v0.2 Player
v0.3 Castle
v0.4 Interaction
v0.5 Spider
v0.6 Hiding
v0.7 Events
v0.8 Randomization
v0.9 Progression
v1.0 Complete Core Game
v1.x Expansion / polish
v2.0 Major finished release

## Structural amendment 01
Applied before v0.4:
- Removed vertical player movement from the design.
- Reserved E for future interaction.
- Replaced the knight as the hard-coded starting character with a neutral default character.
- Established a structured castle alignment grid.

## Structural amendment 02
Applied before v0.4:
- Expanded the full map to 1,200 meters.
- Replaced generic wall doors with dedicated castle closets.
- Set closet spacing to 90–120m on a 30m grid.
- Removed room/exit text labels.
- Established the grand golden main exit.

## Structural amendment 03
Applied during v0.3.2 hotfix:
- Sprint locks immediately at 0 stamina.
- Sprint cannot resume until stamina reaches 100%.
- Exhaustion is communicated by a pulsing red stamina track and a fading warning message.
