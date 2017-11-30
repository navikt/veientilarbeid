FROM docker.adeo.no:5000/pus/node as npm-builder
ADD /src/frontend /source
ENV CI=true
WORKDIR /source
RUN npm install && npm run build

FROM docker.adeo.no:5000/pus/maven as mvn-builder
ADD / /source
WORKDIR /source
COPY --from=npm-builder /source/build /source/src/main/webapp
RUN mvn package -DskipTests

FROM docker.adeo.no:5000/bekkci/nais-java-app
COPY --from=mvn-builder /source/target/veientilarbeid /app