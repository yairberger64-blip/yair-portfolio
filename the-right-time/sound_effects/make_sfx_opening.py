#!/usr/bin/env python3
"""
Procedural sound effects + final mix for the opening (0:00–0:38).
Every sound is synthesised here from noise/oscillators (no third-party samples),
so the output is an original work owned by the production. No licence obligations.

Inputs : music/opening_cue_v001.wav  (rendered by FluidSynth)
Outputs: sound_effects/opening_sfx_v001.wav   (SFX + ambience stem)
         audio/opening_mix_v001.wav           (music + SFX, -1 dBFS peak)
         editing/public/audio/opening_mix_v001.wav (copy used by Remotion)

Cue times are frame/24 and match the picture EDL in editing/src/Opening.tsx.
"""
import shutil
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
DUR = 38.0
N = int(SR * DUR)
rng = np.random.default_rng(2017)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'bandpass', fs=SR, output='sos'), x)


def lp(x, hi, order=2):
    return sosfilt(butter(order, hi, 'lowpass', fs=SR, output='sos'), x)


def hp(x, lo, order=2):
    return sosfilt(butter(order, lo, 'highpass', fs=SR, output='sos'), x)


def env_ad(n, a, d):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-np.maximum(0, t - a) / max(d, 1e-4))
    return e


def place(buf, sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    sig = sig[: len(buf) - i]
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    buf[i : i + len(sig), 0] += sig * gain * l
    buf[i : i + len(sig), 1] += sig * gain * r


def fade_mask(t0, t1, fin=0.25, fout=0.25):
    t = np.arange(N) / SR
    m = np.clip((t - t0) / fin, 0, 1) * np.clip((t1 - t) / fout, 0, 1)
    return m


def db(x):
    return 10 ** (x / 20)


sfx = np.zeros((N, 2))
F = lambda frame: frame / 24.0

# --- office room tone + distant city (0 → 25.5 s) -------------------------------------
office = fade_mask(0, F(636), 0.5, 1.0)
tone = lp(rng.standard_normal(N), 400) * 0.6 + bp(rng.standard_normal(N), 150, 1200) * 0.25
hvac = lp(rng.standard_normal(N), 120, 4) * 1.5
city = bp(rng.standard_normal(N), 200, 900) * (0.6 + 0.4 * np.sin(np.arange(N) / SR * 0.7))
amb = (tone + hvac + city * 0.5) * office
sfx[:, 0] += amb * db(-34)
sfx[:, 1] += np.roll(amb, 311) * db(-34)


# --- keyboard typing ---------------------------------------------------------------------
def key_click():
    n = int(0.03 * SR)
    s = bp(rng.standard_normal(n), 1800, 6500) * env_ad(n, 0.0008, 0.006)
    s += bp(rng.standard_normal(n), 300, 900) * env_ad(n, 0.001, 0.01) * 0.4
    return s


def typing(t0, t1, gain, pan, rate=0.11):
    t = t0
    while t < t1:
        place(sfx, key_click(), t, gain * rng.uniform(0.6, 1.0), pan)
        t += rate * rng.uniform(0.5, 1.6)
        if rng.random() < 0.06:
            t += rng.uniform(0.2, 0.5)  # thinking pause


typing(0.4, F(132), db(-30), 0.2)  # Yair, heard from the wide
typing(F(132), F(334), db(-20), 0.15)  # Yair close
typing(F(252), F(334), db(-26), 0.0)
typing(0.2, F(576), db(-38), -0.6, 0.14)  # coworkers in the background
typing(0.9, F(576), db(-40), 0.6, 0.15)
# small satisfied 'enter' key ~ f205
n = int(0.06 * SR)
place(sfx, bp(rng.standard_normal(n), 900, 5000) * env_ad(n, 0.001, 0.02), F(204), db(-16), 0.15)


# --- Katelyn's footsteps (252 → 320) -----------------------------------------------------
def footstep(heavy=1.0):
    n = int(0.12 * SR)
    thump = lp(rng.standard_normal(n), 180, 3) * env_ad(n, 0.002, 0.03) * 2.2 * heavy
    click = bp(rng.standard_normal(n), 1500, 5000) * env_ad(n, 0.0005, 0.008) * 0.45
    return thump + click


steps = 7
for i in range(steps):
    p = (i + 0.5) / steps
    # match the eased walk: denser early/late less linear — simple ease approximation
    tt = 252 + 68 * (0.5 - 0.5 * np.cos(np.pi * p))
    place(sfx, footstep(), F(tt), db(-20 + 6 * p), -0.5 + 0.5 * p)

# --- shoulder tap (330) + chair swivel creak (344–372) ----------------------------------
n = int(0.1 * SR)
place(sfx, lp(rng.standard_normal(n), 600) * env_ad(n, 0.003, 0.025) * 1.6, F(330), db(-14), 0.0)
n = int(1.1 * SR)
t = np.arange(n) / SR
creak_f = 520 + 140 * np.sin(2 * np.pi * 1.3 * t) + 60 * rng.standard_normal(n).cumsum() / np.sqrt(n) * 0.0
creak = np.sin(2 * np.pi * np.cumsum(creak_f) / SR) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 38 * t)))
creak = bp(creak, 400, 3000) * env_ad(n, 0.15, 0.5)
roll = lp(rng.standard_normal(n), 250) * env_ad(n, 0.1, 0.6) * 0.8
place(sfx, creak * 0.35 + roll, F(344), db(-24), 0.05)


