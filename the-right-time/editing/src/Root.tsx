import React from 'react';
import {Composition} from 'remotion';
import {Opening, OPENING_FRAMES} from './Opening';
import {TestOffice, TestLineup} from './shots/TestStill';
import {Storybook, STORYBOOK_FRAMES} from './Storybook';

export const Root: React.FC = () => (
  <>
    <Composition id="Opening" component={Opening} durationInFrames={OPENING_FRAMES} fps={24} width={1920} height={1080} defaultProps={{withAudio: true}} />
    <Composition id="OpeningSilent" component={Opening} durationInFrames={OPENING_FRAMES} fps={24} width={1920} height={1080} defaultProps={{withAudio: false}} />
    <Composition id="Storybook" component={Storybook} durationInFrames={STORYBOOK_FRAMES} fps={24} width={1920} height={1080} defaultProps={{withAudio: true}} />
    <Composition id="StorybookSilent" component={Storybook} durationInFrames={STORYBOOK_FRAMES} fps={24} width={1920} height={1080} defaultProps={{withAudio: false}} />
    <Composition id="TestOffice" component={TestOffice} durationInFrames={1} fps={24} width={1920} height={1080} />
    <Composition id="TestLineup" component={TestLineup} durationInFrames={1} fps={24} width={1920} height={1080} />
  </>
);
