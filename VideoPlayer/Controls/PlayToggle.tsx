import React from 'react';
import { ControlComponent } from '../Player';
import { ControlButton } from './ControlButton';

const PauseIcon = require('../../assets/pause.svg');
const PlayIcon = require('../../assets/play.svg');

export const PlayToggle: ControlComponent<'isPlaying' | 'togglePlay'> = ({
  controlProps,
}) => (
  <ControlButton onClick={controlProps?.togglePlay || undefined}>
    {controlProps?.isPlaying ? <img src={PauseIcon} alt={'Pause'}/> : <img src={PlayIcon} alt={'Play'}/>}
  </ControlButton>
);
