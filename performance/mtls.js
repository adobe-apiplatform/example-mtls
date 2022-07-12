import http from 'k6/http';

const HTTP_MTLS_URL  = __ENV.__AIO_MTLS_APP_ENDPOINT || 'https://localhost:8444/';

export const options = {
    insecureSkipTLSVerify: true,
    tlsAuth: [
        {
            domains: ['localhost'],
            cert: open('../example/certs/mtls_client.crt'),
            key: open('../example/certs/mtls_client.key')
        }
    ]
};

export default function () {
    http.get(HTTP_MTLS_URL);
};