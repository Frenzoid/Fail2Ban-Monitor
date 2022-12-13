<script>
  import Map from "../components/Map.svelte";
  import Axios from "axios";

  let domain;
  let coords = [];

  const getCoords = async () => {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
    coords.push([data.lat, data.lon]);
    coords = [...coords];
  };
</script>

<div class="app">
  Ip or Domain: <input type="text" bind:value={domain} />
  <button on:click={getCoords}>Get Coords</button>
  <Map {coords} />
</div>

<style>
  .app {
    text-align: center;
  }
</style>
