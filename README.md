# Veien til arbeid

Veien til arbeid

# For å kjøre lokalt
-   `npm ci`
-   `npm start`

Dersom testene feiler etter oppdatering av f.eks. Node versjon kan det være lurt å tømme cachen `npm run test -- --clearCache`

# Som mikrofrontend på Ditt NAV lokalt

-   Start veien til arbeid med `npm run start:micro`
-   Start dittnav med `npm start`
-   Gå til http://localhost:9002/person/dittnav

# Som mikrofrontend på Ditt NAV i dev

1. Start naisdevice
2. Gå til https://www.dev.nav.no/person/dittnav/
3. Velg IDPorten (ver 2)
4. Logg inn med en bruker som er under arbeidsrettet oppfølging i dev

For å gå over til demovisning gå til [/demo/index.html](http://localhost:3002/demo/index.html)

# Muligheter med HotJar

Veien til arbeid kan nås på to måter. Som standalone app eller inkludert under dittNAV.
Vi grupperer også brukere i 2 grupper kss (klare seg selv) og boo (bistand og oppfølging).

Det ligger også en funksjon `hotjarEksperiment` i [innhold-logik-niva4](src/innhold/innhold-logikk-niva4.tsx) hvor du kan sette opp forutsetninger for et eksperiment.

For å bruke HotJar må du benytte "JavaScript trigger" som du finner under punktet "Behavior" og fanen "Pages".
Innholdet i trigger avgjør hvem som får vist undersøkelsen. Du kan ha flere triggere pr undersøkelse.

-   `vta-kss` - Veien til arbeid standalone kss bruker
-   `vta-boo` - Veien til arbeid standalone boo bruker
-   `vta-dittnav-kss` - Veien til arbeid under dittNAV kss bruker
-   `vta-dittnav-boo` - Veien til arbeid under dittNAV boo bruker
-   `vta-eksperiment` - Veien til arbeid standalone hvor kriteriene satt i `hotjarEksperiment` matcher
-   `vta-dittnav-eksperiment` - Veien til arbeid under dittNAV hvor kriteriene satt i `hotjarEksperiment` matcher

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#område-arbeid-tech](https://nav-it.slack.com/archives/CLTFAEW75)
