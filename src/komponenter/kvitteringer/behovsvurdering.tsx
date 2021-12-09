import { useEffect } from 'react';
import * as React from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import './behovsvurdering.less';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import { fjernQueryParam } from '../../utils/query-param-utils';
import { Alert, Button, Label, Heading, BodyShort } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';

export const HAR_MOTTATT_EGENVURDERING_KVITTERING = 'har_mottatt_egenvurdering_kvittering';

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

    useEffect(() => {
        settIBrowserStorage(HAR_MOTTATT_EGENVURDERING_KVITTERING, 'true');
    }, []);

    return (
        <div>
            <Label className="p-1">Egenvurdering</Label>
            <div className={'behovsvurdering-kort'}>
                <div className="flex behovsvurdering-header">
                    <Alert inline variant="success" size="medium">
                        {/* <SuccessFilled color="currentColor" className={'mr-05 nav-oransje'} /> */}
                        <Heading size="medium"> Svaret ditt er delt med din veileder</Heading>
                    </Alert>{' '}
                    <Button
                        variant="tertiary"
                        size="small"
                        onClick={(e) => handleLukkeKvitteringKnapp(e, 'kryss-knapp')}
                    >
                        <Close color="black" />
                    </Button>
                </div>

                <div className="behovsvurdering-innhold">
                    {svarerJa && (
                        <BodyShort size="small" className="blokk-xs">
                            Du får svar i løpet av noen dager.
                        </BodyShort>
                    )}
                    <Button
                        variant="secondary"
                        style={{ padding: '0.5rem 2.5rem' }}
                        onClick={(e) => handleLukkeKvitteringKnapp(e, 'ok-knapp')}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    );
}

function Kvittering({ kvittering, onClose }: { kvittering?: string; onClose: () => void }) {
    const amplitudeData = useAmplitudeData();

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        fjernQueryParam('visKvittering');
        onClose();
    }

    return (
        <div className="behovsvurdering-omslutning blokk-s">
            <div className={'behovsvurdering-intro'}>
                <div className={'overall-wrapper'}>
                    <Sluttkort lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
                </div>
            </div>
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );
}

export default Kvittering;
