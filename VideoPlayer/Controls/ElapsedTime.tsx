import React from "react";
import styled from "styled-components";
import { formatDuration } from "../../utils/formatDuration";
import { ControlComponent } from "../Player";

export const ElapsedTime: ControlComponent<"elapsed" | "isPlaying"> = ({
  controlProps = { elapsed: 0 }
}) => {
  const elapsed = formatDuration(controlProps.elapsed * 1000);

  return (
    <Container className={controlProps.isPlaying ? '' : 'paused'}>{elapsed}</Container>
  );
};

const Container = styled.div`
  color: ${({theme}) => theme?.biograf?.PrimaryColor || '#ffffff'} ;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.16px;
  text-align: center;
  transition: all 0.15s linear;
  
  &.paused {
    opacity: 0.4
  }
`;
