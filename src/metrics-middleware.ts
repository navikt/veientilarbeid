import {ActionTypes as OppfolgingTypes } from './ducks/oppfolging';
import {ActionTypes as FeatureTogglesTypes } from './ducks/feature-toggles';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    const { frontendlogger } = (window as any); // tslint:disable-line:no-any

    export const feilTyper = [
        {
            type: OppfolgingTypes.HENT_OPPFOLGING_FEILET,
            eventnavn: 'veientilarbeid.feil.hentoppfolging'
        },
        {
            type: FeatureTogglesTypes.FEATURE_TOGGLES_FEILET,
            eventnavn: 'veientilarbeid.feil.featuretoggle'
        },
    ];

    /* Feil logging */
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            if (frontendlogger) {
                frontendlogger.event(feil.eventnavn,
                                     {'useragent': navigator.userAgent}, {});
            }
        }
    });

    next(action);
};