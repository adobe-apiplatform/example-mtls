import http from 'k6/http';

const HTTP_MTLS_URL  = __ENV.__AIO_MTLS_APP_ENDPOINT || 'https://localhost:8443/';

export const options = {
    insecureSkipTLSVerify: true,
};

export default function () {
    http.get(HTTP_MTLS_URL);
};