const ids = {
    har_mottatt_egenvurdering_kvittering: 'aiaHarMottattEgenvurderingKvittering',
    'meldekort-forklaring': 'aiaFeedbackMeldekortForklaring',
    'hjelp-og-stotte-forklaring': 'aiaFeedbackHjelpOgStotteForklaring',
    'hjelp-og-stotte-forklaring-ungdom': 'aiaFeedbackHjelpOgStotteForklaringUngdom',
    'svar-fra-registreringen': 'aiaFeedbackSvarFraRegistreringen',
    'egenvurdering-avslaatt': 'aiaAvslaattEgenvurdering',
    '12uker-egenvurdering': 'aiaAvslaattEgenvurderingUke12',
    ytelser_tema_vis_key: 'aiaValgtPengestotteVisning',
};

export function hentProfilnokkelFraLocalStorage(id: string) {
    return ids[id];
}
