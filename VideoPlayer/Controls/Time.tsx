import React, { useState } from "react";
import styled from "styled-components";
import { formatDuration } from "../../utils/formatDuration";
import { ControlComponent } from "../Player";

export const Time: ControlComponent<"elapsed" | "duration"> = ({
  controlProps = { duration: 0, elapsed: 0 }
}) => {
  const [displayRemaining, setDisplayRemaining] = useState(false);

  const elapsed = formatDuration(controlProps.elapsed * 1000);
  const duration = formatDuration(controlProps.duration * 1000);
  const remaining = formatDuration(
    (controlProps.duration - controlProps.elapsed) * 1000
  );

  return (
    <Container onClick={() => setDisplayRemaining(v => !v)}>{`${
      displayRemaining ? `-${remaining}` : elapsed
    } / ${duration}`}</Container>
  );
};

const Container = styled.div`
  color: ${({theme}) => theme?.biograf?.PrimaryColor || '#ffffff'} ;
  align-items: center;
  display: flex;
  flex-direction: column;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 0.16px;
  padding-left: 20px;
  text-align: center;

  :first-child {
    padding-left: 0;
  }
`;
