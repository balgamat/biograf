import React from "react";
import styled from "styled-components";
import { ControlButton } from "../ControlButton";
import { motion } from "framer-motion";
import { VolumeBar } from "./VolumeBar";
import { ControlComponent } from "../../Player";

const MuteIcon = require("../../../assets/sound_mute.svg");
const VolumeMaxIcon = require("../../../assets/sound_max.svg");
const VolumeMinIcon = require("../../../assets/sound_low.svg");

export const Volume: ControlComponent<
  "mute" | "muted" | "setVolume" | "volume"
> = ({ controlProps }) => {
  const buttonVariants = {
    collapsed: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    },
    expanded: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    }
  };
  const sliderVariants = {
    collapsed: {
      height: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0
    },
    expanded: {
      height: 85,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5
    }
  };

  return (
    <ControlButton
      whileHover={"expanded"}
      initial={"collapsed"}
      variants={buttonVariants}
      onClick={() => controlProps?.mute(!controlProps?.muted)}
    >
      {controlProps?.muted || (controlProps?.volume || 0) === 0 ? (
        <img src={MuteIcon} alt={"Unmute"} />
      ) : (controlProps?.volume || 0) > 0.75 ? (
        <img src={VolumeMaxIcon} alt={"Volume"} />
      ) : (
        <img src={VolumeMinIcon} alt={"Volume"} />
      )}
      <SliderContainer
        className={"slider"}
        whileHover={"expanded"}
        initial={"collapsed"}
        variants={sliderVariants}
      >
        <VolumeBar
          value={controlProps?.volume || 0}
          setValue={v => controlProps?.setVolume(v)}
        />
      </SliderContainer>
    </ControlButton>
  );
};

const SliderContainer = styled(motion.div)`
  background-color: ${({ theme }) =>
    theme?.biograf?.ControlsBackground || "#ffffff33"};
  bottom: 36px;
  height: 85px;
  left: 0;
  position: absolute;
  transition: all 0.3s ease-in-out;
  width: 36px;
`;
