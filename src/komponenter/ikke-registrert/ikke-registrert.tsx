import { BodyShort, Box, Button, Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { loggAktivitet } from '../../metrics/metrics';
import { registreringsLenke } from '../../innhold/lenker';
import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { useRef } from 'react';
import styles from '../../innhold/innhold.module.css';

const TEKSTER = {
    nb: {
        header: 'Du er ikke registrert som arbeidssøker',
        description: 'Vi kan ikke se at du er registrert som arbeidssøker hos oss.',
        button: 'Registrer deg som arbeidssøker',
    },
    en: {
        header: 'You are not registered as job seeker',
        description: 'We can not see you are registered as a job seeker in our systems',
        button: 'Register as job seeker',
    },
};

const IkkeRegistrert = () => {
    const goto = new URLSearchParams(window.location.search).get('goTo');
    const harRegistreringUrlParameter = goto === 'registrering';
    const infoBoksRef = useRef<HTMLDivElement>(null);

    const { amplitudeData } = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til registrering fra IkkeRegistrert', ...amplitudeData });
        window.location.assign(registreringsLenke);
    };

    const kanViseKomponent = harRegistreringUrlParameter;

    if (!kanViseKomponent) return null;

    if (kanViseKomponent && infoBoksRef.current) {
        infoBoksRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
    }

    return (
        <div className={styles.limitCenter}>
            <Box className={spacingStyles.blokkS} ref={infoBoksRef} borderWidth="1">
                <ErRendret loggTekst="Rendrer IkkeRegistrert" />
                <Heading size="small" level="2" className={spacingStyles.blokkXs}>
                    {tekst('header')}
                </Heading>
                <BodyShort className={spacingStyles.blokkS}>{tekst('description')}</BodyShort>
                <Button variant="primary" onClick={handleButtonClick} className={spacingStyles.blokkXs}>
                    {tekst('button')}
                </Button>
                <InViewport loggTekst="Viser IkkeRegistrert i viewport" />
            </Box>
        </div>
    );
};

export default IkkeRegistrert;
