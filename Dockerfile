# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as node-builder

ADD / /source
ENV CI=true
WORKDIR /source
RUN npm ci && npm run build

FROM docker.adeo.no:5000/pus/decorator
ENV APPLICATION_NAME=veientilarbeid
COPY --from=node-builder /source/build /app
ADD decorator.yaml /decorator.yaml

ENV OIDC_LOGIN_URL /veilarbstepup/oidc