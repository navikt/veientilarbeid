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

interface AapRadState {
    visAap: boolean;
}

class Aap extends React.Component<{}, AapRadState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            visAap: queryString.parse(window.location.search).visAap === 'true'
        };
    }

    handleButtonClick = () => {
        window.location.href = aapSoknadLenke;
    }

    componentDidMount() {
        // Vent til animasjonen til AAP-panelet er ferdig, slik at vi scroller til riktig posisjon
        setTimeout(() => {
            if (this.state.visAap) {
                const aap = document.querySelector('.aap');
                if (aap) {
                    aap.scrollIntoView(
                        {
                            block: 'center',
                            behavior: 'smooth'
                        }
                    );
                }
            }
        }, 300);
    }

    render() {
        return (
            <div className="aap">
                <Systemtittel className="blokk-s aap--tittel">
                    {tekster['aap-rad-tittel']}
                </Systemtittel>
                <div className="tokol">
                    <div className="kolonne blokk-m">
                        <Panel border className="panelramme">
                            <Undertittel className="blokk-s">
                                {tekster['aap-rad-ingress-tittel']}
                            </Undertittel>
                            <Normaltekst className="blokk-s">
                                {tekster['aap-rad-ingress']}
                            </Normaltekst>
                            <Knapp onClick={this.handleButtonClick} className="blokk-xs">
                                {tekster['aap-rad-til-soknad-knapp-tekst']}
                            </Knapp>
                        </Panel>
                    </div>
                    <div className="kolonne blokk-m">
                        <Ekspanderbartpanel
                            tittel={tekster['aap-rad-rett-pa-aap-panel-tittel']}
                            border={true}
                            apen={this.state.visAap}
                        >
                            <RettPaAapInnhold/>
                        </Ekspanderbartpanel>
                        <Ekspanderbartpanel
                            tittel={tekster['aap-rad-soketidspunkt-panel-tittel']}
                            border={true}
                        >
                            <SoketidspunktInnhold/>
                        </Ekspanderbartpanel>
                    </div>
                </div>
            </div>
        );
    }
}

export default Aap;
