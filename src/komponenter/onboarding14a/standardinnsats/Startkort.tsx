import { Heading } from '@navikt/ds-react';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';
import OnboardingStandardStegnummer from '../../onboarding-standard/onboarding-standard-stegnummer';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'What kind of help can I get?',
    },
};

function Startkort() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <ErRendret loggTekst="Rendrer 14a pre-state" />
            <Heading size="large" className={'blokk-xs flex'}>
                <OnboardingStandardStegnummer tall={3} inverted />
                {tekst('heading')}
            </Heading>
            <InViewport loggTekst="Viser 14a pre-state i viewport" />
        </>
    );
}

export default Startkort;
