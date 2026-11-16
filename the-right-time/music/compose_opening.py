#!/usr/bin/env python3
"""
THE RIGHT TIME — opening cue (0:00–0:38), original composition.

Writes music/opening_cue_v001.mid. Render with FluidSynth + FluidR3_GM (MIT licence):
  fluidsynth -ni -g 0.5 -r 48000 -F music/opening_cue_v001.wav /usr/share/sounds/sf2/FluidR3_GM.sf2 music/opening_cue_v001.mid

Musical themes
  "Matchmaker" (Katelyn's theme): bouncy rising arpeggio G-C-E-G, answered by a falling line.
  It returns in later chapters every time Katelyn tries again, then finally resolves in Ch.4.
  In the apartment the same motif is slowed and voiced on piano: the seed of the love theme.

Cue points are in seconds and match the picture EDL (frame / 24).
"""
import mido
from pathlib import Path

OUT = Path(__file__).with_name('opening_cue_v001.mid')
TPS = 960  # ticks per second at 120 bpm, 480 tpb

CH = dict(piano=0, pizz=1, clar=2, flute=3, glock=4, harp=5, strings=6, bassoon=7, celesta=8, drums=9, vibes=10, pad=11, cello=12)
PROGRAM = dict(piano=0, pizz=45, clar=71, flute=73, glock=9, harp=46, strings=48, bassoon=70, celesta=8, vibes=11, pad=49, cello=42)

events = []  # (time_sec, order, mido.Message)


def note(inst, t, dur, pitch, vel=80):
    ch = CH[inst]
    events.append((t, 1, mido.Message('note_on', channel=ch, note=pitch, velocity=vel)))
    events.append((t + dur, 0, mido.Message('note_off', channel=ch, note=pitch, velocity=0)))


def cc(inst, t, control, value):
    events.append((t, 0, mido.Message('control_change', channel=CH[inst], control=control, value=int(max(0, min(127, value))))))


def ramp(inst, t0, t1, v0, v1, control=11, steps=24):
    for i in range(steps + 1):
        k = i / steps
        cc(inst, t0 + (t1 - t0) * k, control, v0 + (v1 - v0) * k)


def seq(inst, t0, beat, notes, vel=80, legato=0.9):
    """notes: list of (pitch or None, beats). returns end time."""
    t = t0
    for p, b in notes:
        if p is not None:
            note(inst, t, b * beat * legato, p, vel)
        t += b * beat
    return t


def chord(inst, t, dur, pitches, vel=60):
    for p in pitches:
        note(inst, t, dur, p, vel)


N = {n: i for i, n in enumerate(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])}


def P(name):
    """'C4' -> 60"""
    pc, octv = name[:-1], int(name[-1])
    return 12 * (octv + 1) + N[pc]


# ---------------------------------------------------------------- setup
for inst, prog in PROGRAM.items():
    events.append((0, -1, mido.Message('program_change', channel=CH[inst], program=prog)))
    cc(inst, 0, 7, 100)
    cc(inst, 0, 11, 110)
    cc(inst, 0, 91, 55)  # reverb send
cc('pad', 0, 11, 0)
cc('strings', 0, 11, 70)

B = 0.6  # 100 bpm in the office

# ---------------------------------------------------------------- A. office, 0.0–19.25
# pizzicato chord bed (C Am F G | C Am F G | ...)
prog_office = [['C3', 'G3', 'E4'], ['A2', 'E3', 'C4'], ['F2', 'C3', 'A3'], ['G2', 'D3', 'B3']]
t = 0.3
bar = 0
while t < 10.4:
    ch = prog_office[bar % 4]
    for beat in range(4):
        tb = t + beat * B
        if tb > 10.4:
            break
        if beat in (0, 2):
            note('pizz', tb, 0.25, P(ch[0]), 70)
        else:
            chord('pizz', tb, 0.2, [P(ch[1]), P(ch[2])], 52)
    t += 4 * B
    bar += 1

