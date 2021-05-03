<script lang="ts">
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';

  import { snake } from '@app/store/gamestate';

  import Orb from './Orb';
  import Food from './Food';
  import Snake from './Snake';

  const board = new Array(20).fill(
    new Array(20).fill(null)
  );
</script>

<GoogleAnalytics
  properties={[
    import.meta.env
      .SNOWPACK_PUBLIC_GOOGLE_ANALYTICS_ID,
  ]}
/>

<Orb />

{#key $snake.length}
  <h1 class="heading">
    Score: {$snake.length}
  </h1>
{/key}

<div class="container">
  <Snake />
  <Food />
  {#each board as row}
    <div class="row">
      {#each row as _}
        <div class="square" />
      {/each}
    </div>
  {/each}
</div>

<style>
  .heading {
    width: fit-content;
    margin: 64px auto 0;
    width: -moz-fit-content;
  }

  .container {
    width: 60%;
    max-width: 800px;
    margin: 64px auto;
    position: relative;
    border: solid 3px black;
  }

  .row {
    display: flex;
    position: relative;
  }

  .square {
    width: 5%;
    position: relative;
    padding-bottom: 5%;
  }

  .square::after {
    top: 0;
    left: 0;
    width: 100%;
    content: '';
    height: 100%;
    background: blue;
    position: absolute;
  }
</style>
