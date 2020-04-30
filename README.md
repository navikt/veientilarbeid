# Veien til arbeid

Veien til arbeid

# For å kjøre lokalt
 
- `npm ci`
- `npm start`

Dersom testene feiler etter oppdatering av f.eks. Node versjon kan det være lurt å tømme cachen `npm run test -- --clearCache` 

# Som mikrofrontend på Ditt Nav

1. Gå til https://test-login.dev-sbs.nais.io/
2. Velg Uten Id-porten
3. Logg inn med en bruker som er under arbeidsrettet oppfølging i q1
4. Gå til https://www-q1.nav.no/person/dittnav/ i samme vindu

For å gå over til demovisning gå til [/demo/index.html](http://localhost:3002/demo/index.html)

# For å benytte HotJar

Veien til arbeid kan nås på to måter. Som standalone app eller inkludert under dittNAV.
Vi grupperer også brukere i 2 grupper kss (klare seg selv) og boo (bistand og oppfølging).

For å bruke HotJar må du benytte "JavaScript trigger" som du finner under punktet "Behavior" og fanen "Pages".
Innholdet i trigger avgjør hvem som får vist undersøkelsen. Du kan ha flere triggere pr undersøkelse.

`vta-kss` - Veien til arbeid standalone kss bruker
`vta-boo` - Veien til arbeid standalone boo bruker
`vta-dittnav-kss` - Veien til arbeid under dittNAV kss bruker
`vta-dittnav-boo` - Veien til arbeid under dittNAV boo bruker

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles via issues her på github.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #område-arbeid-pilot
