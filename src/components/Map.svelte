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
    if (markers) clearMarkers();
  });

  function updateMarkers() {
    clearMarkers();

    coords.forEach((coord) => {
      console.log(coord);
      const marker = new Marker({ color: "#FF0000" })
        .setLngLat([coord.lon, coord.lat])
        .addTo(map);
      markers.push(marker);
    });
  }

  function clearMarkers() {
    markers.forEach((marker) => marker.remove());
    markers = [];
  }

  $: {
    coords, updateMarkers();
  }
</script>

<div class="map" bind:this={mapContainer} />

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
