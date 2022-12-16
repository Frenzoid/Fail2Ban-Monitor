import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export function GET() {
  if (!env.MAPTILER_APIKEY) {
    const errorMessage = "Maptiler API Key was not set, please, set it in your maptiler apikey as a docker ENV variable named `MAPTILER_APIKEY`.";
    console.error(errorMessage)
    throw error(400, errorMessage);
  }

  return new Response(JSON.stringify({ MAPTILER_APIKEY: env.MAPTILER_APIKEY }));
}