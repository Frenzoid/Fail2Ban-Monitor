<script>
  export let address;
  const { banned, ip, country, city, regionName, isp, lat, lon } = address;

  export let flyTo;
</script>

<div
  class="py-2 px-4 border-bottom border-secondary"
  id="address-card"
  on:click={flyTo({ lat, lon })}
  on:keydown={flyTo({ lat, lon })}
>
  <p class="text-primary m-0">
    <strong>Address:</strong>
    <span class={banned ? "text-danger" : "text-primary"}>{ip}</span>
  </p>
  <ul>
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
      <span class="text-muted">Lat: </span>
      {lat},
      <span class="text-muted">Lon: </span>
      {lon}
    </li>
  </ul>
</div>

<style>
  #address-card {
    cursor: pointer;
  }

  #address-card:hover {
    background-color: #1a1a1a;
  }
</style>
