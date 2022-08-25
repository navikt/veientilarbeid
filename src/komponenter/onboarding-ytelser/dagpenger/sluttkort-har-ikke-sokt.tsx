import { Button, Heading } from '@navikt/ds-react';
import { Next } from '@navikt/ds-icons';

import { useAmplitudeData } from '../../../contexts/amplitude-context';
import { loggAktivitet } from '../../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../../innhold/lenker';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';
import OnboardingStandardStegnummer from '../../onboarding-standard/onboarding-standard-stegnummer';

const TEKSTER: Tekster<string> = {
    nb: {
        heading: 'Du har ikke sendt inn søknad om dagpenger',
        sok: 'Søk om dagpenger',
    },
    en: {
        heading: 'You have not submitted an application for unemployment benefits',
        sok: 'Apply for unemployment benefits',
    },
};

const Sluttkort = () => {
    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleButtonClick = () => {
        loggAktivitet({
            aktivitet: 'Går til dagpengesøknad fra "dagpenger-tema - ikke søkt dagpenger"',
            ...amplitudeData,
        });
        window.location.assign(dagpengerSoknadLenke);
    };

    return (
        <>
            <Heading size="medium" className={'blokk-xs flex'}>
                <OnboardingStandardStegnummer tall={1} inverted />
                {tekst('heading')}
            </Heading>

            <Button
                variant="secondary"
                onClick={handleButtonClick}
                className="mb-1"
                icon={<Next />}
                iconPosition="right"
            >
                {tekst('sok')}
            </Button>
        </>
    );
};

export default Sluttkort;
