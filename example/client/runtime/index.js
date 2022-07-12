const path = require('path');
const fs = require('fs');
const https = require('https');
const fetch = require('node-fetch');

async function main(params) {

  console.log(`params: \n${JSON.stringify(params, null, 2)}`);

  const HTTP_MTLS_URL  = params.__AIO_MTLS_ENDPOINT || 'https://host.docker.internal:8444/';
  const HTTP_MTLS_CERT = params.__AIO_MTLS_CERT;
  const HTTP_MTLS_KEY  = params.__AIO_MTLS_KEY;

  console.log("starting mtls test example");
  
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
    return { statusCode: 200, body: { resp: responseBody }};
  } catch (error) {
    console.log(error);
    return { statusCode: 418, body: { error: error }};
  }
}

exports.main = main
