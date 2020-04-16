import React, { MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';
import hex2rgba from '../../utils/hex2rgba';
import { Centered } from '../../utils/Centered';
import { ControlComponent } from '../Player';

export const ProgressBar: ControlComponent<'progress' | 'seek'> = ({
  controlProps,
}) => {
  const handleClick: MouseEventHandler = ({ target, clientX }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { left, width } = target.getBoundingClientRect();
    controlProps?.seek((clientX - left) / width);
  };

  return (
    <Container className={'progressBar'} onClick={handleClick}>
      <Bar progress={controlProps?.progress || 0} />
    </Container>
  );
};

const Container = styled(Centered)`
  cursor: col-resize;
  flex: 1;
  height: 40px;
`;

const Bar = styled.div<{ progress: number }>`
  background: ${({ theme, progress }) =>
    css`linear-gradient(to right,
      ${hex2rgba(theme?.biograf?.PrimaryColor  || '#ffffff', 1)} ${progress * 100}%,${hex2rgba(
      theme?.biograf?.PrimaryColor || '#ffffff',
      0.5,
    )} ${progress * 100}% )`};
  height: 6px;
  width: 100%;
`;