# --- phone: unlock tap + soft two-note chime (390), screen tap (566) -----------------------
def chime(freqs, dur=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for k, f in enumerate(freqs):
        st = int(k * 0.09 * SR)
        e = env_ad(n - st, 0.004, 0.18)
        s[st:] += np.sin(2 * np.pi * f * t[: n - st]) * e + 0.3 * np.sin(2 * np.pi * 2 * f * t[: n - st]) * e
    return s


place(sfx, chime([1318.5, 1760.0]), F(392), db(-24), -0.2)
n = int(0.04 * SR)
place(sfx, bp(rng.standard_normal(n), 2000, 6000) * env_ad(n, 0.0005, 0.005), F(566), db(-22), -0.2)

# --- transition whoosh (590 → 640) ------------------------------------------------------
n = int(2.2 * SR)
t = np.arange(n) / SR
w = rng.standard_normal(n)
# sweep a bandpass upward by crossfading 6 bands
whoosh = np.zeros(n)
bands = [(200, 500), (400, 900), (700, 1500), (1200, 2600), (2000, 4500), (3500, 8000)]
for k, (lo, hi) in enumerate(bands):
    c = k / (len(bands) - 1)
    weight = np.exp(-((t / t[-1] - c) ** 2) / 0.03)
    whoosh += bp(w, lo, hi) * weight
whoosh *= np.sin(np.pi * t / t[-1]) ** 2
place(sfx, whoosh, F(590), db(-24), 0.0)

# --- apartment: evening ambience (612 → 912) -------------------------------------------
apt = fade_mask(F(612), DUR, 1.0, 1.2)
room = lp(rng.standard_normal(N), 300) * 0.5
night_city = bp(rng.standard_normal(N), 120, 600) * 0.5
cricket_t = np.arange(N) / SR
crickets = np.sin(2 * np.pi * 4300 * cricket_t) * (np.sin(2 * np.pi * 28 * cricket_t) > 0.6) * (np.sin(2 * np.pi * 0.9 * cricket_t) > 0.2) * 0.08
amb2 = (room + night_city + crickets) * apt
sfx[:, 0] += amb2 * db(-33)
sfx[:, 1] += np.roll(amb2, 517) * db(-33)
# a distant car passing outside (~29 s)
n = int(4 * SR)
t = np.arange(n) / SR
car = lp(rng.standard_normal(n), 500) * np.exp(-((t - 2) ** 2) / 0.9)
place(sfx, car, 28.6, db(-34), 0.6)


# --- glasses: small table touches + the clink (852) -------------------------------------
def glass_clink(strength=1.0, dur=1.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    partials = [(2350, 1.0, 0.55), (3410, 0.6, 0.35), (5130, 0.35, 0.22), (6900, 0.2, 0.14), (2390, 0.5, 0.5)]
    s = sum(a * np.sin(2 * np.pi * f * t) * np.exp(-t / d) for f, a, d in partials)
    s += hp(rng.standard_normal(n), 3000) * env_ad(n, 0.0003, 0.004) * 0.8
    return s * strength


place(sfx, glass_clink(1.0), F(852), db(-12), 0.0)
# fabric rustle when leaning to look at the phone (742) and settling (800)
for tt in (742, 800):
    n = int(0.5 * SR)
    place(sfx, bp(rng.standard_normal(n), 800, 4000) * env_ad(n, 0.08, 0.15), F(tt), db(-34), 0.2)

# ---------------------------------------------------------------------------- write + mix
def norm_write(path, x, peak_db=-1.0):
    x = x / (np.max(np.abs(x)) + 1e-9) * db(peak_db)
    wavfile.write(path, SR, (x * 32767).astype(np.int16))


sfx_path = ROOT / 'sound_effects' / 'opening_sfx_v001.wav'
wavfile.write(sfx_path, SR, (np.clip(sfx, -1, 1) * 32767).astype(np.int16))

sr_m, music = wavfile.read(ROOT / 'music' / 'opening_cue_v001.wav')
assert sr_m == SR, f'music sample rate {sr_m} != {SR}'
music = music.astype(np.float64) / 32768.0
if music.ndim == 1:
    music = np.stack([music, music], 1)
music = music[:N]
if len(music) < N:
    music = np.vstack([music, np.zeros((N - len(music), 2))])
music_peak = np.max(np.abs(music)) + 1e-9
music = music / music_peak * db(-4)  # music bed level
# gentle final fade on everything
t = np.arange(N) / SR
master_fade = np.clip((DUR - t) / 1.2, 0, 1)[:, None]
mix = (music * 0.85 + sfx) * master_fade
mix_path = ROOT / 'audio' / 'opening_mix_v001.wav'
norm_write(mix_path, mix, -1.0)
dst = ROOT / 'editing' / 'public' / 'audio' / 'opening_mix_v001.wav'
dst.parent.mkdir(parents=True, exist_ok=True)
shutil.copy(mix_path, dst)
print('wrote', sfx_path, mix_path, dst)
