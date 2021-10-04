import React, { useEffect, useState } from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import './behovsvurdering.less';

interface EndStateProps {
    lukkerKvittering: (loggTekst: string) => void;
    sokDagpenger: (loggTekst: string) => void;
    kvittering?: string;
}

function Sluttkort(props: EndStateProps) {
    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering('Lukker kvittering etter reaktivering');
    }

    function handleIkkeSokeNaa(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering('Skal ikke søke dagpenger nå etter reaktivering');
    }

    function handleSokGjenopptak(event: React.SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();
        props.sokDagpenger('Går til dagpengesøknad etter reaktivering');
    }

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'}>Dagpenger</Element>
                    <Systemtittel>Du må søke om dagpenger på nytt</Systemtittel>
                </div>
                <button className="behovsvurdering-lukk-knapp" onClick={handleLukkeKvitteringKnapp}>
                    X
                </button>
            </div>
            <div className="p-1">
                <Normaltekst className="blokk">
                    Har du mottatt dagpenger vil utbetalingene være stoppet og du må derfor sende inn ny søknad.
                </Normaltekst>
                <Normaltekst className="blokk">
                    Du kan tidligst få dagpenger igjen fra den dagen du sender søknaden.
                </Normaltekst>
                <Knapp onClick={handleSokGjenopptak} className="blokk-s">
                    Søk dagpenger
                </Knapp>
                <Normaltekst>
                    <Lenke className="tracking-wide" href="" onClick={handleIkkeSokeNaa}>
                        Skal ikke søke dagpenger nå
                    </Lenke>
                </Normaltekst>
            </div>
        </div>
    );
}

function KvitteringReaktivering({ kvittering }: { kvittering?: string }) {
    const amplitudeData = React.useContext(AmplitudeContext);
    const [visKomponent, setVisKomponent] = useState(false);

    useEffect(() => {
        if (kvittering && kvittering.length > 0) {
            setVisKomponent(true);
        }
    }, [kvittering]);

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        setVisKomponent(false);
    }

    function sokDagpenger(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        window.location.assign(dagpengerSoknadLenke);
        setVisKomponent(false);
    }

    if (!visKomponent) {
        return null;
    }

    const innhold = (
        <div className="behovsvurdering-omslutning blokk-s">
            <Panel className={'behovsvurdering-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort
                        lukkerKvittering={lukkerKvittering}
                        sokDagpenger={sokDagpenger}
                        kvittering={kvittering}
                    />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer kvittering etter reaktivering" />
            <InViewport loggTekst="Viser kvittering etter reaktivering i viewport" />
        </div>
    );

    return innhold;
}

export default KvitteringReaktivering;
