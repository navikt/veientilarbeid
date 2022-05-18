import { Heading } from '@navikt/ds-react';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';
import OnboardingStandardStegnummer from '../../onboarding-standard/onboarding-standard-stegnummer';

const TEKSTER = {
    nb: {
        heading: 'Hva slags hjelp kan jeg som er under 30 få?',
    },
    en: {
        heading: "I'm under 30, what kind of help can I get?",
    },
};

function Startkort() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <ErRendret loggTekst="Rendrer 14a pre-state" />
            <Heading size="medium" className={'blokk-xs flex'}>
                <OnboardingStandardStegnummer tall={3} inverted />
                {tekst('heading')}
            </Heading>
            <InViewport loggTekst="Viser 14a pre-state i viewport" />
        </>
    );
}

export default Startkort;
