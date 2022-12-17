
import { error } from '@sveltejs/kit';
import fs from 'fs';
import os from 'os';

// API REST ran on the server, so we can access the logs. This is a very simple implementation, it just reads the log file and returns the ips that are banned.
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function GET() {

  try {
    // array of ips
    let ips = [];

    // read the log file.
    const logFile = fs.readFileSync('f2b/fail2ban.log', 'utf8');

    // split the log file by lines
    const lines = logFile.split(os.EOL);

    // loop through the lines, and if the line contains "Ban" or "Found", then push the ip to the array.
    lines.forEach((line) => {
      if (line.includes("Ban") || line.includes("Found")) {
        const line_arr = line.split(" ");
        if (line_arr.indexOf("Ban") != -1) ips.push(line_arr[line_arr.indexOf("Ban") + 1])
        if (line_arr.indexOf("Found") != -1) ips.push(line_arr[line_arr.indexOf("Found") + 1])
      }
    });

    return new Response(JSON.stringify({ ips }));


  } catch (err) {
    const errorMessage = "Failed to read fail2ban log file. Did you mount the fail2ban log file to the container? Do i have the correct read permissions?: " + err;
    console.error(errorMessage)
    throw error(400, errorMessage);
  }

  // TODO grab ips from log file

}