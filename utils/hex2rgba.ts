import { css } from 'styled-components';

export default function hex2rgba(hex: string, alpha = 1) {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return css`rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${
      alpha || 1
    })`;
  }
  throw new Error('Bad Hex');
}
