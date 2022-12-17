<script>
  // Receive address data from parent component
  export let address;

  // Destructure the address object
  const { query, zip, country, city, countryCode, regionName, isp, lat, lon } =
    address;

  // Receive the flyTo function from parent component
  export let flyTo;

  // Receive the array index of the address from parent component
  export let index;
</script>

<div class="py-2 px-3" id="address-card">
  <div class="d-flex flex-row flex-nowrap justify-content-between">
    <div
      class="d-flex flex-column justify-content-center"
      data-bs-toggle="collapse"
      href="#collapse-address-{index}"
      id="address"
    >
      <div class="d-flex flex-row flex-nowrap">
        <pre class="m-0 text-white">{countryCode} - </pre>
        <pre class="m-0 text-danger">{query}</pre>
      </div>
    </div>
    <button
      on:click={flyTo({ lat, lon })}
      on:keydown={flyTo({ lat, lon })}
      class="btn btn-danger btn-sm px-3">🚀</button
    >
  </div>
  <ul id="collapse-address-{index}" class="mt-2 collapse">
    <li>
      <span class="text-muted">Country: </span>
      {country}
    </li>
    <li>
      <span class="text-muted">City: </span>
      {city}, {regionName}
    </li>
    <li>
      <span class="text-muted">ISP: </span>
      {isp}
    </li>
    <li>
      <span class="text-muted">Zip: </span>
      {zip}
    </li>
    <li class="flyto">
      <span class="text-muted">Lat: </span>
      {lat},
      <span class="text-muted">Lon: </span>
      {lon}
    </li>
  </ul>
</div>

<style>
  #address-card:hover {
    background-color: #141414;
    cursor: pointer;
  }

  #address {
    flex: 1;
  }
</style>
