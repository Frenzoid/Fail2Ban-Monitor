<script>
  import { onMount, onDestroy } from "svelte";
  import { Map, NavigationControl, Marker } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  export let coords = [];

  let map;
  let markers = [];
  let mapContainer;

  onMount(() => {
    const apiKey = "9OzGZPhG82oNtAiyjKgB";

    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${apiKey}`,
    });

    map.addControl(new NavigationControl({}), "top-right");
  });

  onDestroy(() => {
    if (map) map.remove();
  });

  $: {
    if (map && coords) {
      // Remove old markers
      markers.forEach((marker) => marker.remove());
      markers = [];

      // Add new markers
      coords.forEach((coord) => {
        const marker = new Marker().setLngLat(coord).addTo(map);
        markers.push(marker);
      });
    }
  }
</script>

<div class="map-wrap">
  <div class="map" id="map" bind:this={mapContainer} />
</div>

<style>
  .map-wrap {
    position: relative;
    width: 100%;
    height: calc(100vh);
  }

  .map {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
