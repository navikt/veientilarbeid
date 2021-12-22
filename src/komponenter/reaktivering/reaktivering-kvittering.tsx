import { useAmplitudeData } from '../../contexts/amplitude-context';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import { Panel, Heading, BodyShort, Link, Button } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';

import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import useVisKvittering from '../../hooks/use-vis-kvittering';
import { fjernQueryParam } from '../../utils/query-param-utils';
import { useEffect, useState } from 'react';

const ReaktiveringKvittering = () => {
    const amplitudeData = useAmplitudeData();
    const [visKomponent, setVisKonponent] = useState(false);
    const visKvittering = useVisKvittering('reaktivering');

    useEffect(() => {
        setVisKonponent(visKvittering);
    }, [visKvittering]);

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        fjernQueryParam('visKvittering');
        setVisKonponent(false);
    }

    function sokDagpenger(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        window.location.assign(dagpengerSoknadLenke);
        fjernQueryParam('visKvittering');
        setVisKonponent(false);
    }

    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        lukkerKvittering('Lukker kvittering etter reaktivering');
    }

    function handleIkkeSokeNaa(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        lukkerKvittering('Skal ikke søke dagpenger nå etter reaktivering');
    }

    function handleSokGjenopptak(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        sokDagpenger('Går til dagpengesøknad etter reaktivering');
    }

    if (!visKomponent) {
        return null;
    }

    return (
        <>
            <Panel className={'blokk-s'} border>
                <div className="flex space-between blokk-s">
                    <div>
                        <Heading size="xsmall" level="1">
                            Dagpenger
                        </Heading>
                        <Heading size="medium">Du må søke om dagpenger på nytt</Heading>
                    </div>
                    <Button variant="tertiary" size="small" onClick={handleLukkeKvitteringKnapp}>
                        <Close color="black" title="Lukk kvittering" />
                    </Button>
                </div>
                <div>
                    <BodyShort className="blokk-xs">
                        Har du mottatt dagpenger vil utbetalingene være stoppet og du må derfor sende inn ny søknad.
                    </BodyShort>
                    <BodyShort className="blokk-xs">
                        Du kan tidligst få dagpenger igjen fra den dagen du sender søknaden.
                    </BodyShort>
                    <Button variant="secondary" onClick={handleSokGjenopptak} className="blokk-xs">
                        Søk dagpenger
                    </Button>
                    <BodyShort>
                        <Link href="#" onClick={handleIkkeSokeNaa}>
                            Skal ikke søke dagpenger nå
                        </Link>
                    </BodyShort>
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer kvittering etter reaktivering" />
            <InViewport loggTekst="Viser kvittering etter reaktivering i viewport" />
        </>
    );
};

export default ReaktiveringKvittering;
