# Endring i situasjon - pilot

## Hvem er omfattes av piloten?

-   arbeidssøkere som er registrert som permittert fra og med 01. februar 2023
-   og er tilknyttet NOE (standard innsats mellom 30 og 59 år)

## Hva kan de endre?

De får en knapp som heter "Jobbsituasjonen min har endret seg".
Deretter får de en modal hvor de velge mellom de vanligste utgangssituasjonen for permitterte, legge til noen tilleggsopplysninger og til sist får de en kort veiledning om veien videre.

## Hvordan formidles endringene til NAV?

Det genereres en dialog på bakgrunn av informasjonen som er oppgitt som sendes til veilederen.

## Måleparameter

### ReadMore på veiledningssidene

-   veientilarbeid.aktivitet
-   aktivitet: 'Leser dagpengeveiledning' | 'Leser registreringsveiledning'
-   komponent: 'TILBAKE_TIL_JOBB' | 'OPPSIGELSE' | 'ENDRET_PERMITTERINGSPROSENT' | 'SAGT_OPP' | 'ANNET'

Dette vil gi en oversikt over hvorvidt de har åpnet ReadMore for dagpenger eller arbeidssøkerregistrering og hvilken jobbsituasjon de har sagt de har vært i da de åpnet den.

### Visning av komponent

-   aia.inviewport
-   viser: 'Viser endring av situasjon'

Dette vil vise hvor mange som har hatt komponenten i viewPort (hatt den inne på skjermen sin)

### Rendring av komponent

-   veientilarbeid.rendring
-   rendrer: 'Rendrer endring av situasjon'

Dette vil vise hvor mange som har fått rendret komponenten (uten nødvendigvis å ha sett den)

### Bruk av komponent

-   veientilarbeid.aktivitet
-   aktivitet: 'Åpner modal for å endre jobbsituasjon'
-   komponent: 'Min situasjon'

Dette viser hvor mange som har trykket på knappen "Jobbsituasjonen min har endret seg" for å endre jobbsituasjonen sin.

---

-   veientilarbeid.aktivitet
-   aktivitet: 'Åpner modal for å lese veiledning igjen'
-   komponent: 'Min situasjon'

Dette viser hvor mange som har trykket på lenken "Les om igjen hva denne endringen betyr for deg" for å lese veiledningen etter endring av situasjon påny

---

-   veientilarbeid.aktivitet
-   aktivitet: 'Går til endre andre opplysninger'
-   komponent: 'Min situasjon'

Dette viser hvor mange som har trykket på lenken "gi beskjed til NAV" for å endre andre forhold i situasjonen sin.

### Bruk av tabs

-   veientilarbeid.aktivitet
-   aktivitet: 'Bytter til Min situasjon | Hjelp og støtte | Pengestøtte | Meldekort',
-   komponent: 'tabs'

Viser hvor mange som har byttet til de ulik tabene

### Har lastet opp dokumentasjon

### Bruk av lenker
