# Performance Testing

## Setup

These performance tests require the use of the [`k6`](https://k6.io/docs/getting-started/installation/) tool

## Usage

When running the [Example Server](../example/server/) in docker, the following performance tests are available using `k6` as root-level make targets:

* All Performance Tests
```
make server-perf
```
* Basic (HTTP)
```
make server-perf-http
```
* Standard TLS (HTTPS)
```
make server-perf-https
```
* Mutual TLS (mTLS)
```
make server-perf-mtls
```

## Options

You can override the number of VUs and test duration variables for any of the [above `make` targets](#usage)
```
# 100 VUs running for 30 seconds (default)
> PERF_VUS=100 PERF_DURATION=30s make server-perf

# 25 VUs for 5 minutes
> PERF_VUS=25 PERF_DURATION=300s make server-perf
```

You can also override the endpoint that `k6` will use during the tests, such as the one used by the `aio` cli when running locally
```
export __AIO_MTLS_APP_ENDPOINT="http://localhost:3233/api/v1/web/guest/mtls-example/generic
```
