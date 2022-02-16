import * as React from 'react';
import { Heading, Panel, Button, BodyShort, Accordion } from '@navikt/ds-react';

import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';

import { aapSoknadLenke } from '../../innhold/lenker';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import Rad from '../../innhold/rad';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const handleButtonClick = () => {
    window.location.href = aapSoknadLenke;
};

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Når du ikke lenger har rett på sykepenger',
        AAP: 'Arbeidsavklaringspenger (AAP)',
        ingress:
            'Arbeidsavklaringspenger erstatter delvis inntekt når du ikke kan jobbe på grunn av sykdom eller skade.',
        tilSoknadKnapp: 'Til søknad',
        rettPaAAP: 'Har jeg rett på arbeidsavklaringspenger?',
        soketidspunkt: 'Når bør jeg søke om arbeidsavklaringspenger?',
    },
};

const Aap = () => {
    const { securityLevel } = useAutentiseringData();
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const skjulRadFeaturetoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulAAPRad'];

    const kanViseKomponent = erSykmeldtMedArbeidsgiver && underOppfolging && isLevel4 && !skjulRadFeaturetoggleAktivert;

    return !kanViseKomponent ? null : (
        <Rad>
            <Heading size="medium" className="blokk-s">
                {tekst('tittel')}
            </Heading>

            <Panel border className="blokk-xs">
                <Heading size="small" className="blokk-s">
                    {tekst('AAP')}
                </Heading>
                <BodyShort className="blokk-s">{tekst('ingress')}</BodyShort>
                <Button onClick={handleButtonClick} className="blokk-xs">
                    {tekst('tilSoknadKnapp')}
                </Button>
            </Panel>

            <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header> {tekst('rettPaAAP')}</Accordion.Header>
                    <Accordion.Content>
                        <RettPaAapInnhold />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header>{tekst('soketidspunkt')}</Accordion.Header>
                    <Accordion.Content>
                        <SoketidspunktInnhold />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Rad>
    );
};

export default Aap;
