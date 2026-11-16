# Production Pipeline — environment audit and recommendation

## 1. What this environment has (audited 2026-11-16)

| Capability | Status | Notes |
|---|---|---|
| FFmpeg / ffprobe | ✅ installed | encode, mux, loudness, spectrograms |
| Node 22 + Remotion 4.0.544 | ✅ installed in `editing/` | edit, timing, compositing, final render |
| Three.js 0.187 + @react-three/fiber 9.8.2 | ✅ installed | real-time 3D for previs/layout |
| Chromium (headless) + SwiftShader WebGL | ✅ local | Remotion renders 3D with no GPU (`--gl=swangle`) |
| FluidSynth 2.3.4 + FluidR3_GM soundfont (MIT) | ✅ installed via apt | original score rendering |
| Python 3.13 + numpy/scipy/mido | ✅ | procedural SFX, MIDI composition, mixing |
| Blender | ❌ | no `bpy` wheel for Python 3.13 here; not needed for previs |
| GPU | ❌ | 4 CPU cores, 15 GB RAM; the full 38 s previs renders in about 15–20 min |
| **AI video APIs** (fal, Replicate, Runway, Luma, OpenAI) | ❌ **blocked** | network policy refuses the connection (HTTP 000); no API keys present |
| AI image APIs | ❌ blocked / no keys | same |
| Google APIs host | ⚠️ reachable | Vertex AI (Veo/Imagen) would need a funded GCP project and your approval |
| Reference photos | ⚠️ 1 of 4+ | only `public/yair.jpg` (portfolio headshot, date unknown) |

## 2. Recommended architecture: hybrid, in two stages

**Stage A — Previs (done for the opening, $0).**
Programmatic 3D in Three.js, rendered by Remotion. It locks story, timing, staging, camera, edit and score before any money is spent. Every shot is code, so any change is a re-render rather than a reshoot. Output: `renders/opening_previs_v001.mp4`.

**Stage B — Final animation (needs your approval and two inputs).**
1. **Character likeness.** Generate a stylised 3D-feature character sheet per character from your reference photos (image model with identity reference). Lock one "hero" frame per character and age.
2. **Keyframes.** For each shot, render the previs frame as a *layout guide* and generate a styled keyframe from it plus the character refs. This keeps camera and blocking identical to the approved previs.
3. **Motion.** Image-to-video (Kling 3.0 / Veo 3.1 / Runway Gen-4.x class) from each keyframe, 5–10 s clips, prompted with the shot-list action. Generate 3–4 takes per shot and pick the best.
4. **Assembly stays in Remotion.** Generated clips replace previs shots one-for-one in the same EDL (`editing/src/Opening.tsx`). Captions, transitions, score and SFX are reused unchanged.
5. **QA** against `reviews/qa_checklist.md`. Regenerate any shot that fails identity, hands, continuity or dialogue checks.

Why hybrid: AI video alone drifts in character identity and camera continuity across 60+ shots. The previs gives every generation a fixed layout and timing target, and the edit never depends on a single model's output.

## 3. Cost estimate for Stage B (requires approval; **not spent**)

Pricing is volatile and the public figures disagree. Verify on vendor pages before approving. Figures below are from Nov 2026 web sources; Kling's is from its own developer pricing as reported, and the others are third-party comparisons.

| Model (example) | ≈ $/generated second (1080p, no audio) |
|---|---|
| Kling 3.0 | $0.08–0.11 |
| Runway Gen-4 Turbo / Gen-4.5 | $0.05 / $0.12–0.20 |
| Veo 3.1 (full) | about $0.20 (more with audio) |
| Veo 3.1 Fast / Lite | about $0.03–0.10 |

**Volume:**
- Final film ≈ 330 s.
- At 3–4 takes per shot, ≈ 1,000–1,300 generated seconds.
- Opening proof alone: 38 s × 4 takes ≈ 150 s.

| Scope | Low (≈$0.08/s) | High (≈$0.20/s) |
|---|---|---|
| Opening 38 s, final quality | ~$12 | ~$30 |
| Full film, 5.5 min | ~$80–105 | ~$200–260 |
| + character sheets & keyframes (image gen, ~400 images × $0.03–0.08) | +$12–32 | +$12–32 |

These are generation costs only. Iteration beyond 4 takes, upscaling, or a paid music library would add to them. The score here is original, so it costs $0.

## 4. Smallest set of user actions to unlock Stage B

1. **Reference photos** in `references/` for Sharone, Katelyn and Mia, plus more of Yair. Ideally clear front, ¾ and smiling shots, with dates if known (2017–2020 vs. now). **Get Katelyn's consent** to be depicted.
2. **Pick one provider and add its API key** as an environment secret (e.g. `FAL_KEY` or `RUNWAY_API_KEY`).
3. **Allow that provider's host** in the environment's network policy (currently blocked).
4. **Approve a budget**, e.g. "≤ $30 for the opening at final quality."

Alternative with no network changes: run Stage B on your own machine, since the repo is portable (see `rendering_instructions.md`).