# glockenspiel states the Matchmaker motif (intro)
M = [('G4', .5), ('C5', .5), ('E5', .5), ('G5', .5), ('E5', 1), ('C5', .5), ('D5', .5)]
Nans = [('E5', .5), ('D5', .5), ('C5', .5), ('A4', .5), ('G4', 1.5), (None, .5)]
toP = lambda xs: [(P(p) if p else None, b) for p, b in xs]
seq('glock', 0.9, B, toP(M), 62)
seq('glock', 0.9 + 4 * B, B, toP(Nans), 58)

# clarinet: phrase 2 & 3 while Yair works (5.5–10.4)
ph2 = [('F5', .5), ('E5', .5), ('D5', .5), ('C5', .5), ('D5', 1), ('G4', 1)]
ph3 = [('G4', .5), ('C5', .5), ('E5', .5), ('G5', .5), ('A5', 1), ('G5', .5), ('E5', .5)]
t = seq('clar', 5.7, B, [(p - 12 if p else None, b) for p, b in toP(ph2)], 72)
seq('clar', t, B, [(p - 12 if p else None, b) for p, b in toP(ph3)], 74)

# Katelyn's tiptoe walk (10.5–13.65): bassoon staccato + pizz
walk = ['C3', 'G3', 'E3', 'G3', 'F3', 'C4', 'A3', 'C4', 'G3', 'D4', 'B3']
for i, p in enumerate(walk):
    tb = 10.5 + i * 0.3
    note('bassoon', tb, 0.14, P(p), 78)
    if i % 2 == 0:
        note('pizz', tb, 0.15, P(p) - 12, 60)
note('clar', 12.3, 0.25, P('G5') - 12, 60)  # little grace on the approach
note('clar', 12.6, 0.4, P('B4') - 12 + 12, 55)

# shoulder tap 13.75: woodblock + rest
events.append((13.75, 1, mido.Message('note_on', channel=9, note=76, velocity=95)))
events.append((13.85, 0, mido.Message('note_off', channel=9, note=76, velocity=0)))

