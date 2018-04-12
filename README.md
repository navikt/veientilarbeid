### Kjøre lokalt i docker

1. `docker build -t <navn> .`
2. `docker run -p 8080:8080 -t -e APPRES_CMS_URL=http://localhost:8080 <navn>`
