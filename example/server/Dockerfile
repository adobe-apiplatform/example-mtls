FROM nginx

# server certs
COPY certs/mtls_server.crt /etc/nginx/conf.d/mtls_server.crt
COPY certs/mtls_server.key /etc/nginx/conf.d/mtls_server.key

# client certs
COPY certs/mtls_client.crt /etc/nginx/conf.d/mtls_client.crt

# configs
COPY server/conf/nginx.conf /etc/nginx/nginx.conf
COPY server/conf/default.conf /etc/nginx/conf.d/default.conf
COPY server/conf/https.conf /etc/nginx/conf.d/https.conf
COPY server/conf/mtls.conf /etc/nginx/conf.d/mtls.conf