
import { error } from '@sveltejs/kit';
import fs from 'fs';
import os from 'os';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function GET() {

  try {
    let IPS = [];

    const logFile = fs.readFileSync('f2b/fail2ban.log', 'utf8');
    const lines = logFile.split(os.EOL);

    lines.forEach((line) => {
      if (line.includes("Ban") || line.includes("Found")) {
        const line_arr = line.split(" ");
        if (line_arr.indexOf("Ban") != -1) IPS.push(line_arr[line_arr.indexOf("Ban") + 1])
        else if (line_arr.indexOf("Found") != -1) IPS.push(line_arr[line_arr.indexOf("Found") + 1])
      }
    });

    return new Response(JSON.stringify({ IPS: IPS }));


  } catch (err) {
    const errorMessage = "Failed to read fail2ban log file. Did you mount the fail2ban log file to the container? Do i have the correct read permissions?: " + err;
    console.error(errorMessage)
    throw error(400, errorMessage);
  }

  // TODO grab ips from log file

}