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

For å se bruken av ReadMore på veiledningssiden kan du sette opp følgende:

veientilarbeid.aktivitet
aktivitet: 'Leser dagpengeveiledning' || 'Leser registreringsveiledning'
komponent: 'TILBAKE_TIL_JOBB' || 'OPPSIGELSE' || 'ENDRET_PERMITTERINGSPROSENT' || 'SAGT_OPP' || 'ANNET'

Dette vil gi en oversikt over hvorvidt de har åpnet ReadMore og dagpenger eller arbeidssøkerregistrering og hvilken jobbsituasjon de har sagt de har vært i da de åpnet den.
