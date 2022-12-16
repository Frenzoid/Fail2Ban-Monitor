<script>
  import { Stretch } from "svelte-loading-spinners";
  import { onMount } from "svelte";

  import Map from "../components/Map.svelte";
  import AddressCard from "../components/AddressCard.svelte";
  import axios from "axios";

  let flyTo;

  let MAPTILER_APIKEY;
  let fail2banips;
  let addresses;
  let errorStatus = "";

  onMount(async () => {
    try {
      // Get the API key from the server
      const req_apikey = await axios.get("/api/maptilerapikey");
      MAPTILER_APIKEY = req_apikey.data.MAPTILER_APIKEY;

      // Get the banned addresses from the server
      const req_bannedips = await axios.get("/api/fail2banips");
      fail2banips = req_bannedips.data.IPS;

      // Get the geoloc from the banned IPS
      addresses = await getGeolocFromAddresses();

      // Reset the error status
      errorStatus = "";
    } catch ({ response }) {
      console.error(response);
      errorStatus = response.data.message;
    }
  });

  async function getGeolocFromAddresses() {
    const promises = fail2banips.map(async (ip) => {
      const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
      return { ...data, ip, banned: true };
    });
    return await Promise.all(promises);
  }
</script>

{#if errorStatus}
  <p class="loading-div text-center mt-5 text-danger">Error: {errorStatus}</p>
{:else if !addresses}
  <div class="loading-div mt-5 d-flex flex-row justify-content-center">
    <Stretch size="60" color="white" unit="px" duration="1s" />
  </div>
{:else}
  <div class="map-wrap">
    <Map {MAPTILER_APIKEY} {addresses} bind:flyTo />
  </div>
  <div class="sidebar d-flex flex-column">
    {#if addresses.length === 0}
      <h5 class="text-center mt-4">No banned addresses</h5>
    {:else}
      <h6 class="text-center py-3 border-bottom border-secondary">
        Total addresses banned: <span class="text-danger"
          >{addresses.length}</span
        >
      </h6>
      <div class="sidebar-list">
        {#each addresses as address}
          <AddressCard {address} {flyTo} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .loading-div {
    height: calc(100vh - 119px);
    width: 100%;
  }

  .map-wrap {
    min-width: 500px;
    height: calc(100vh - 71px);
    flex: 1;
  }

  .sidebar {
    widows: 320px;
    max-height: calc(100vh - 71px);
  }

  .sidebar-list {
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border-left: 1px grey solid;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
  }
</style>
