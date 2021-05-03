<script lang="ts">
  import { onMount } from 'svelte';

  import { snake as segments } from '@app/store/gamestate';
  import type { Position } from '@app/store/gamestate';

  import getPositionStyle from '@app/utils/getPositionStyle';

  // controls snake movement
  let delta = {
    x: 1,
    y: 0,
  };

  $: moveTick = 1000 / $segments.length;

  let timeout: ReturnType<
    typeof setTimeout
  >;

  const moveSnake = () => {
    segments.update((prev) => {
      let newPosition: Position[] = [];
      for (
        let i = prev.length - 1;
        i >= 0;
        i--
      ) {
        if (i === 0) {
          newPosition = [
            {
              x:
                delta.x * 100 +
                prev[0].x,
              y:
                delta.y * 100 +
                prev[0].y,
            },
            ...newPosition,
          ];
        } else {
          newPosition = [
            prev[i - 1],
            ...newPosition,
          ];
        }
      }
      return newPosition;
    });
    timeout = setTimeout(
      moveSnake,
      moveTick
    );
  };

  // start moving the snake
  onMount(() => {
    timeout = setTimeout(
      moveSnake,
      moveTick
    );
  });

  // add handlers to change directions
  onMount(() => {
    const changeDirections = ({
      key,
    }: KeyboardEvent) => {
      switch (key) {
        case 'ArrowUp': {
          delta = {
            ...delta,
            x: 0,
            y: -1,
          };
          break;
        }

        case 'ArrowDown': {
          delta = {
            ...delta,
            x: 0,
            y: 1,
          };
          break;
        }

        case 'ArrowLeft': {
          delta = {
            ...delta,
            x: -1,
            y: 0,
          };
          break;
        }

        case 'ArrowRight': {
          delta = {
            ...delta,
            x: 1,
            y: 0,
          };
          break;
        }

        default: {
          //no-op
        }
      }

      // move the snake immediately
      if (timeout) {
        clearTimeout(timeout);
        moveSnake();
      }
    };

    document.addEventListener(
      'keydown',
      changeDirections
    );

    return () => {
      document.removeEventListener(
        'keydown',
        changeDirections
      );
    };
  });
</script>

{#each $segments as position}
  <div
    class="snake"
    style={getPositionStyle(position)}
  />
{/each}

<style>
  .snake {
    top: 0;
    left: 0;
    width: 5%;
    z-index: 3;
    position: absolute;
    padding-bottom: 5%;
  }

  .snake::after {
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: green;
    position: absolute;
  }
</style>
