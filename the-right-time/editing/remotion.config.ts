import {Config} from '@remotion/cli/config';

// Use the Chromium that ships in this environment instead of downloading one.
// Override with REMOTION_BROWSER=/path/to/chrome when rendering elsewhere.
Config.setBrowserExecutable(
  process.env.REMOTION_BROWSER ??
    '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',
);
Config.setChromiumOpenGlRenderer('swangle'); // software WebGL, no GPU needed
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(4);
