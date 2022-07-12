# Client mTLS Example(s)

There are two client examples available below, each requiring the [common setup](#common-setup).
* [Example App Builder Client using IO Runtime](#example-app-builder-client-using-io-runtime)
* [Example Generic NodeJS Client](#example-generic-nodejs-client)

## Common Setup

### Certificates
Be sure to have run the following command to create and test certificates for both client and server
```
cd ../../
make certs
```

### Export Needed Environment Variables
The following need to be exported as env vars:
* The current certificate + key for use with both client examples
* The example server endpoint supporting mTLS 
```
export __AIO_MTLS_KEY=$(cat ../certs/mtls_client.key)
export __AIO_MTLS_CERT=$(cat ../certs/mtls_client.crt)
```
Another endpoint, which supports mTLS and uses the certificates from this example, can be used via another env var
```
export __AIO_MTLS_ENDPOINT="https://my.endpoint/"
```

## Example App Builder Client using IO Runtime

### Update/install the latest AIO CLI
```
> npm install -g @adobe/aio-cli
```

### Create a new Application
```
> cd /path/to/example-mtls/example/client
> aio app:init ./my-mtls-example
```

### Move these two example files in place
```
> cp runtime/index.js ./my-mtls-example/actions/generic/index.js
> cp runtime/app.config.yaml ./my-mtls-example/
```

### Run your AppBuilder project locally
```
cd ./my-mtls-example
aio app run -v --local
```

### Test your local AppBuilder project
```
> curl "http://localhost:3233/api/v1/web/guest/my-mtls-example/generic"
```
If using a custom mTLS endpoint as mentioned above, the following URL should be used instead
```
> curl "http://localhost:3233/api/v1/web/guest/my-mtls-example/generic?__AIO_MTLS_ENDPOINT=$__AIO_MTLS_ENDPOINT"
```

## Example Generic NodeJS Client 
Run the included in NodeJS
```
> cd /path/to/example-mtls/example/client/node
> npm install
> node node-fetch-env.js
```