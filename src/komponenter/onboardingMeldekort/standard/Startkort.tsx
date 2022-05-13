import { Heading } from '@navikt/ds-react';

import ErRendret from '../../er-rendret/er-rendret';
import InViewport from '../../in-viewport/in-viewport';
import lagHentTekstForSprak from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';
import OnboardingStandardStegnummer from '../../onboarding-standard/onboarding-standard-stegnummer';

const TEKSTER = {
    nb: {
        heading: 'Du må sende meldekort',
    },
    en: {
        heading: 'What is an employment status form?',
    },
};
function Startkort() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    return (
        <>
            <ErRendret loggTekst="Rendrer meldekort pre-state" />
            <Heading size="medium" className={'blokk-xs flex'}>
                <OnboardingStandardStegnummer tall={2} inverted />
                {tekst('heading')}
            </Heading>
            <InViewport loggTekst="Viser meldekort pre-state i viewport" />
        </>
    );
}

export default Startkort;
