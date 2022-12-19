# Fail2Ban Monitor.
Simple svelteKit app to monitor fail2ban logs and banned addresses.

<img src="assets/screenshot.png" >

## Dependencies
- MapTileer API key (free tier is fine). You can get yours [here](https://www.maptiler.com/).

- Docker or Node Installed.
## Installation
- Via Docker (recommended)
Run the following command to start the app:

  `docker run --name F2BMONITOR_SERVER -p 3000:3000 -e MAPTILER_APIKEY=yourmaptilerapikey -v /var/log/fail2ban.log:/f2b/fail2ban.log frenzoid/fail2ban-monitor:latest`


