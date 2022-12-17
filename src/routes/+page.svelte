<script>
  // Svelte imports
  import { Stretch } from "svelte-loading-spinners";
  import { onMount } from "svelte";

  // Components imports
  import Map from "../components/Map.svelte";
  import AddressCard from "../components/AddressCard.svelte";

  // Libraries imports
  import axios from "axios";

  // Functions
  let flyTo;

  // Variables
  let MAPTILER_APIKEY;
  let fail2banips;
  let addresses;
  let errorStatus = "";

  // On component render.
  onMount(async () => {
    try {
      // Get the API key from docker env variable via apirest. This is a workaround to avoid exposing directly the API key in the client side.
      const req_apikey = await axios.get("/api/maptilerapikey");
      MAPTILER_APIKEY = req_apikey.data.MAPTILER_APIKEY;

      // Get the banned addresses from the server. Returns the IP addresses readed from the fail2ban log file mounted at /f2b/fail2ban.log
      const req_bannedips = await axios.get("/api/bannedaddresses");
      fail2banips = req_bannedips.data.ips;

      // Get the geolocations from the banned IPS.
      addresses = await getGeolocFromAddresses();
    } catch ({ response }) {
      // If there was an error, show it in the console and in the UI.
      console.error(response);
      errorStatus = response.data.message;
    }
  });

  // Get the geolocations from the banned IPS uisng the ip-api.com API.
  async function getGeolocFromAddresses() {
    // We get the geolocations concurrently using the Promise.all() method.
    const promises = fail2banips.map(async (ip) => {
      const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
      console.log(data);
      return data;
    });

    // All requests are done at the same time and the result is returned as an array.
    let geolocations = await Promise.all(promises);

    // Filter the geolocations that are not valid.
    geolocations = geolocations.filter((geoloc) => geoloc.status === "success");

    // Order the geolocations by region. ( Country code )
    geolocations.sort((a, b) => a.countryCode.localeCompare(b.countryCode));
    return geolocations;
  }
</script>

{#if errorStatus}
  <p class="loading-container text-center mt-5 text-danger">
    Error: {errorStatus}
  </p>
{:else if !addresses}
  <div class="loading-container mt-5 d-flex flex-row justify-content-center">
    <Stretch size="60" color="white" unit="px" duration="1s" />
  </div>
{:else}
  <div id="map-wrap">
    <Map {MAPTILER_APIKEY} {addresses} bind:flyTo />
  </div>
  <div id="sidebar" class="d-flex flex-column">
    {#if addresses.length === 0}
      <h5 class="text-center p-3 m-0">No banned addresses :)</h5>
    {:else}
      <h5 class="text-center p-3 m-0 border-bottom border-secondary">
        Total addresses banned: <span class="text-danger"
          >{addresses.length}</span
        >
      </h5>
      <button on:click={flyTo} class="btn btn-danger btn-sm m-3 ">
        Zoom Out
      </button>
      <div id="sidebar-ip-list" class="m-0 border-top border-secondary">
        {#each addresses as address, index}
          <AddressCard {address} {flyTo} {index} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .loading-container {
    height: calc(100vh - 119px);
    width: 100%;
  }

  #map-wrap {
    min-width: 500px;
    height: calc(100vh - 71px);
    flex: 1;
  }

  #sidebar {
    widows: 320px;
    max-height: calc(100vh - 71px);
  }

  #sidebar-ip-list {
    overflow-y: auto;
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
