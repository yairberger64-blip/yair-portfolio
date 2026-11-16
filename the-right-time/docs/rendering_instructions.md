# Rendering Instructions

```bash
cd the-right-time/editing
npm ci

# preview interactively (http://localhost:3000)
npx remotion studio src/index.ts

# a single still for QA
npx remotion still src/index.ts OpeningSilent out.png --frame=430

# full picture render (no audio). About 15–20 min on 4 CPU cores with software WebGL
npx remotion render src/index.ts OpeningSilent ../renders/opening_previs_v001_silent.mp4 --codec=h264 --crf=18

# audio (from the-right-time/)
python3 music/compose_opening.py
fluidsynth -ni -g 0.5 -r 48000 -F music/opening_cue_v001.wav /usr/share/sounds/sf2/FluidR3_GM.sf2 music/opening_cue_v001.mid
python3 sound_effects/make_sfx_opening.py

# mux + loudness-normalise to -16 LUFS for web review
ffmpeg -i renders/opening_previs_v001_silent.mp4 -i audio/opening_mix_v001.wav \
  -map 0:v -map 1:a -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k -shortest \
  renders/opening_previs_v001.mp4
```

Alternatively, render the `Opening` composition, which embeds `public/audio/opening_mix_v001.wav` directly (without loudnorm).

`remotion.config.ts` points at the container's Chromium. On another machine, set `REMOTION_BROWSER` or delete that line so Remotion downloads its own browser. On a machine with a GPU, use `--gl=angle` for much faster renders.

Requirements: Node 22, FFmpeg, Python 3 with numpy/scipy/mido, FluidSynth, and fluid-soundfont-gm.
