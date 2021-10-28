# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:14 as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

RUN npm ci

ARG REACT_APP_VERSION_HASH
ARG REACT_APP_BUILD_TIMESTAMP
ENV REACT_APP_VERSION_HASH=$REACT_APP_VERSION_HASH
ENV REACT_APP_BUILD_TIMESTAMP=$REACT_APP_BUILD_TIMESTAMP

RUN npm run build:micro
RUN cp -r /source/build /micro

RUN npm run build


FROM ghcr.io/navikt/pus-decorator/pus-decorator:latest
ENV APPLICATION_NAME=veientilarbeid
ENV GZIP_ENABLED=true

COPY --from=node-builder /source/build /app

# Pus-decorator enforcer ikke autentisering på enkeltfiler. Vi utnytter den egenskapen for demo.
COPY --from=node-builder /source/build/index.html /app/demo/index.html

COPY --from=node-builder /micro /app/micro

ADD decorator.yaml /decorator.yaml

