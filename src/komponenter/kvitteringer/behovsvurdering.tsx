import { useEffect, useState } from 'react';
import * as React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import './behovsvurdering.less';
import { SuccessFilled } from '@navikt/ds-icons';
import { Knapp } from 'nav-frontend-knapper';

interface EndStateProps {
    lukkerKvittering: (loggTekst: string) => void;
    kvittering?: string;
}

function Sluttkort(props: EndStateProps) {
    const svarerJa = props.kvittering && props.kvittering === 'behovsvurderingJa';

    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent, fraKnapp: string) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering(`Lukker kvittering fra behovsvurderingen: ${fraKnapp}`);
    }

    return (
        <div className={'sluttkort'}>
            <div className="p-1 flex space-between">
                <div>
                    <Element tag={'h1'} className="p-1">
                        Egenvurdering
                    </Element>
                    <div className={'behovsvurdering-kort'}>
                        <div className="flex behovsvurdering-header">
                            <Systemtittel>
                                <SuccessFilled color="currentColor" className={'mr-05 nav-oransje'} />
                                Svaret ditt er delt med din veileder
                            </Systemtittel>{' '}
                            <button
                                className="behovsvurdering-lukk-knapp"
                                onClick={(e) => handleLukkeKvitteringKnapp(e, 'kryss-knapp')}
                            >
                                X
                            </button>
                        </div>
                        {svarerJa && (
                            <div className="behovsvurdering-innhold">
                                <Normaltekst>Du får svar i løpet av noen dager.</Normaltekst>
                            </div>
                        )}
                        <div className="behovsvurdering-innhold">
                            <Knapp onClick={(e) => handleLukkeKvitteringKnapp(e, 'ok-knapp')}>Ok</Knapp>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Kvittering({ kvittering }: { kvittering?: string }) {
    const amplitudeData = useAmplitudeData();
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

    if (!visKomponent) {
        return null;
    }

    const innhold = (
        <div className="behovsvurdering-omslutning blokk-s">
            <Panel className={'behovsvurdering-intro'} border>
                <div className={'overall-wrapper'}>
                    <Sluttkort lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
                </div>
            </Panel>
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );

    return innhold;
}

export default Kvittering;
