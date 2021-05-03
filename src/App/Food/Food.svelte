<script lang="ts">
  import getPositionStyle from '@app/utils/getPositionStyle';

  import { food as position } from '@app/store/gamestate';
</script>

<div
  class="food"
  style={getPositionStyle($position)}
/>

<style>
  .food {
    top: 0;
    left: 0;
    width: 5%;
    z-index: 2;
    position: absolute;
    padding-bottom: 5%;
  }

  .food::after {
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 100%;
    background: yellow;
    position: absolute;
  }
</style>
