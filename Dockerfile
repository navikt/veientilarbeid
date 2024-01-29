# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:20 as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

# npm run build har blitt kjørt på github før docker build
RUN cp -r /source/dist /build
RUN cp /source/dist/.vite/* /build

RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}\n@navikt:registry=https://npm.pkg.github.com" >> .npmrc

RUN npm ci

ARG REACT_APP_VERSION_HASH
ARG REACT_APP_BUILD_TIMESTAMP
ENV REACT_APP_VERSION_HASH=$REACT_APP_VERSION_HASH
ENV REACT_APP_BUILD_TIMESTAMP=$REACT_APP_BUILD_TIMESTAMP

RUN npm run build:demo
RUN cp -r /source/dist /demo


FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=node-builder /build /usr/share/nginx/html/esm
COPY --from=node-builder /demo /usr/share/nginx/html/demo

RUN cp /usr/share/nginx/html/demo/mockServiceWorker.js /usr/share/nginx/html/mockServiceWorker.js

EXPOSE 8080
