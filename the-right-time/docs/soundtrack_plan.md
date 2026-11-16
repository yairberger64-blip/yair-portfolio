# Soundtrack Plan

All music is **original** and composed in code (`music/compose_*.py`), rendered with FluidSynth and the FluidR3_GM soundfont (MIT licence; rendered audio carries no obligations). All SFX are **synthesised** (`sound_effects/make_sfx_*.py`), with no third-party samples. **No dialogue or intelligible speech** anywhere. Laughter is shown visually; a synthetic laugh would sound uncanny, so it is deferred to a licensed or recorded nonverbal-laughter pass if you want one.

## Themes
1. **Katelyn's theme ("Matchmaker")**: G–C–E–G rising arpeggio, answered by a falling E–D–C–A–G. Bouncy, pizzicato, woodwinds. It returns at every introduction attempt in Ch.2 and gets more exasperated each time.
2. **Love theme**: the same motif slowed to 80 bpm in F major on piano. It is seeded in Ch.1 (apartment), heard as a fragment in Ch.4, developed on piano and strings in Ch.5, and given full orchestra in Ch.6.
3. **Distance motif (Ch.3)**: solo cello, open fifths, unresolved.
4. **Finale (Ch.7)**: themes 1 and 2 in counterpoint, rising into a sunrise chord.

## Opening cue (built)
Cue map: see `shot_list.md`. Files:
- `music/opening_cue_v001.mid`, `.wav`
- `sound_effects/opening_sfx_v001.wav`
- `audio/opening_mix_v001.wav` (music + SFX)

## Quality upgrade path
GM-soundfont orchestration is fine for previs, but final picture deserves better. The MIDI files drop straight into a DAW with orchestral libraries, or a composer can use them as a mock-up. The cue timing is already locked to picture.
