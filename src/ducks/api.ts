import { nanoid } from 'nanoid';

import { contextpathDittNav, erMikrofrontend } from '../utils/app-state-utils';
import { bakveienTilArbeidUrl } from './urls';

export enum STATUS {
    OK = 'OK',
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR',
}

export interface DataElement {
    status: STATUS;
}

const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export const requestConfig = (): RequestInit => {
    return {
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
            'NAV-Consumer-Id': 'veientilarbeid',
            'NAV-Call-Id': nanoid(),
        },
    };
};

const contextpath = erMikrofrontend() ? contextpathDittNav : '';

export const BAKVEIEN = `${bakveienTilArbeidUrl}`,
    VEILARBOPPFOLGING_URL = `${BAKVEIEN}/oppfolging`,
    UNDER_OPPFOLGING_URL = `${BAKVEIEN}/underoppfolging`,
    BRUKERINFO_URL = `${BAKVEIEN}/startregistrering`,
    BRUKERREGISTRERING_URL = `${BAKVEIEN}/registrering`,
    ULESTEDIALOGER_URL = `${BAKVEIEN}/dialog/antallUleste`,
    EGENVURDERINGBESVARELSE_URL = `${BAKVEIEN}/vedtakinfo/besvarelse`,
    FEATURE_URL = `${contextpath}/api/feature`,
    MOTESTOTTE_URL = `${BAKVEIEN}/vedtakinfo/motestotte`,
    PAABEGYNTE_SOKNADER_URL = `${contextpath}/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader`,
    SAKSTEMA_URL = `${contextpath}/saksoversikt-api/tjenester/sakstema`,
    DP_INNSYN_URL = `${BAKVEIEN}/dagpenger`,
    NESTE_MELDEKORT_URL = `${BAKVEIEN}/meldekort`,
    MELDEKORTSTATUS_URL = `${BAKVEIEN}/meldekort/status`,
    ARBEIDSSOKERPERIODER_URL = `${BAKVEIEN}/arbeidssoker/perioder?fraOgMed=2020-01-01`,
    GJELDER_FRA_DATO_URL = `${BAKVEIEN}/gjelder-fra`;
