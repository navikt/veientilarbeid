import * as React from 'react';
import * as queryString from 'query-string';
import { Knapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';

import './aap.less';
import { aapSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { useEffect, useRef, useState } from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import Rad from '../../innhold/rad';

const handleButtonClick = () => {
    window.location.href = aapSoknadLenke;
};

const Aap = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const [visAap] = useState(queryString.parse(window.location.search).visAap === 'true');
    const aapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        aapRef?.current?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        });
    }, [aapRef]);

    React.useEffect(() => {
        if (erSykmeldtMedArbeidsgiver) {
            loggAktivitet({ aktivitet: 'Viser aap', ...amplitudeAktivitetsData });
        }
    }, []);

    return !erSykmeldtMedArbeidsgiver ? null : (
        <Rad>
            <div className="aap" ref={aapRef}>
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
                        <Ekspanderbartpanel
                            tittel={tekster['aap-rad-rett-pa-aap-panel-tittel']}
                            border={true}
                            apen={visAap}
                        >
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
