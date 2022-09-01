# Veien til arbeid

Veien til arbeid er en del av "Arbeidsflate for innlogget arbeidssøker".

Den vises som en del av DittNAV dersom du er arbeidssøker under oppfølging.

Innholdet skal i størst mulig grad gjenspeile arbeidssøker situasjon.

# Utvikling

-   Bruk Node.js v16
-   Klon [repoet](https://github.com/navikt/veientilarbeid)
-   Installer avhengigheter `npm ci`

## For å kjøre lokalt

-   `npm start`
-   besøk [http://localhost:3002/demo/](http://localhost:3002/demo/) for en versjon hvor du kan endre parameter for innlogget arbeidssøker

### Testing

Testmiljøet bruker [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/) og [Mock Service Worker](https://mswjs.io/)

-   for å starte `npm t`

## Som mikrofrontend på Ditt NAV lokalt

-   Hent en utgave av [DittNAV](https://github.com/navikt/dittnav)
-   Start veien til arbeid med `npm run start:micro`
-   Start dittnav med `npm start`
-   Gå til http://localhost:9002/person/dittnav

## Som mikrofrontend på Min side i dev

1. Start naisdevice
2. Gå til https://www.dev.nav.no/minside
3. TestID
4. Logg inn med en bruker som er under arbeidsrettet oppfølging i dev

### Tips

Dersom testene feiler etter oppdatering av f.eks. Node versjon kan det være lurt å tømme cachen `npm run test -- --clearCache`

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

Interne henvendelser kan sendes via Slack i kanalen [#område-arbeid-paw](https://nav-it.slack.com/archives/CK0RPQ5QB)
