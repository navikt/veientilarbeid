import { ActionType } from './ducks/actions';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => { // tslint:disable-line:no-any
    const { frontendlogger } = (window as any); // tslint:disable-line:no-any

    const feilTyper = [
        {
            type: ActionType.HENT_OPPFOLGING_FEILET,
            eventnavn: 'veientilarbeid.feil.hentoppfolging',
            apikall: 'GET /startregistrering'
        },
        {
            type: ActionType.FEATURE_TOGGLES_FEILET,
            eventnavn: 'veientilarbeid.feil.featuretoggle',
            apikall: 'GET /veientilarbeid/api/feature'
        },
        {
            type: ActionType.HENT_SERVICEGRUPPE_FEILET,
            eventnavn: 'veientilarbeid.feil.servicegruppe',
            apikall: 'GET /servicegruppe'
        },
        {
            type: ActionType.HENT_SYKMELDT_INFO_FEILET,
            eventnavn: 'veientilarbeid.feil.sykmeldtinfo',
            apikall: 'GET /veilarbregistrering/api/sykmeldtinfo'
        },
        {
            type: ActionType.HENT_JOBBSOKERBESVARELSE_FEILET,
            eventnavn: 'veientilarbeid.feil.jobbsokerbesvarelse',
            apikall: 'GET /jobbsokerbesvarelse'
        },
    ];

    /* Feil logging */
    feilTyper.map((feil) => {
        if (action.type === feil.type) {
            if (frontendlogger) {
                if (!action.data) {
                    frontendlogger.event(feil.eventnavn, {'statusText': 'Action data er undefined'}, {});
                } else {
                    const response = action.data.response || {};
                    const status = response.status;
                    const statusText = response.statusText;
                    const url = response.url;
                    const apikall = feil.apikall;
                    frontendlogger.event(feil.eventnavn, {
                        'useragent': navigator.userAgent,
                        url,
                        apikall,
                        status,
                        statusText,
                        data: action.data
                    },                   {});
                }
            }
        }
    });

    next(action);
};
