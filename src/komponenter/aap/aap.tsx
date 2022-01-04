import * as React from 'react';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';

import './aap.less';
import { aapSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import Rad from '../../innhold/rad';
import { Heading, Panel, Button, BodyShort, Accordion } from '@navikt/ds-react';

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
            <div className="aap">
                <Heading size="medium" className="blokk-s aap--tittel">
                    {tekster['aap-rad-tittel']}
                </Heading>
                <div className="tokol">
                    <div className="kolonne blokk-m">
                        <Panel border className="panelramme">
                            <Heading size="small" className="blokk-s">
                                {tekster['aap-rad-ingress-tittel']}
                            </Heading>
                            <BodyShort className="blokk-s">{tekster['aap-rad-ingress']}</BodyShort>
                            <Button onClick={handleButtonClick} className="blokk-xs">
                                {tekster['aap-rad-til-soknad-knapp-tekst']}
                            </Button>
                        </Panel>
                    </div>
                    <div className="kolonne blokk-m">
                        <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                            <Accordion.Item>
                                <Accordion.Header>{tekster['aap-rad-rett-pa-aap-panel-tittel']}</Accordion.Header>
                                <Accordion.Content>
                                    <RettPaAapInnhold />
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className="blokk-xs" style={{ background: 'white', borderRadius: '5px' }}>
                            <Accordion.Item>
                                <Accordion.Header>{tekster['aap-rad-soketidspunkt-panel-tittel']}</Accordion.Header>
                                <Accordion.Content>
                                    <SoketidspunktInnhold />
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </Rad>
    );
};

export default Aap;
