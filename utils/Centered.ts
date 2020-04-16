import styled, { css } from 'styled-components';

export const Centered = styled.div<{
  vertically?: boolean;
  horizontally?: boolean;
}>`
  display: flex;
  justify-content: center;
  ${({ vertically, horizontally }) => {
    if (vertically && !horizontally) {
      return css`
        height: 100%;
        flex-direction: column;
      `;
    }

    if (horizontally && !vertically) {
      return css`
        width: 100%;
        flex-direction: row;
        align-items: center;
      `;
    }

    return css`
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
    `;
  }}
`;
