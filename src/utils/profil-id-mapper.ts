const ids = {
    har_mottatt_egenvurdering_kvittering: 'aiaHarMottattEgenvurderingKvittering',
    'vta-feedback-intro-meldekort-forklaring': 'aiaFeedbackMeldekortForklaring',
    'vta-feedback-intro-hjelp-og-stotte-forklaring': 'aiaFeedbackHjelpOgStotteForklaring',
    'vta-feedback-intro-hjelp-og-stotte-forklaring-ungdom': 'aiaFeedbackHjelpOgStotteForklaringUngdom',
    'vta-feedback-intro-svar-fra-registreringen': 'aiaFeedbackSvarFraRegistreringen',
    'egenvurdering-avslaatt': 'aiaAvslaattEgenvurdering',
    '12uker-egenvurdering': 'aiaAvslaattEgenvurderingUke12',
    ytelser_tema_vis_key: 'aiaValgtPengestotteVisning',
};

export function hentProfilnokkelFraLocalStorage(id: string) {
    return ids[id];
}
