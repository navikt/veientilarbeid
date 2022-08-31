# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:16 as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

RUN npm ci

ARG REACT_APP_VERSION_HASH
ARG REACT_APP_BUILD_TIMESTAMP
ENV REACT_APP_VERSION_HASH=$REACT_APP_VERSION_HASH
ENV REACT_APP_BUILD_TIMESTAMP=$REACT_APP_BUILD_TIMESTAMP

RUN npm run build:demo
RUN cp -r /source/dist /demo

RUN npm run build

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=node-builder /source/dist /usr/share/nginx/html/esm
COPY --from=node-builder /demo /usr/share/nginx/html/esm/demo

EXPOSE 8080
