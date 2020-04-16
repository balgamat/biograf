import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Knob } from './Volume/VolumeBar';

export const ControlButton = styled(motion.div)`
  :hover {
    background-color: ${({ theme }) =>
      theme?.biograf?.ControlsBackgroundOnHover || '#ffffff66'};
    transform: scale(1.1);

    > .slider {
      background-color: ${({ theme }) =>
        theme?.biograf?.ControlsBackgroundOnHover || '#ffffff66'};
    }

    ${Knob} {
      transition: 1s opacity ease-in;
      opacity: 1;
    }
  }
  :active {
    opacity: 0.3;
    transform: scale(0.9);
  }
  align-items: center;
  background-color: ${({theme}) => theme?.biograf?.ControlsBackground || '#ffffff33'} ;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 36px;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease-in-out;
  width: 36px;
`;

