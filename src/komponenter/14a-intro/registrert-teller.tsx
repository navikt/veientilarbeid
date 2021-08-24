import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';

interface TellerProps {
    ukerRegistrert: number | 'INGEN_DATO';
    registrertDato: string | undefined;
}

function RegistrertTeller({ ukerRegistrert, registrertDato }: TellerProps) {
    const ordenstall = {
        0: 'første',
        1: 'andre',
        2: 'tredje',
        3: 'fjerde',
        4: 'femte',
        5: 'sjette',
        6: 'sjuende',
        7: 'åttende',
        8: 'niende',
        9: 'tiende',
        10: 'ellevte',
        11: 'tolvte',
        12: 'trettende',
        13: 'fjortende',
        14: 'femtende',
        15: 'sekstende',
        16: 'syttende',
        17: 'attende',
        18: 'nittende',
        19: 'tjuende',
        20: 'tjueførste',
        21: 'tjueandre',
        22: 'tjuetredje',
        23: 'tjuefjerde',
        24: 'tjuefemte',
    };
    const over23Uker = ukerRegistrert > 23;
    let setning = '';
    if (!over23Uker) {
        setning = `Du er inne i din ${ordenstall[ukerRegistrert]} uke som registrert arbeidssøker.`;
    }
    if (over23Uker && registrertDato) {
        setning = `Du har vært registrert arbeidssøker siden ${registrertDato}`;
    }
    if (setning === '') return null;

    return <Normaltekst className={'blokk-xs'}>{setning}</Normaltekst>;
}

export default RegistrertTeller;
