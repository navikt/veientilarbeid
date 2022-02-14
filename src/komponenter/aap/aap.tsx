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

const handleButtonClick = () => {
    window.location.href = aapSoknadLenke;
};

const Aap = () => {
    const { securityLevel } = useAutentiseringData();
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const skjulRadFeaturetoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulAAPRad'];

    const kanViseKomponent = erSykmeldtMedArbeidsgiver && underOppfolging && isLevel4 && !skjulRadFeaturetoggleAktivert;

    return !kanViseKomponent ? null : (
        <Rad>
            <Heading size="medium" className="blokk-s">
                Når du ikke lenger har rett på sykepenger
            </Heading>

            <Panel border className="blokk-xs">
                <Heading size="small" className="blokk-s">
                    Arbeidsavklaringspenger (AAP)
                </Heading>
                <BodyShort className="blokk-s">
                    Arbeidsavklaringspenger erstatter delvis inntekt når du ikke kan jobbe på grunn av sykdom eller
                    skade.
                </BodyShort>
                <Button onClick={handleButtonClick} className="blokk-xs">
                    Til søknad
                </Button>
            </Panel>

            <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header>Har jeg rett på arbeidsavklaringspenger?</Accordion.Header>
                    <Accordion.Content>
                        <RettPaAapInnhold />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>

            <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header>Når bør jeg søke om arbeidsavklaringspenger?</Accordion.Header>
                    <Accordion.Content>
                        <SoketidspunktInnhold />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </Rad>
    );
};

export default Aap;
