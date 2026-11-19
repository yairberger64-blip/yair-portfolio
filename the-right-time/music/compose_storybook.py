#!/usr/bin/env python3
"""
THE RIGHT TIME — storybook cut score (2:17), original composition.
Cue points (s) [v002: takeoff removed, title over airport at 122, ends 132] match editing/src/Storybook.tsx frame starts:
  f1 0 · f2 7 · f3 15 · f4 22 · f5 31 · f6 38 · f7 44 · f8 51 · f9 58 · f10 64 · f11 73
  f12 81 · f13 90 · f14 98 · f15 107 · f16 114 · f17 122 · title 129–137
Themes: "Matchmaker" (Katelyn) G-C-E-G / E-D-C-A-G, and the love theme = the same motif slowed.
Render: fluidsynth -ni -g 0.5 -r 48000 -F music/storybook_cue_v001.wav /usr/share/sounds/sf2/FluidR3_GM.sf2 music/storybook_cue_v001.mid
"""
from pathlib import Path
import mido

OUT = Path(__file__).with_name('storybook_cue_v001.mid')
TPS = 960
CH = dict(piano=0, pizz=1, clar=2, flute=3, glock=4, harp=5, strings=6, bassoon=7, celesta=8, horn=10, pad=11, cello=12, oboe=13)
PROG = dict(piano=0, pizz=45, clar=71, flute=73, glock=9, harp=46, strings=48, bassoon=70, celesta=8, horn=60, pad=49, cello=42, oboe=68)
EV = []
NM = {n: i for i, n in enumerate(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])}


def P(s):
    return 12 * (int(s[-1]) + 1) + NM[s[:-1]]


def note(i, t, d, p, v=80):
    EV.append((t, 1, mido.Message('note_on', channel=CH[i], note=p, velocity=int(v))))
    EV.append((t + d, 0, mido.Message('note_off', channel=CH[i], note=p, velocity=0)))


def cc(i, t, c, v):
    EV.append((t, 0, mido.Message('control_change', channel=CH[i], control=c, value=int(max(0, min(127, v))))))


def ramp(i, t0, t1, v0, v1, steps=24):
    for k in range(steps + 1):
        cc(i, t0 + (t1 - t0) * k / steps, 11, v0 + (v1 - v0) * k / steps)


def seq(i, t, beat, notes, v=80, leg=0.92, tr=0):
    for p, b in notes:
        if p:
            note(i, t, b * beat * leg, P(p) + tr, v)
        t += b * beat
    return t


def chord(i, t, d, ps, v=60, tr=0):
    for p in ps:
        note(i, t, d, P(p) + tr, v)


def arp(i, t0, dur, ps, step, v=55, tr=0):
    n = int(dur / step)
    pat = ps + ps[-2:0:-1]
    for k in range(n):
        note(i, t0 + k * step, step * 1.6, P(pat[k % len(pat)]) + tr, v - (6 if k % 2 else 0))


for i, pr in PROG.items():
    EV.append((0, -1, mido.Message('program_change', channel=CH[i], program=pr)))
    cc(i, 0, 7, 100)
    cc(i, 0, 11, 110)
    cc(i, 0, 91, 60)
cc('pad', 0, 11, 0)
cc('strings', 0, 11, 0)

