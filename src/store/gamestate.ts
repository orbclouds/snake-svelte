import { writable } from 'svelte/store';

import generateFoodPosition from '@app/utils/generateFoodPosition';

export interface Position {
  x: number;
  y: number;
}

const DEFAULT_SNAKE_POSITION = [
  {
    x: 1000,
    y: 1000,
  },
];

export const snake = writable<
  Position[]
>(DEFAULT_SNAKE_POSITION);

const resetFoodPosition = (): Position => ({
  x: generateFoodPosition(),
  y: generateFoodPosition(),
});

export const food = writable<Position>(
  resetFoodPosition()
);

const BOUNDS = {
  x: {
    max: 1900,
    min: 0,
  },
  y: {
    max: 1900,
    min: 0,
  },
};

const gameOver = () => {
  alert('Game over!');
  food.set(resetFoodPosition());
  snake.set(DEFAULT_SNAKE_POSITION);
};

snake.subscribe((segments) => {
  // check if snake is within bounds
  if (
    segments[0].x > BOUNDS.x.max ||
    segments[0].x < BOUNDS.x.min ||
    segments[0].y > BOUNDS.y.max ||
    segments[0].y < BOUNDS.y.min
  ) {
    gameOver();
  }

  // check if snake has run into itself
  if (
    segments.length > 2 &&
    segments
      .slice(1)
      .some(
        ({ x, y }) =>
          x === segments[0].x &&
          y === segments[0].y
      )
  ) {
    gameOver();
  }
});

food.subscribe((position) => {
  const unsubscribe = snake.subscribe(
    (segments) => {
      // if snake hits food
      if (
        position.x === segments[0].x &&
        position.y === segments[0].y
      ) {
        unsubscribe();
        snake.update((prev) => [
          ...prev,
          prev[prev.length - 1],
        ]);
        food.set(resetFoodPosition());
      }
    }
  );
});
