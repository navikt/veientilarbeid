import { Button, Heading, BodyShort, Panel } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { loggAktivitet } from '../../metrics/metrics';
import { registreringsLenke } from '../../innhold/lenker';
import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import Rad from '../../innhold/rad';
import { useRef } from 'react';

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
        <Rad>
            <Panel border className={spacingStyles.blokkS} ref={infoBoksRef}>
                <ErRendret loggTekst="Rendrer IkkeRegistrert" />
                <Heading size="small" level="2" className={spacingStyles.blokkXs}>
                    {tekst('header')}
                </Heading>
                <BodyShort className={spacingStyles.blokkS}>{tekst('description')}</BodyShort>
                <Button variant="primary" onClick={handleButtonClick} className={spacingStyles.blokkXs}>
                    {tekst('button')}
                </Button>
                <InViewport loggTekst="Viser IkkeRegistrert i viewport" />
            </Panel>
        </Rad>
    );
};

export default IkkeRegistrert;
