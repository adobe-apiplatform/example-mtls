# Server mTLS Example

This contains the items necessary to create the nginx docker image which supports mTLS with the following items:

* `Dockerfile` - defines the image to build
* `conf/` - contains multiple nginx configurations
    * `http.conf` - supports HTTP requests on port `8080`
    * `https.conf` - supports HTTPS requests using a self-signed server certificate on port `8443`
    * `mtls.conf` - supports mTLS over HTTPS using self-signed client and server certificates on port `8444`

## Usage

The docker image can be built and run using the root level `server-run` make target.
```
make server-run
```