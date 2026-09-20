# Structural Amendment 03
## EXHAUSTION AND SPRINT LOCK

Applied during v0.3.2 hotfix.

### Sprint rules
1. Sprinting consumes stamina.
2. When stamina reaches **0**, sprint immediately stops.
3. The player enters an **exhausted sprint lock**.
4. While exhausted, Shift cannot start sprinting.
5. Stamina continues recovering while the lock is active.
6. Sprint remains unavailable until stamina reaches **100%**.
7. The exhausted stamina track visibly pulses red.
8. Attempting to sprint while exhausted shows:
   **"TOO EXHAUSTED — RECOVER YOUR STAMINA TO SPRINT"**
9. The warning fades smoothly instead of remaining permanently on screen.
10. Once stamina is fully restored, sprint becomes available again.

### Verification
The player state was executed in a local regression test:
- Sprint reached 0 stamina.
- Lock activated.
- Sprint stayed disabled while locked.
- Recovery reached full stamina.
- Sprint worked again only after full recovery.

### Re-lock
This is part of the locked game design until explicitly revised.
