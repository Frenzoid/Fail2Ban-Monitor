import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

// APIREST ran on the server, so we can access the env variables.
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function GET() {
  // Check if the env variable is set, if it isnt, throw an error, and if it is, return the value to the frontend.
  if (!env.MAPTILER_APIKEY) {
    const errorMessage = "Maptiler API Key was not set. Please, set your API KEY as an env variable on this container named 'MAPTILER_APIKEY'. More info at: https://cloud.maptiler.com/account/keys/";
    console.error(errorMessage)
    throw error(400, errorMessage);
  }

  return new Response(JSON.stringify({ MAPTILER_APIKEY: env.MAPTILER_APIKEY }));
}