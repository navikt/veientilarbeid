import { BodyShort } from '@navikt/ds-react';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { Sprak, useSprakValg } from '../../contexts/sprak';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';

interface TellerProps {
    ukerRegistrert: number | 'INGEN_DATO' | undefined;
    registrertDato: string | undefined;
}

const TEKSTER = {
    nb: {
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
        over23Uker: 'Du har vært registrert arbeidssøker siden',
    },
    en: {
        0: 'first',
        1: 'second',
        2: 'third',
        3: 'fourth',
        4: 'fifth',
        5: 'sixth',
        6: 'seventh',
        7: 'eight',
        8: 'ninth',
        9: 'tenth',
        10: 'eleventh',
        11: 'twelfth',
        12: 'thirteenth',
        13: 'fourteenth',
        14: 'fifteenth',
        15: 'sixteenth',
        16: 'seventeenth',
        17: 'eighteenth',
        18: 'nineteenth',
        19: 'twentieth',
        20: 'twenty-first',
        21: 'twenty-second',
        22: 'twenty-third',
        23: 'twenty-foruth',
        24: 'twenty-fifth',
        over23Uker: 'You have been registered as unemployed since',
    },
};

const under23Uker = (ukerRegistrert: string, sprak: Sprak) => {
    if (sprak === 'en') {
        return `You are in your ${ukerRegistrert} week as a registered job seeker.`;
    }

    return `Du er inne i din ${ukerRegistrert} uke som registrert arbeidssøker.`;
};

function RegistrertTeller({ ukerRegistrert, registrertDato }: TellerProps) {
    const over23Uker = ukerRegistrert && (ukerRegistrert as number) > 23;
    const sprak = useSprakValg().sprak;

    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    if (ukerRegistrert === undefined) {
        return null;
    }

    if (!over23Uker) {
        return <BodyShort>{under23Uker(tekst(`${ukerRegistrert}`), sprak)}</BodyShort>;
    }

    if (over23Uker && registrertDato) {
        return <BodyShort>{`${tekst('over23Uker')} ${prettyPrintDato(registrertDato, sprak)}`}</BodyShort>;
    }

    return null;
}

export default RegistrertTeller;
