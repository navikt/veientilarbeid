import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import * as queryString from 'query-string';
import { HoyreChevron } from 'nav-frontend-chevron';
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

                <Undertittel className="blokk-s">
                    {tekster['aap-rad-ingress-tittel']}
                </Undertittel>

                <Normaltekst className="blokk-s aap--ingress">
                    {tekster['aap-rad-ingress']}
                </Normaltekst>

                <Ekspanderbartpanel
                    tittel={tekster['aap-rad-rett-pa-aap-panel-tittel']}
                    tittelProps="undertittel"
                    border={true}
                    apen={this.state.visAap}
                >
                    <RettPaAapInnhold/>
                </Ekspanderbartpanel>

                <Ekspanderbartpanel
                    tittel={tekster['aap-rad-soketidspunkt-panel-tittel']}
                    tittelProps="undertittel"
                    border={true}
                >
                    <SoketidspunktInnhold/>
                </Ekspanderbartpanel>

                <Lenke className="aap--til-soknad-knapp" href={aapSoknadLenke}>
                    <Undertittel tag="span">
                        {tekster['aap-rad-til-soknad-knapp-tekst']}
                        <HoyreChevron type={'høyre'} />
                    </Undertittel>
                </Lenke>
            </div>
        );
    }
}

export default Aap;
