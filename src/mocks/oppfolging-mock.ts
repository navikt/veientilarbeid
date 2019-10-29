// For brukere med servicegruppekode 'BATT' (spesielt tilpasset) og 'BFORM' (situasjonsbestemt) skal
// komponent Tiltakinfo vises på veien til arbeid
// For brukere med andre servicegruppekoder blir komponenten skjult for bruker

export default {
    underOppfolging: true,
    kanReaktiveres: false,
    reservasjonKRR: false,
    servicegruppe: 'IVURD',
    formidlingsgruppe: 'ARBS'
};
