import {ActionTypes as OppfolgingTypes } from './ducks/oppfolging';
import {ActionTypes as FeatureTogglesTypes } from './ducks/feature-toggles';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    const { frontendlogger } = (window as any); // tslint:disable-line:no-any

    const feilTyper = [
        {
            type: OppfolgingTypes.HENT_OPPFOLGING_FEILET,
            eventnavn: 'veientilarbeid.feil.hentoppfolging',
            apikall: '/startregistrering'
        },
        {
            type: FeatureTogglesTypes.FEATURE_TOGGLES_FEILET,
            eventnavn: 'veientilarbeid.feil.featuretoggle',
            apikall: '/feature'
        },
    ];

    /* Feil logging */
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            const response = action.data.response || {};
            const status = response.status;
            const statusText = response.statusText;
            const url = response.url;
            if (frontendlogger) {
                frontendlogger.event(feil.eventnavn, {'useragent': navigator.userAgent, url, status, statusText, data: action.data}, {}); // tslint:disable-line:max-line-length
            }
        }
    });

    next(action);
};