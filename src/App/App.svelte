<script lang="ts">
  import { GoogleAnalytics } from '@beyonk/svelte-google-analytics';
</script>

<GoogleAnalytics
  properties={[
    import.meta.env
      .SNOWPACK_PUBLIC_GOOGLE_ANALYTICS_ID,
  ]}
/>

<div>Woohoo, we have a cool app!</div>
