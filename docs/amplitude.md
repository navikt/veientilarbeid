# Dokumentasjon av Amplitude i AiA

Aktivitetene i AiA logges til `veientilarbeid.` i PO Arbeid - prod prosjektet.
Hvilke aktiviteter som logges og hvilke ekstra data som sendes med varierer.

[Dashboard for overordnede metrikker](https://analytics.eu.amplitude.com/nav/dashboard/e-1h7ss35)

## veientilarbeid.visning

Brukes for å logge når en komponent har blitt vist (synlig i viewPort).

-   `viser` Komponenten som er vist

## veientilarbeid.aktivitet

Brukes for å logge når arbeidssøkeren har utført en aktiv handling i løsningen.
Den kan for eksempel trigges av en knapp som er trykket på eller en ReadMore som er åpnet.

-   `aktivitet` Beskrivelse av hva arbeissøkeren prøve å oppnå gjennom handlingen som er utført

## veientilarbeid.rendring

Brukes for å logge når en komponent har blitt rendret for arbeidsssøkeren.
I motsetning til `visning` har ikke denne et krav til at komponenten faktisk har vært i arbeidssøkerens viewPort.
Det er i enkelte tilfeller å kunne sammenstille hvor mange som kunne sett komponenten holdt opp mot hvor mange som faktisk har sett den.

-   `rendrer` Beskrivelse an komponenten som rendres

## veientilarbeid.tema

## veientilarbeid.feedback.intro

## veientilarbeid.intro
