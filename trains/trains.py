#!/usr/bin/env python3
import sys
import time
import random
import threading
import select
from dataclasses import dataclass


@dataclass
class SegmentConfig:
    min_duration_s: float = 6.0
    max_duration_s: float = 14.0
    min_decrease_per_s: float = 8.0   # percent/s
    max_decrease_per_s: float = 18.0  # percent/s
    noise_per_tick: float = 2.5       # random +/- per second equivalent
    tick_hz: float = 20.0
    prompt_window_ratio: tuple[float, float] = (0.25, 0.75)  # when prompt appears within segment duration
    prompt_timeout_ratio: tuple[float, float] = (0.15, 0.35) # allowed time window length relative to duration
    success_replenish: float = 20.0    # percent restored on success
    min_replenish: float = 5.0         # clamp
    max_replenish: float = 35.0        # clamp


ATMOS_TEXT = [
    "The lights flicker...",
    "A shadow glides past the window.",
    "You hear a distant metallic scrape.",
    "A whisper rides the wind between carriages.",
    "The carriage sways harder than before.",
    "Something taps beneath the seats...",
]

CRASH_TEXT = [
    "A deafening screech. Gravity lurches. Silence follows.",
    "Metal screams. The carriage twists. Then, nothing.",
    "A shadow floods the cabin. The world shatters around you.",
]

PROMPT_WORD = "pull"


def fmt_meter(meter: float, width: int = 30) -> str:
    meter = max(0.0, min(100.0, meter))
    filled = int((meter / 100.0) * width)
    bar = "#" * filled + "-" * (width - filled)
    return f"[{bar}] {meter:6.2f}%"


def readline_with_timeout(timeout_s: float) -> str | None:
    """Read a line from stdin with timeout (Linux/Unix). Returns None on timeout."""
    rlist, _, _ = select.select([sys.stdin], [], [], timeout_s)
    if rlist:
        line = sys.stdin.readline()
        return line.strip().lower()
    return None


def maybe_print_atmos(last_print_s: float, now_s: float, min_gap: float = 2.0, chance: float = 0.2) -> float:
    if now_s - last_print_s >= min_gap and random.random() < chance:
        print("\n" + random.choice(ATMOS_TEXT))
        return now_s
    return last_print_s


def play_segment(segment_ix: int, current_meter: float, cfg: SegmentConfig) -> tuple[bool, float]:
    """
    Returns (success, new_meter).
    success False indicates crash/game over for this segment.
    """
    duration = random.uniform(cfg.min_duration_s, cfg.max_duration_s)
    base_drop_per_s = random.uniform(cfg.min_decrease_per_s, cfg.max_decrease_per_s)
    tick_dt = 1.0 / cfg.tick_hz

    # Determine when the prompt appears and how long it's valid
    prompt_t0_ratio = random.uniform(*cfg.prompt_window_ratio)
    prompt_start = prompt_t0_ratio * duration
    prompt_len = random.uniform(*cfg.prompt_timeout_ratio) * duration
    prompt_end = prompt_start + prompt_len

    start = time.monotonic()
    last = start
    last_atmos = start - 10.0

    shown_prompt = False
    prompt_consumed = False

    meter = current_meter

    print(f"\n--- Segment {segment_ix} ---")
    print("Type 'pull' when prompted to engage the emergency brake.")

    while True:
        now = time.monotonic()
        elapsed = now - start
        frame_dt = now - last
        last = now

        # decrease with noise
        noise = (random.random() * 2 - 1) * cfg.noise_per_tick * frame_dt
        meter -= max(0.0, base_drop_per_s * frame_dt + noise)

        # render meter line
        sys.stdout.write("\r" + fmt_meter(meter) + "   ")
        sys.stdout.flush()

        # maybe print atmospheric line
        last_atmos = maybe_print_atmos(last_atmos, now)

        # Show prompt
        if not shown_prompt and elapsed >= prompt_start:
            shown_prompt = True
            print("\nACTION: Type 'pull' to activate the emergency brake!")

        # Listen for input only during the prompt window
        if shown_prompt and not prompt_consumed and elapsed <= prompt_end:
            user = readline_with_timeout(timeout_s=0.0)  # non-blocking poll
            if user == PROMPT_WORD:
                prompt_consumed = True
                replenish = max(cfg.min_replenish, min(cfg.success_replenish, 100.0 - meter))
                meter = min(100.0, meter + replenish)
                print(f"\nYou yank the brake! Safety restored by {replenish:.0f}%.")
                return True, meter

        # Crash conditions
        if meter <= 0.0:
            print("\n\n" + random.choice(CRASH_TEXT))
            return False, 0.0

        # Segment naturally ends without input -> treat as fail
        if elapsed >= duration:
            if not prompt_consumed:
                print("\nToo late. The chance slips by.")
            print("\n" + random.choice(CRASH_TEXT))
            return False, max(0.0, meter)

        # regulate tick
        sleep_left = max(0.0, tick_dt - (time.monotonic() - now))
        if sleep_left:
            time.sleep(sleep_left)


def run_game(seed: int | None = None) -> None:
    if seed is not None:
        random.seed(seed)

    cfg = SegmentConfig()
    segment_ix = 1
    meter = 100.0

    print("Trains — Survive the ride.\n")
    print("Instructions:")
    print("- Watch the Safety Meter decline.")
    print("- When prompted, type 'pull' and press Enter before the meter hits 0%.")
    print("- Succeed to move to the next segment; fail and you crash.\n")

    while True:
        success, meter = play_segment(segment_ix, meter, cfg)
        if not success:
            break
        segment_ix += 1
        # increase difficulty slightly
        cfg.min_decrease_per_s *= 1.05
        cfg.max_decrease_per_s *= 1.06
        # shorten prompt window slowly
        a, b = cfg.prompt_timeout_ratio
        cfg.prompt_timeout_ratio = (max(0.08, a * 0.98), max(0.12, b * 0.98))

        print(f"\nYou survive Segment {segment_ix - 1}. Prepare for the next...")
        print("Press Enter to continue, or type 'quit' to exit.")
        resp = readline_with_timeout(120.0)
        if resp == "quit":
            print("Farewell, passenger.")
            return

    # game over / restart
    print("\nGAME OVER.")
    print("Press Enter to restart, or type 'quit' to exit.")
    resp = readline_with_timeout(120.0)
    if resp == "quit":
        print("Goodnight.")
        return
    run_game()


if __name__ == "__main__":
    try:
        run_game()
    except KeyboardInterrupt:
        print("\nYou step off into the night.")