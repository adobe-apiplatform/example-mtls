import path from 'path';
import fs from 'fs';
import https from 'https';
import fetch from 'node-fetch';

const HTTP_MTLS_URL  = process.env.__AIO_MTLS_ENDPOINT || 'https://localhost:8444/';
const HTTP_MTLS_CERT = process.env.__AIO_MTLS_CERT;
const HTTP_MTLS_KEY  = process.env.__AIO_MTLS_KEY;

async function makeRequest() {
  // you can also pass a ca or a pfx cert and much more! https.Agent uses the same options as tls.createSecureContext:
  // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
  const options = {
    cert: HTTP_MTLS_CERT,
    key: HTTP_MTLS_KEY,
    // in test, if you're working with self-signed certificates
    rejectUnauthorized: false,
    keepAlive: false, // switch to true if you're making a lot of calls from this client
  };

  // we're creating a new Agent that will now use the certs we have configured
  const sslConfiguredAgent = new https.Agent(options);

  try {
    console.log(`Making call to: [${HTTP_MTLS_URL}]`);
    // make the request just as you would normally ...
    const response = await fetch(HTTP_MTLS_URL, {
      //headers: headers, // ... pass everything just as you usually would
      agent: sslConfiguredAgent, // ... but add the agent we initialised
    });

    const responseBody = await response.text();

    // handle the response as you would see fit
    console.log(responseBody);
  } catch (error) {
    console.log(error);
  }
}

makeRequest();