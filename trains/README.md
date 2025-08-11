# Trains: A Horror Timing Game (Console)

Provider: Borderline

A minimal Python console prototype of the "Aviator-style" timing risk mechanic adapted to a horror theme. The Safety Meter drops over time as the train rides through unsettling segments. When the action prompt appears, type `pull` before the Safety Meter hits 0% to survive and proceed. Failing results in a crash.

## Requirements
- Linux/macOS terminal recommended
- Python 3.10+

## Run
```bash
python3 trains.py
```

## Controls
- Watch the Safety Meter bar.
- When you see `ACTION: Type 'pull' ...`, type `pull` and press Enter quickly.
- Survive to progress. Difficulty ramps after each segment.

## Notes
- The prototype focuses on console pacing and atmosphere through text. A graphical version can add SFX, animations and richer environmental events with the same timing core.