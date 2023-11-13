# Veien til arbeid

Veien til arbeid er en del av "Arbeidsflate for innlogget arbeidssøker".

Den vises som en del av DittNAV dersom du er arbeidssøker under oppfølging.

Innholdet skal i størst mulig grad gjenspeile arbeidssøker situasjon.

# Utvikling

-   Bruk Node.js v18 `nvm use`
-   Klon [repoet](https://github.com/navikt/veientilarbeid)
-   Installer avhengigheter `npm ci`

## For å kjøre lokalt

-   `npm start`
-   besøk [http://localhost:3002/demo/](http://localhost:3002/demo/) for en versjon hvor du kan endre parameter for innlogget arbeidssøker

### Testing

Testmiljøet bruker [Jest](https://jestjs.io/), [Testing Library](https://testing-library.com/) og [Mock Service Worker](https://mswjs.io/)

-   for å starte `npm t`

[//]: # '## Som mikrofrontend på Ditt NAV lokalt'
[//]: #
[//]: # '-   Hent en utgave av [DittNAV](https://github.com/navikt/dittnav)'
[//]: # '-   Start veien til arbeid med `npm run start:micro`'
[//]: # '-   Start dittnav med `npm start`'
[//]: # '-   Gå til http://localhost:9002/person/dittnav'

## Deploy

main deployes til dev og prod når man pusher.

### Deploy kun til dev

For å opprette en branch som skal deployes til dev, prefixer du branchnavnet med `dev/`, f.eks. `dev/min-testbranch`

```
git checkout -b dev/<navn på branch>
```

Branchen blir da deployet til dev når man pusher.

## Som mikrofrontend på Min side i dev

1. Start naisdevice
2. Gå til https://www.dev.nav.no/minside
3. TestID
4. Logg inn med en bruker som er under arbeidsrettet oppfølging i dev

## Som demo i dev

1. Start naisdevice
2. Gå til https://veientilarbeid.intern.dev.nav.no/demo/

### Tips

Dersom testene feiler etter oppdatering av f.eks. Node versjon kan det være lurt å tømme cachen `npm run test -- --clearCache`

# Slik bruker du HotJar i AiA

For å bruke HotJar må du sette opp undersøkelsen til å benytte "Event" som startsignal.
Du finner dette i nedtrekksmenyen under punktet "Targeting" når du velger "Specific pages" fra radiovalget.

Settes eventet til `aia-hotjar` vil HotJar automatisk kjøres fra AiA ved oppstart.

## Begrense undersøkelser til spesielle brukergrupper

Dersom du ønsker at undersøkelsene fra HotJar kun skal treffe visse brukergrupper kan du pakke inn funksjonen `hotjarTriggerEvent` i logikk som som definerer brukergruppen og trigge et annet eventnavn enn `aia-hotjar`.

Deretter setter du opp en undersøkelse med det valgte navnet som eventnavn.

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen [#område-arbeid-paw](https://nav-it.slack.com/archives/CK0RPQ5QB)
