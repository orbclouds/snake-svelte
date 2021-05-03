import type { Position } from '@app/store/gamestate';

const getPositionStyle = ({
  x,
  y,
}: Position) =>
  `transform: translate(${x}%, ${y}%);`;

export default getPositionStyle;