M = [('G4', .5), ('C5', .5), ('E5', .5), ('G5', .5), ('E5', 1), ('C5', .5), ('D5', .5)]
A = [('E5', .5), ('D5', .5), ('C5', .5), ('A4', .5), ('G4', 1.5), (None, .5)]
M2 = [('G4', .5), ('C5', .5), ('E5', .5), ('G5', .5), ('A5', 1), ('G5', .5), ('E5', .5)]
A2 = [('D5', .5), ('E5', .5), ('C5', 1.5), (None, .5)]
down = lambda xs, k=12: [(p[:-1] + str(int(p[-1]) - k // 12)) if p else None for p, _ in xs]
B = 0.6
OFFICE = [['C3', 'G3', 'E4'], ['A2', 'E3', 'C4'], ['F2', 'C3', 'A3'], ['G2', 'D3', 'B3']]


def pizz_bed(t0, t1, prog=OFFICE, tr=0, v=66):
    t, k = t0, 0
    while t < t1 - 0.1:
        ch = prog[k % len(prog)]
        for beat in range(4):
            tb = t + beat * B
            if tb >= t1:
                break
            if beat % 2 == 0:
                note('pizz', tb, 0.25, P(ch[0]) + tr, v)
            else:
                chord('pizz', tb, 0.2, ch[1:], v - 16, tr)
        t += 4 * B
        k += 1


# ---- A. 0–31 office + apartment (C major, 100 bpm)
pizz_bed(0.3, 15.0)
seq('glock', 0.9, B, M, 60)
seq('glock', 0.9 + 4 * B, B, A, 56)
t = seq('flute', 7.3, B, M, 80)
seq('clar', 7.3, B, [(p, b) for p, b in M], 60, tr=-16)
t = seq('flute', t, B, A2 + [(None, 0)], 76)
# 15–22 wandering eyes: dreamy harp + pad, then the deadpan "bwomp"
for k, p in enumerate(['F3', 'A3', 'C4', 'E4', 'A4', 'C5', 'E5']):
    note('harp', 15.4 + k * 0.14, 1.8, P(p), 54)
chord('pad', 15.4, 3.2, ['F3', 'C4', 'E4', 'A4'], 70)
ramp('pad', 15.4, 16.4, 0, 85)
ramp('pad', 18.2, 19.0, 85, 0)
for k, p in enumerate(['E6', 'B5', 'G6']):
    note('celesta', 16.8 + k * 0.17, 0.5, P(p), 48)
note('bassoon', 19.6, 0.32, P('Ab2'), 85)
note('bassoon', 19.98, 0.6, P('G2'), 80)
note('pizz', 20.9, 0.2, P('C3'), 58)
# 22–31 apartment, warmer: piano states theme over pizz, F major colour
pizz_bed(22.0, 31.0, [['F2', 'C3', 'A3'], ['D2', 'A2', 'F3'], ['Bb1', 'F2', 'D3'], ['C2', 'G2', 'E3']], v=58)
t = seq('piano', 22.3, B, M, 66, tr=5)
seq('piano', t, B, A, 62, tr=5)
chord('strings', 22.0, 9.0, ['F3', 'A3', 'C4'], 50)
ramp('strings', 22.0, 24.0, 0, 60)
ramp('strings', 29.5, 31.0, 60, 0)

# ---- B. 31–44 bad-timing montage (D major, lighter, ticking)
pizz_bed(31.0, 44.0, OFFICE, tr=2, v=62)
for k in range(int(13 / 0.3)):
    tb = 31.0 + k * 0.3
    EV.append((tb, 1, mido.Message('note_on', channel=9, note=70, velocity=38 if k % 2 else 52)))  # maracas tick
    EV.append((tb + 0.05, 0, mido.Message('note_off', channel=9, note=70, velocity=0)))
t = seq('clar', 31.3, B, M, 70, tr=2)
t = seq('clar', t, B, A, 66, tr=2)
t = seq('flute', 37.9, B, M2, 74, tr=2)
seq('flute', t, B, A2, 70, tr=2)
for k, p in enumerate([P('D6'), P('F#6') if False else P('Gb6'), P('A6')]):
    note('glock', 31.2 + k * 0.1, 0.5, p, 50)

# ---- C. 44–58 the hard years (A minor, slow, sparse)
ramp('strings', 44.0, 46.0, 0, 55)
for t0, ch in [(44.0, ['A2', 'E3', 'C4']), (47.5, ['F2', 'C3', 'A3']), (51.0, ['D2', 'A2', 'F3']), (54.5, ['E2', 'B2', 'G#3' if False else 'Ab3'])]:
    chord('strings', t0, 3.6, ch, 48)
    note('piano', t0 + 0.2, 3.0, P(ch[0]) + 12, 40)
seq('cello', 44.6, 1.0, [('E3', 1.5), ('C3', 1), ('D3', 1.5), ('A2', 2.5), (None, .5), ('C3', 1.5), ('B2', 1), ('A2', 3)], 64, leg=0.98)
seq('piano', 52.0, 1.0, [('E5', 1), ('C5', 1), ('D5', 2), ('B4', 2)], 42)
ramp('strings', 56.5, 58.0, 55, 0)

# ---- D. 58–64 Katelyn is back (bouncy matchmaker)
pizz_bed(58.0, 63.4, OFFICE, v=70)
t = seq('bassoon', 58.2, B, [(p, b) for p, b in M], 76, leg=0.5, tr=-24)
seq('flute', 58.2, B, M, 78)
seq('flute', 58.2 + 4 * B, B, [('E5', .5), ('D5', .5), ('C5', .5), ('A4', .5)], 74)
for k in range(20):  # harp gliss up into F major
    sc = [0, 2, 4, 5, 7, 9, 10]
    note('harp', 62.7 + k * 0.05, 1.4, 53 + 12 * (k // 7) + sc[k % 7], 50 + k)

# ---- E. 64–81 finally meeting + slowly becoming us (F major, 80 bpm)
BA = 0.75
E_CH = [(64.0, ['F2', 'C3', 'A3', 'C4']), (67.0, ['D2', 'A2', 'F3', 'A3']), (70.0, ['Bb1', 'F2', 'D3', 'F3']), (73.0, ['C2', 'G2', 'E3', 'G3']),
        (76.0, ['F2', 'C3', 'A3', 'C4']), (79.0, ['C2', 'G2', 'E3', 'Bb3'])]
for t0, ch in E_CH:
    arp('piano', t0, 3.0, ch, BA / 2, 54)
chord('pad', 64.0, 17.0, ['F3', 'C4', 'A4'], 60)
ramp('pad', 64.0, 66.0, 0, 70)
ramp('pad', 79.5, 81.0, 70, 0)
LOVE = [('C5', .5), ('F5', .5), ('A5', 1), ('G5', .5), ('F5', .5), ('E5', .5), ('F5', .5), ('D5', 1.5), (None, .5)]
LOVE2 = [('D5', .5), ('F5', .5), ('Bb5', 1), ('A5', .5), ('G5', 1.5), (None, 1)]
t = seq('piano', 65.5, BA, [('C5', 1), ('F5', 1), ('A5', 2)], 60)  # first hesitant fragment at the door
t = seq('oboe', 73.2, BA, LOVE, 66, leg=1.0)
seq('oboe', t, BA, LOVE2, 64, leg=1.0)

# ---- F. 81–90 July 2021 (solo piano, a held breath, then warmth)
seq('piano', 81.3, 0.9, [('A4', 1), ('C5', 1), ('F5', 2)], 52)
chord('piano', 81.3, 3.4, ['F2', 'C3', 'A3'], 40)
# silence 85–86.2 for the moment
chord('piano', 86.2, 3.6, ['Bb2', 'F3', 'D4'], 46)
seq('piano', 86.4, 0.9, [('D5', 1), ('C5', 1), ('A5', 2)], 58)
chord('strings', 86.2, 3.8, ['D4', 'F4', 'Bb4'], 50)
ramp('strings', 86.2, 89.5, 0, 75)

# ---- G. 90–129 a lifetime together → next chapter (full theme)
G_CH = [(90, ['F2', 'C3', 'A3', 'C4']), (93, ['D2', 'A2', 'F3', 'A3']), (96, ['Bb1', 'F2', 'D3', 'F3']), (98, ['C2', 'G2', 'E3', 'G3']),
        (101, ['F2', 'C3', 'A3', 'C4']), (104, ['A1', 'E2', 'C#3' if False else 'Db3', 'A3'])]
for t0, ch in G_CH:
    arp('piano', t0, 3.0 if t0 != 96 else 2.0, ch, BA / 2, 56)
    chord('strings', t0, 3.0 if t0 != 96 else 2.0, [p for p in ch[1:]], 56, tr=12)
ramp('strings', 89.5, 92.0, 75, 95)
t = seq('strings', 90.2, BA, LOVE, 78, leg=1.0, tr=0)
seq('horn', 90.2, BA, LOVE, 58, leg=1.0, tr=-12)
t = seq('strings', 98.0, BA, LOVE2, 80, leg=1.0)
note('celesta', 98.0, 1.2, P('F6'), 50)  # Mia
note('celesta', 98.3, 1.2, P('A6'), 46)
note('celesta', 98.6, 1.5, P('C7'), 44)
# 107–114 packing: lighter, playful theme returns in D (pizz + clarinet) — the family version of Katelyn's tune
pizz_bed(107.0, 114.0, OFFICE, tr=2, v=60)
t = seq('clar', 107.3, B, M, 68, tr=2)
seq('clar', t, B, [('E5', .5), ('D5', .5), ('C5', 1.0)], 64, tr=2)
ramp('strings', 106.0, 107.2, 95, 40)
chord('strings', 107.0, 7.0, ['D4', 'Gb4', 'A4'], 44)
# 114–129 airport → takeoff: big final statement in G major, climax at 122
ramp('strings', 113.5, 116.0, 40, 105)
for t0, ch in [(114, ['G2', 'D3', 'B3', 'D4']), (117, ['E2', 'B2', 'G3', 'B3']), (120, ['C2', 'G2', 'E3', 'G3']), (122, ['D2', 'A2', 'Gb3', 'A3']), (125, ['G2', 'D3', 'B3', 'D4'])]:
    arp('piano', t0, 3.0 if t0 not in (120,) else 2.0, ch, BA / 2, 60)
    chord('strings', t0, 3.0 if t0 != 120 else 2.0, ch[1:], 64, tr=12)
    chord('horn', t0, 3.0 if t0 != 120 else 2.0, ch[1:3], 54)
LOVE_G = [(p, b) for p, b in LOVE]
t = seq('strings', 114.2, BA, LOVE_G, 84, leg=1.0, tr=2)
seq('flute', 114.2, BA, LOVE_G, 62, leg=1.0, tr=14)
t = seq('strings', 122.0, BA, [('E5', .5), ('G5', .5), ('C6', 1), ('B5', .5), ('A5', 1.5), ('G5', 2)], 92, leg=1.0, tr=2)
for k in range(22):
    sc = [0, 2, 4, 5, 7, 9, 11]
    note('harp', 121.8 + k * 0.045, 1.5, 55 + 12 * (k // 7) + sc[k % 7], 52 + k)

# ---- H. 126–132 title over the airport: final chord + the matchmaker motif one last time on celesta
chord('strings', 126.0, 6.0, ['G3', 'B3', 'D4', 'G4'], 70)
chord('horn', 126.0, 5.5, ['G2', 'D3'], 50)
chord('piano', 126.0, 5.5, ['G2', 'D3', 'B3', 'G4'], 58)
seq('celesta', 126.8, 0.5, [('G5', .5), ('C6', .5), ('E6', .5), ('G6', 2)], 52)
ramp('strings', 128.5, 132.0, 105, 0)
ramp('piano', 128.5, 132.0, 110, 0)
ramp('horn', 128.5, 132.0, 110, 0)

EV.sort(key=lambda e: (e[0], e[1]))
mid = mido.MidiFile(ticks_per_beat=480)
tr = mido.MidiTrack()
mid.tracks.append(tr)
tr.append(mido.MetaMessage('set_tempo', tempo=500000, time=0))
last = 0
for t, _, m in EV:
    tick = int(round(max(0, t) * TPS))
    m.time = tick - last
    last = tick
    tr.append(m)
tr.append(mido.MetaMessage('end_of_track', time=TPS))
mid.save(OUT)
print('wrote', OUT, len(EV))
