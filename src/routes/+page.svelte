<script>
  import { onMount } from "svelte";
  import Map from "../components/Map.svelte";
  import axios from "axios";

  let addresses = [
    "google.com",
    "facebook.com",
    "twitter.com",
    "storage.frenzoid.dev",
  ];

  let coords = [];

  onMount(async () => {
    const promises = addresses.map(async (address) => {
      const { data } = await axios.get(`http://ip-api.com/json/${address}`);
      return { ...data, address };
    });

    coords = await Promise.all(promises);
    console.log(coords);
  });
</script>

<div class="bg-dark text-white">
  <div class="text-center">
    <h2 class="m-0 py-2">Fail2Ban Monitor</h2>
  </div>

  <div class="d-flex flex-row">
    <div class="map-wrap col-9">
      <Map {coords} />
    </div>
    <div class="d-flex flex-column col-3">
      <hr class="mt-0" />
      <h5 class="text-center mt-2">Banned Addresses</h5>
      <hr />

      {#each coords as coord}
        <div class="my-1 px-3">
          <h6 class="text-danger">{coord.address}</h6>
          <ul>
            <li>
              <span class="text-muted">Country: </span>
              {coord.country}
            </li>
            <li>
              <span class="text-muted">City: </span>
              {coord.city}, {coord.regionName}
            </li>
            <li>
              <span class="text-muted">ISP: </span>
              {coord.isp}
            </li>
            <li>
              <span class="text-muted">Lat: </span>
              {coord.lat},
              <span class="text-muted">Lon: </span>
              {coord.lon}
            </li>
          </ul>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .map-wrap {
    height: 100vh;
  }
</style>
