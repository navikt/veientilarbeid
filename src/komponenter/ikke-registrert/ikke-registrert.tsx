import { Button, Heading, BodyShort, Panel } from '@navikt/ds-react';

import { loggAktivitet } from '../../metrics/metrics';
import { registreringsLenke } from '../../innhold/lenker';
import InViewport from '../in-viewport/in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import * as React from 'react';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import Rad from '../../innhold/rad';

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
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const goto = new URLSearchParams(window.location.search).get('goTo');
    const skalTilRegistrering = goto === 'registrering';

    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til registrering fra IkkeRegistrert', ...amplitudeData });
        window.location.assign(registreringsLenke);
    };

    const kanViseKomponent = skalTilRegistrering && !underOppfolging;

    const infoboks = document.getElementById('registrering-status-informasjon');

    if (!kanViseKomponent) return null;

    if (kanViseKomponent && infoboks) {
        infoboks.scrollIntoView({ block: 'end', inline: 'nearest' });
    }

    return (
        <Rad>
            <Panel border className="ramme blokk-s" id="registrering-status-informasjon">
                <ErRendret loggTekst="Rendrer IkkeRegistrert" />
                <Heading size="medium" level="2" className="blokk-xs">
                    {tekst('header')}
                </Heading>
                <BodyShort className="blokk-s">{tekst('description')}</BodyShort>
                <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                    {tekst('button')}
                </Button>
                <InViewport loggTekst="Viser IkkeRegistrert i viewport" />
            </Panel>
        </Rad>
    );
};

export default IkkeRegistrert;
