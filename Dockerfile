# gjør det mulig å bytte base-image slik at vi får bygd både innenfor og utenfor NAV
ARG BASE_IMAGE_PREFIX=""
FROM ${BASE_IMAGE_PREFIX}node as node-builder

ADD /src/frontend /source
ENV CI=true
WORKDIR /source
RUN npm install && npm run build


FROM ${BASE_IMAGE_PREFIX}maven as maven-builder
ADD / /source
COPY --from=node-builder /source/build /source/src/main/webapp
WORKDIR /source
RUN mvn install




FROM docker.adeo.no:5000/bekkci/nais-java-app
COPY --from=maven-builder /source/target/veientilarbeid /app