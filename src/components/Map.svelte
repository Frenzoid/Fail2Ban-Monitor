<script>
  import { onMount } from "svelte";
  import { Map, NavigationControl, Marker } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  export let addresses = [];
  export let MAPTILER_APIKEY;

  let map;
  let markers = [];
  let mapContainer;

  onMount(async () => {
    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_APIKEY}`,
    });

    map.addControl(new NavigationControl({}), "top-right");

    addresses.forEach((address) => {
      addMaker(address, map);
    });
  });

  export function flyTo({ lon, lat }) {
    map.flyTo({
      center: [lon, lat],
      zoom: 9,
    });
  }

  function addMaker({ lon, lat }) {
    const marker = new Marker({ color: "#FF0000" })
      .setLngLat([lon, lat])
      .addTo(map);
    markers.push(marker);
  }
</script>

<div class="map" bind:this={mapContainer} />

<style>
  .map {
    min-width: 100%;
    min-height: 100%;
  }
</style>
