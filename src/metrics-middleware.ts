import { ActionType } from './ducks/actions';

export const metricsMiddleWare = (store: any) => (next: any) => (action: any) => {
    const { frontendlogger } = window as any;

    const feilTyper = [
        {
            type: ActionType.HENT_JOBBSOKERBESVARELSE_FEILET,
            eventnavn: 'veientilarbeid.feil.jobbsokerbesvarelse',
            apikall: 'GET /jobbsokerbesvarelse',
        },
        {
            type: ActionType.HENT_ULESTE_DIALOGER_FEILET,
            eventnavn: 'veientilarbeid.feil.ulestedialoger',
            apikall: 'GET /veilarbdialog/api/dialog/antallUleste',
        },
    ];

    /* Feil logging */
    feilTyper.forEach((feil) => {
        if (action.type === feil.type) {
            if (frontendlogger) {
                if (!action.data) {
                    frontendlogger.event(feil.eventnavn, { statusText: 'Action data er undefined' }, {});
                } else {
                    const response = action.data.response || {};
                    const status = response.status;
                    const statusText = response.statusText;
                    const url = response.url;
                    const apikall = feil.apikall;
                    frontendlogger.event(
                        feil.eventnavn,
                        {
                            useragent: navigator.userAgent,
                            url,
                            apikall,
                            status,
                            statusText,
                            data: action.data,
                        },
                        {}
                    );
                }
            }
        }
    });

    next(action);
};
