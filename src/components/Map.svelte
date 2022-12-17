<script>
  // Import svelte, maplibre functions, and also maplibre css ( since were only going to use this css for this component ).
  import { onMount } from "svelte";
  import { Map, NavigationControl, Marker } from "maplibre-gl";
  import "maplibre-gl/dist/maplibre-gl.css";

  // Export the flyTo function to be accessed from the parent component ( check the bind: usage on parent component ).
  export function flyTo({ lon = 0, lat = 0 }) {
    map.flyTo({
      center: [lon, lat],
      zoom: lat && lon ? 9 : 1,
    });
  }

  // Export the addresses array and the MAPTILER_APIKEY variable to be assigned from the parent component.
  export let addresses = [];
  export let MAPTILER_APIKEY;

  // Variables
  let map;
  let markers = [];
  let mapContainer;

  // On component render, create the map and add the markers.
  onMount(async () => {
    map = new Map({
      container: mapContainer,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_APIKEY}`,
    });

    // Add the navigation control to the map.
    map.addControl(new NavigationControl({}), "top-right");

    // Add the markers to the map.
    addresses.forEach((address) => {
      addMaker(address);
    });
  });

  // Add a marker to the map.
  function addMaker({ lon, lat }) {
    const marker = new Marker({ color: "#FF0000" })
      .setLngLat([lon, lat])
      .addTo(map);
    markers.push(marker);
  }
</script>

<div id="map" bind:this={mapContainer} />

<style>
  #map {
    min-width: 100%;
    min-height: 100%;
  }
</style>
