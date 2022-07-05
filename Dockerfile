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

RUN npm run build:esm-demo
RUN cp -r /source/dist /esmdemo

RUN npm run build:esm

FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node-builder /source/build /usr/share/nginx/html
COPY --from=node-builder /source/build/index.html /usr/share/nginx/html/demo/index.html
COPY --from=node-builder /micro/static /usr/share/nginx/html/micro/static
COPY --from=node-builder /source/dist /usr/share/nginx/html/esm
COPY --from=node-builder /esmdemo /usr/share/nginx/html/esm/demo

RUN cp /usr/share/nginx/html/esm/demo/demo.html /usr/share/nginx/html/esm/demo/index.html
RUN rm /usr/share/nginx/html/index.html

EXPOSE 8080
