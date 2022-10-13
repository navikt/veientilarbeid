import { useEffect, useState } from 'react';
import * as React from 'react';
import { Close, SuccessColored } from '@navikt/ds-icons';
import { Button, Detail, Heading, BodyShort, Panel } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { fjernQueryParam } from '../../utils/query-param-utils';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

interface KvitteringProps {
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

function Kvittering(props: KvitteringProps) {
    const svarerJa = props.kvittering && props.kvittering === 'behovsvurderingJa';

    function handleLukkeKvitteringKnapp(event: React.SyntheticEvent, fraKnapp: string) {
        event.preventDefault();
        event.stopPropagation();
        props.lukkerKvittering(`Lukker kvittering fra behovsvurderingen: ${fraKnapp}`);
    }

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <Panel className={`${flexStyles.flex} ${spacingStyles.blokkS} ${spacingStyles.px1_5}`}>
                <span
                    style={{
                        marginRight: '0.5em',
                        position: 'relative',
                        top: '6px',
                        fontSize: 'var(--navds-font-size-heading-medium)',
                    }}
                >
                    <SuccessColored />
                </span>
                <div className={spacingStyles.fullWidth}>
                    <div className={`${flexStyles.flex} ${flexStyles.spaceBetween} ${spacingStyles.blokkXs}`}>
                        <div>
                            <Detail uppercase style={{ marginTop: '-1rem' }}>
                                {tekst('egenvurdering')}
                            </Detail>
                            <Heading size="medium">{tekst('heading')}</Heading>
                        </div>
                        <Button
                            variant="tertiary"
                            size="small"
                            onClick={(e) => handleLukkeKvitteringKnapp(e, 'kryss-knapp')}
                        >
                            <Close color="black" />
                        </Button>
                    </div>

                    {svarerJa && (
                        <div>
                            <BodyShort>{tekst('svar')}</BodyShort>
                        </div>
                    )}
                </div>
            </Panel>
        </>
    );
}

function KvitteringEgenvurdering() {
    const { amplitudeData } = useAmplitudeData();
    const [kvittering, setKvittering] = useState('');
    const [visKomponent, setVisKomponent] = useState(true);

    useEffect(() => {
        setKvittering(new URLSearchParams(window.location.search).get('visKvittering') || '');
    }, []);

    function lukkerKvittering(loggTekst: string) {
        loggAktivitet({ aktivitet: loggTekst, ...amplitudeData });
        fjernQueryParam('visKvittering');
        setVisKomponent(false);
    }

    if (!visKomponent) return null;
    if (!['behovsvurderingJa', 'behovsvurderingNei'].includes(kvittering)) return null;

    return (
        <div>
            <Kvittering lukkerKvittering={lukkerKvittering} kvittering={kvittering} />
            <ErRendret loggTekst="Rendrer kvittering behovsundersøkelse" />
            <InViewport loggTekst="Viser kvittering behovsundersøkelse i viewport" />
        </div>
    );
}

export default KvitteringEgenvurdering;
