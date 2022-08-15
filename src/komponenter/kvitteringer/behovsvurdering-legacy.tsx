import { useEffect } from 'react';
import * as React from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { settIBrowserStorage } from '../../utils/browserStorage-utils';
import { fjernQueryParam } from '../../utils/query-param-utils';
import { Alert, Button, Label, Heading, BodyShort, Grid, Cell, Panel } from '@navikt/ds-react';
import { Close } from '@navikt/ds-icons';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

export const HAR_MOTTATT_EGENVURDERING_KVITTERING = 'har_mottatt_egenvurdering_kvittering';

interface EndStateProps {
    lukkerKvittering: (loggTekst: string) => void;
    kvittering?: string;
}

const TEKSTER: Tekster<string> = {
    nb: {
        egenvurdering: 'Egenvurdering',
        heading: 'Svaret ditt er delt med din veileder',
        svar: 'Du får svar i løpet av noen dager.',
        ok: 'Ok',
    },
    en: {
        egenvurdering: 'Self assessment',
        heading: 'Your answer has been shared with your counselor',
        svar: 'You will get a reply within a couple of days.',
        ok: 'Ok',
    },
};

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

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <div className="paxs">
                <Label>{tekst('egenvurdering')}</Label>
            </div>
            <Panel>
                <Grid className="blokk-xs">
                    <Cell xs={10} style={{ alignSelf: 'center', justifySelf: 'center' }}>
                        <Alert inline variant="success" size="medium">
                            {/* <SuccessFilled color="currentColor" className={'mr-05 nav-oransje'} /> */}
                            <Heading size="medium">{tekst('heading')}</Heading>
                        </Alert>
                    </Cell>
                    <Cell xs={2}>
                        <Button
                            variant="tertiary"
                            size="small"
                            onClick={(e) => handleLukkeKvitteringKnapp(e, 'kryss-knapp')}
                        >
                            <Close color="black" />
                        </Button>
                    </Cell>
                </Grid>

                {svarerJa && (
                    <BodyShort size="small" className="blokk-xs">
                        {tekst('svar')}
                    </BodyShort>
                )}
                <Button
                    variant="secondary"
                    // style={{ padding: '0.5rem 2.5rem', width: '100%' }}
                    onClick={(e) => handleLukkeKvitteringKnapp(e, 'ok-knapp')}
                >
                    {tekst('ok')}
                </Button>
            </Panel>
        </>
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
        <div className="tema-container">
            <Sluttkort lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );
}

export default Kvittering;
