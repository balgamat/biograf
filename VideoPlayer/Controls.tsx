import React, { ReactElement } from "react";
import styled from "styled-components";
import { ControlComponent } from "./Player";

export const Controls: ControlComponent<any> = ({ children, controlProps }) => {
  return (
    <ControlsContainer>
      {React.Children.map(children, child =>
        React.cloneElement(child as ReactElement, { controlProps })
      )}
    </ControlsContainer>
  );
};

export const ControlsContainer = styled.div`
  & > * {
    margin-left: 10px;
  }
  & > *:nth-child(1) {
    margin-left: 0;
  }
  & > .progressBar {
    padding: 0 20px 0 10px;
  }

  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 19px;
  position: absolute;
  width: 100%;
`;
