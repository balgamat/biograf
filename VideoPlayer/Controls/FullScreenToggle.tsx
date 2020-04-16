import React from "react";
import { ControlComponent } from "../Player";
import { ControlButton } from "./ControlButton";

const FullScreenIcon = require("../../assets/fullscreen.svg");
const ExitFullScreenIcon = require("../../assets/normalscreen.svg");

export const FullScreenToggle: ControlComponent<
  "fullscreen" | "toggleFullscreen"
> = ({ controlProps }) => (
  <ControlButton onClick={controlProps?.toggleFullscreen}>
    {controlProps?.fullscreen ? (
      <img src={ExitFullScreenIcon} alt={"Exit fullscreen"} />
    ) : (
      <img src={FullScreenIcon} alt={"Fullscreen"} />
    )}
  </ControlButton>
);