# swivel 14.3–15.25: harp gliss C4 → C6
scale_c = [0, 2, 4, 5, 7, 9, 11]
gl = [60 + 12 * (i // 7) + scale_c[i % 7] for i in range(15)]
for i, p in enumerate(gl):
    note('harp', 14.3 + i * 0.062, 0.9, p, 58 + i)

# the pitch 15.5–19.5: full theme, flute + clarinet thirds, glock sparkle on the heart
t0 = 15.6
seq('flute', t0, B, toP(M), 82)
seq('clar', t0, B, [(p - 4 if p else None, b) for p, b in toP(M)], 64)
ans_short = [('E5', .5), ('D5', .5), ('C5', .5), ('A4', .5), ('G4', 1.0)]
seq('flute', t0 + 4 * B, B, toP(ans_short), 76)
for i, ch in enumerate(prog_office + [['C3', 'G3', 'E4']]):
    tb = t0 + i * 2 * B
    if tb > 19.4:
        break
    note('pizz', tb, 0.25, P(ch[0]), 72)
    chord('pizz', tb + B, 0.2, [P(ch[1]), P(ch[2])], 55)
for i, p in enumerate(['E6', 'G6', 'C7']):
    note('glock', 16.55 + i * 0.09, 0.5, P(p), 60)
events.append((16.55, 1, mido.Message('note_on', channel=9, note=81, velocity=55)))  # triangle
events.append((17.5, 0, mido.Message('note_off', channel=9, note=81, velocity=0)))

# ---------------------------------------------------------------- B. distraction 19.25–22.5
chord('strings', 19.3, 1.1, [P('C4'), P('E4'), P('G4')], 45)
# dreamy Fmaj7 harp + vibes; strings pad swells
fmaj7 = ['F3', 'A3', 'C4', 'E4', 'A4', 'C5', 'E5']
for i, p in enumerate(fmaj7):
    note('harp', 20.25 + i * 0.13, 1.6, P(p), 55)
chord('vibes', 20.3, 1.2, [P('A4'), P('C5'), P('E5')], 50)
chord('vibes', 21.5, 1.0, [P('G4'), P('B4'), P('D5')], 46)
cc('pad', 20.2, 11, 0)
chord('pad', 20.25, 1.3, [P('F3'), P('C4'), P('E4'), P('A4')], 70)
chord('pad', 21.5, 1.2, [P('E3'), P('B3'), P('D4'), P('G4')], 66)
ramp('pad', 20.25, 21.0, 0, 85)
ramp('pad', 22.0, 22.7, 85, 0)
for i, p in enumerate(['E6', 'B5', 'G6']):  # celesta twinkle on the coffee-corner shot
    note('celesta', 21.55 + i * 0.16, 0.5, P(p), 50)

# ---------------------------------------------------------------- C. deadpan 23.0–24.0
note('bassoon', 23.05, 0.32, P('Ab2'), 85)
note('bassoon', 23.42, 0.55, P('G2'), 80)
note('pizz', 23.85, 0.2, P('C3'), 60)

# ---------------------------------------------------------------- D. transition 24.0–26.5 → F major
scale_f = [0, 2, 4, 5, 7, 9, 10]
gl = [53 + 12 * (i // 7) + scale_f[i % 7] for i in range(22)]
for i, p in enumerate(gl):
    note('harp', 24.05 + i * 0.045, 1.2, p, 50 + i)
cc('pad', 24.2, 11, 0)
chord('pad', 24.25, 2.6, [P('F2'), P('C3'), P('A3'), P('F4')], 75)
ramp('pad', 24.25, 26.3, 0, 100)
ramp('pad', 26.3, 27.4, 100, 55)
seq('celesta', 25.0, 0.42, [(P('C6'), .5), (P('F6'), .5), (P('A6'), .5), (P('C7'), 1.5)], 52)

# ---------------------------------------------------------------- E. apartment 26.5–38.0, F major, 80 bpm
BA = 0.75
cc('strings', 26.4, 11, 0)
apt_chords = [
    (26.5, 3.0, ['F2', 'C3', 'A3', 'C4']),
    (29.5, 3.0, ['D2', 'A2', 'F3', 'A3']),
    (32.5, 1.5, ['Bb1', 'F2', 'D3', 'F3']),
    (34.0, 1.5, ['C2', 'G2', 'E3', 'G3']),
    (35.5, 2.5, ['F2', 'C3', 'A3', 'C4']),
]
for t0, dur, ch in apt_chords:
    # piano arpeggio, eighths
    pat = [ch[0], ch[1], ch[2], ch[3], ch[2], ch[1]]
    n = int(dur / (BA / 2))
    for i in range(n):
        note('piano', t0 + i * BA / 2, BA * 0.9, P(pat[i % len(pat)]), 52 if i % 2 else 60)
    chord('strings', t0, dur + 0.1, [P(p) + 12 for p in ch[1:]], 52)
ramp('strings', 26.5, 28.5, 0, 80)
ramp('strings', 36.0, 38.0, 80, 0)
# melody: the Matchmaker motif, slowed and tender (piano RH)
mel = [('C5', .5), ('F5', .5), ('A5', 1), ('G5', .5), ('F5', .5),
       ('E5', .5), ('F5', .5), ('D5', 1.5), (None, .5),
       ('D5', .5), ('F5', .5), ('Bb5', 1), ('A5', .5), ('G5', 1.5)]
seq('piano', 27.25, BA, toP(mel), 70, legato=1.0)
# the clink 35.5: resolution + celesta
note('piano', 35.5, 2.4, P('A5'), 66)
note('piano', 35.5, 2.4, P('F5'), 58)
for i, p in enumerate(['C7', 'A6', 'F6']):
    note('celesta', 35.52 + i * 0.12, 0.8, P(p), 48)
ramp('piano', 36.6, 38.0, 110, 0)
ramp('celesta', 36.6, 38.0, 110, 0)

# ---------------------------------------------------------------- write
events.sort(key=lambda e: (e[0], e[1]))
mid = mido.MidiFile(ticks_per_beat=480)
tr = mido.MidiTrack()
mid.tracks.append(tr)
tr.append(mido.MetaMessage('set_tempo', tempo=500000, time=0))
last = 0
for t, _, msg in events:
    tick = int(round(max(0, t) * TPS))
    msg.time = tick - last
    last = tick
    tr.append(msg)
tr.append(mido.MetaMessage('end_of_track', time=TPS))
mid.save(OUT)
print('wrote', OUT, 'events', len(events))
