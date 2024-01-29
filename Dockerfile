# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
# ARG BASE_IMAGE_PREFIX=""
# FROM ${BASE_IMAGE_PREFIX}node as node-builder
FROM node:20 as node-builder

ADD / /source
ENV CI=true
WORKDIR /source

# npm run build har blitt kjørt på github før docker build
# kopier output fra npm run build:cdn
RUN cp -r /source/dist /build
RUN cp /source/dist/.vite/* /build

# kopier output fra npm run build:demo
RUN cp -r /source/build /demo


FROM nginx:1.25-alpine
COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=node-builder /build /usr/share/nginx/html/esm
COPY --from=node-builder /demo /usr/share/nginx/html/demo

RUN cp /usr/share/nginx/html/demo/mockServiceWorker.js /usr/share/nginx/html/mockServiceWorker.js

EXPOSE 8080
