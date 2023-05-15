# Examples of Mutual TLS (mTLS) 

## Overview 

This repository contains working examples (out of the box) using Mutual TLS (mTLS) between I/O Runtime actions and an external service

## Sections

* [example/](example/) - Contains the working example 
* [performance/](performance/) - Contains the performance tests for use with the working example

## Sample Usage

1. Generate client and server [certificates](example/certs/)
2. Run the [example server](example/server/) container in docker
3. Create and run the `aio` [client](example/client/) app
4. Test action `aio` app's action code
```
> curl http://localhost:3233/api/v1/web/guest/my-mtls-example/generic
{
  "resp": "https with mtls"
}
```
5. Run the [performance](performance/) tests against the `aio` app _(OPTIONAL)_
