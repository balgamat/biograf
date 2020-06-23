import React, { FC, MouseEventHandler, WheelEventHandler } from "react";
import styled, { css } from "styled-components";
import hex2rgba from "../../../utils/hex2rgba";
import { Centered } from "../../../utils/Centered";

export type VolumeBarProps = {
  value: number;
  setValue(v: number): void;
};

export const VolumeBar: FC<VolumeBarProps> = props => {
  const handleClick: MouseEventHandler = e => {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { bottom, height } = e.target.getBoundingClientRect();
    props.setValue((bottom - e.clientY) / height);
  };

  const handleWheel: WheelEventHandler = e => {
    props.setValue(props.value + e.deltaY / 100);
  };

  return (
    <Container
      className={"volumeBar"}
      onClick={handleClick}
      onWheel={handleWheel}
    >
      <Bar progress={props.value}>
        <Knob progress={props.value} />
      </Bar>
    </Container>
  );
};

const Container = styled(Centered)`
  cursor: row-resize;
  flex: 1;
  height: 100%;
  overflow: hidden;
  padding-top: 17px;
  width: 36px;
`;

export const Knob = styled.div<{ progress: number }>`
  width: 12px;
  height: 3px;
  background-color: ${({ theme }) => theme?.biograf?.PrimaryColor || '#fff'};
  position: absolute;
  bottom: ${({ progress }) => progress * 100}%;
  left: -3px;
  opacity: 0;
`;

const Bar = styled.div<{ progress: number }>`
  background: ${({ theme, progress }) =>
    css`linear-gradient(to top,
      ${hex2rgba(theme?.biograf?.PrimaryColor || '#ffffff', 1)} ${progress * 100}%,${hex2rgba(
      theme?.biograf?.PrimaryColor || '#ffffff',
      0.2
    )} ${progress * 100}% )`};
  height: 100%;
  width: 6px;
  position: relative;
`;
