# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:18 as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

# npm run build har blitt kjørt på github før docker build
# RUN cp -r /source/dist /cdn

RUN npm ci

ARG REACT_APP_VERSION_HASH
ARG REACT_APP_BUILD_TIMESTAMP
ENV REACT_APP_VERSION_HASH=$REACT_APP_VERSION_HASH
ENV REACT_APP_BUILD_TIMESTAMP=$REACT_APP_BUILD_TIMESTAMP

RUN npm run build:demo
RUN cp -r /source/dist /demo

ENV REACT_APP_MICRO="true"
RUN npm run build:cdn

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=node-builder /source/dist /usr/share/nginx/html/esm
COPY --from=node-builder /demo /usr/share/nginx/html/demo

RUN cp /usr/share/nginx/html/demo/mockServiceWorker.js /usr/share/nginx/html/mockServiceWorker.js

EXPOSE 8080
