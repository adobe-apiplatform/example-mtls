IMAGE_TAG = nginx-mtls
PERF_VUS ?= 100
PERF_DURATION ?= 30s
PERF_EXECTIME = $(shell date +%s)
CERT_OUTPUT_DIR=$(PWD)/example/certs
CERT_SUBJECT="/C=US/ST=California/L=San Jose"
CERT_PASSWORD=password123

certs:
	@echo "Generate server-side certificate..."
	openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout $(CERT_OUTPUT_DIR)/mtls_server.key -out $(CERT_OUTPUT_DIR)/mtls_server.crt -subj $(CERT_SUBJECT)
	@echo "Generate client-side certificate..."
	openssl req -x509 -nodes -days 365 -newkey rsa:4096 -keyout $(CERT_OUTPUT_DIR)/mtls_client.key -out $(CERT_OUTPUT_DIR)/mtls_client.crt -subj $(CERT_SUBJECT)
	@echo "Combine client-side cert+key..."
	openssl pkcs12 -export -out $(CERT_OUTPUT_DIR)/mtls_client.pfx -inkey $(CERT_OUTPUT_DIR)/mtls_client.key -in $(CERT_OUTPUT_DIR)/mtls_client.crt -passout pass:$(CERT_PASSWORD)

certs-test:
	@echo "Validate RSA server key..."
	openssl rsa -in $(CERT_OUTPUT_DIR)/mtls_server.key -check &> /dev/null
	@echo "Validate x509 server certificate..."
	openssl x509 -in $(CERT_OUTPUT_DIR)/mtls_server.crt -text -noout &> /dev/null
	@echo "Validate PKCS12 client key/cert pack..."
	openssl pkcs12 -info -in $(CERT_OUTPUT_DIR)/mtls_client.pfx -passin pass:$(CERT_PASSWORD) -passout pass:$(CERT_PASSWORD) &> /dev/null

build: server-build

server-build:
	docker build -f example/server/Dockerfile -t $(IMAGE_TAG) example/

server-run: server-build
	docker run --rm  \
		-p 8080:8080 \
		-p 8443:8443 \
		-p 8444:8444 \
		$(IMAGE_TAG)

server-test:
	curl -f http://localhost:8080 || echo "failed to contact server HTTP endpoint"
	curl -k https://localhost:8443 || echo "failed to contact server HTTPS endpoint"
	curl --cert example/certs/mtls_client.crt --key example/certs/mtls_client.key -k https://localhost:8444 || echo "failed to contact server MTLS endpoint"

server-perf: server-perf-http server-perf-https server-perf-mtls

server-perf-http:
	echo "Running HTTP performance test with $(PERF_VUS) VUs for $(PERF_DURATION)..."
	k6 run --vus $(PERF_VUS) --duration $(PERF_DURATION) ./performance/http.js

server-perf-https:
	echo "Running HTTPS performance test with $(PERF_VUS) VUs for $(PERF_DURATION)..."
	k6 run --vus $(PERF_VUS) --duration $(PERF_DURATION) ./performance/https.js

server-perf-mtls:
	echo "Running mTLS performance test with $(PERF_VUS) VUs for $(PERF_DURATION)..."
	k6 run --vus $(PERF_VUS) --duration $(PERF_DURATION) ./performance/mtls.js
