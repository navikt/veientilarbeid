import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import * as queryString from 'query-string';
import { HoyreChevron } from 'nav-frontend-chevron';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';

import './aap.less';
import lenker from '../../innhold/lenker';

interface AapRadState {
    visAap: boolean;
}

class Aap extends React.Component<InjectedIntlProps, AapRadState> {

    constructor(props: InjectedIntlProps) {
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
        const {messages} = this.props.intl;

        const tekster = {
            rettPaAapPanelTittel: messages['aap-rad-rett-pa-aap-panel-tittel'],
            soketidspunktPanelTittel: messages['aap-rad-soketidspunkt-panel-tittel'],
        };

        return (
            <div className="aap">
                <Systemtittel className="blokk-xl aap--tittel">
                    <FormattedMessage id="aap-rad-tittel"/>
                </Systemtittel>

                <Undertittel className="blokk-s">
                    <FormattedMessage id="aap-rad-ingress-tittel"/>
                </Undertittel>

                <Normaltekst className="blokk-m aap--ingress">
                    <FormattedMessage id="aap-rad-ingress"/>
                </Normaltekst>

                <Ekspanderbartpanel
                    tittel={tekster.rettPaAapPanelTittel}
                    tittelProps="undertittel"
                    border={true}
                    apen={this.state.visAap}
                >
                    <RettPaAapInnhold/>
                </Ekspanderbartpanel>

                <Ekspanderbartpanel
                    tittel={tekster.soketidspunktPanelTittel}
                    tittelProps="undertittel"
                    border={true}
                >
                    <SoketidspunktInnhold/>
                </Ekspanderbartpanel>

                <Lenke className="aap--til-soknad-knapp" href={lenker.aap_soknad}>
                    <Undertittel tag="span">
                        <FormattedMessage id="aap-rad-til-soknad-knapp-tekst"/>
                        <HoyreChevron type={'høyre'} />
                    </Undertittel>
                </Lenke>
            </div>
        );
    }
}

export default injectIntl(Aap);
