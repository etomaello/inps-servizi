/**
 * Cloudflare Pages Functions Middleware
 *
 * Questo worker intercetta le richieste specifiche e le inoltra al server Adobe AEM Cloud.
 *
 * Path mappings:
 * - /content -> https://publish-p127204-e1900935.adobeaemcloud.com/content
 * - /etc -> https://publish-p127204-e1900935.adobeaemcloud.com/etc
 * - /etc.clientlibs -> https://publish-p127204-e1900935.adobeaemcloud.com/etc.clientlibs
 * - /libs -> https://publish-p127204-e1900935.adobeaemcloud.com/libs
 */

const AEM_ORIGIN = 'https://publish-p127204-e1900935.adobeaemcloud.com';

// Percorsi da proxy verso AEM
const PROXY_PATHS = [
  '/etc.clientlibs', // Nota: questo deve venire prima di /etc per evitare match parziali
  '/etc',
  '/libs'
];

/**
 * Verifica se il path corrente deve essere inoltrato ad AEM
 * @param {string} pathname - Il path della richiesta
 * @returns {boolean}
 */
function shouldProxy(pathname) {
  return PROXY_PATHS.some(proxyPath => pathname.startsWith(proxyPath));
}

/**
 * Middleware function che gestisce tutte le richieste
 * @param {Object} context - Cloudflare Pages context
 * @returns {Response}
 */
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Verifica se il path richiede il proxy verso AEM
  if (shouldProxy(url.pathname)) {
    // Costruisce l'URL di destinazione AEM
    const aemUrl = new URL(url.pathname + url.search, AEM_ORIGIN);

    // Crea una nuova richiesta verso AEM
    const aemRequest = new Request(aemUrl.toString(), {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual'
    });

    try {
      // Inoltra la richiesta ad AEM
      const response = await fetch(aemRequest);

      // Crea una nuova response con gli headers modificati
      const newResponse = new Response(response.body, response);

      // Aggiungi headers CORS se necessario
      newResponse.headers.set('Access-Control-Allow-Origin', '*');

      // Log per debugging (visibile nei logs di Cloudflare)
      console.log(`Proxied: ${url.pathname} -> ${aemUrl.toString()} [${response.status}]`);

      return newResponse;
    } catch (error) {
      console.error(`Error proxying request to AEM: ${error.message}`);
      return new Response('Error proxying request', { status: 502 });
    }
  }

  // Se non è un path da proxy, continua con il normale processing di Pages
  return next();
}

