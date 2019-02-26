# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

RUN npm ci
RUN npm run build

FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=veientilarbeid
COPY --from=node-builder /source/build /app

# Pus-decorator enforcer ikke autentisering på enkeltfiler. Vi utnytter den egenskapen for demo.
COPY --from=node-builder /source/build/index.html /app/demo/index.html

ADD decorator.yaml /decorator.yaml

