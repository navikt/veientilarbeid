import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';

import './aap.less';
import { aapSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AutentiseringContext, InnloggingsNiva } from '../../contexts/autentisering';
import { BrukerInfoContext } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { FeaturetoggleContext } from '../../contexts/feature-toggles';
import Rad from '../../innhold/rad';

const handleButtonClick = () => {
    window.location.href = aapSoknadLenke;
};

const Aap = () => {
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    const isLevel4 = securityLevel === InnloggingsNiva.LEVEL_4;
    const skjulRadFeaturetoggleAktivert = featuretoggleData && featuretoggleData['veientilarbeid.rydding.skjulAAPRad'];

    const kanViseKomponent = erSykmeldtMedArbeidsgiver && underOppfolging && isLevel4 && !skjulRadFeaturetoggleAktivert;

    return !kanViseKomponent ? null : (
        <Rad>
            <div className="aap">
                <Systemtittel className="blokk-s aap--tittel">{tekster['aap-rad-tittel']}</Systemtittel>
                <div className="tokol">
                    <div className="kolonne blokk-m">
                        <Panel border className="panelramme">
                            <Undertittel className="blokk-s">{tekster['aap-rad-ingress-tittel']}</Undertittel>
                            <Normaltekst className="blokk-s">{tekster['aap-rad-ingress']}</Normaltekst>
                            <Knapp onClick={handleButtonClick} className="blokk-xs">
                                {tekster['aap-rad-til-soknad-knapp-tekst']}
                            </Knapp>
                        </Panel>
                    </div>
                    <div className="kolonne blokk-m">
                        <Ekspanderbartpanel tittel={tekster['aap-rad-rett-pa-aap-panel-tittel']} border={true}>
                            <RettPaAapInnhold />
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel tittel={tekster['aap-rad-soketidspunkt-panel-tittel']} border={true}>
                            <SoketidspunktInnhold />
                        </Ekspanderbartpanel>
                    </div>
                </div>
            </div>
        </Rad>
    );
};

export default Aap;
