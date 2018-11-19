import * as React from 'react';
import * as queryString from 'query-string';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import './aap-rad.less';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';
import { findDOMNode } from 'react-dom';

interface AapRadState {
    visAap: boolean;
}

class AapRad extends React.Component<InjectedIntlProps, AapRadState> {

    constructor(props: InjectedIntlProps) {
        super(props);
        this.state = {
            visAap: queryString.parse(window.location.search).visAap === 'true'
        };
    }

    componentDidMount() {
        if (this.state.visAap) {
            findDOMNode(this).scrollIntoView(
                {
                    block: 'start',
                    behavior: 'smooth'
                }
                );
        }
    }

    render() {

        const {messages} = this.props.intl;

        const tekster = {
            rettPaAapPanelTittel: messages['aap-rad-rett-pa-aap-panel-tittel'],
            soketidspunktPanelTittel: messages['aap-rad-soketidspunkt-panel-tittel'],
            tilSoknadKnappUrl: messages['aap-rad-til-soknad-knapp-url']
        };

        return (
            <div className="aap-rad">
                <Systemtittel className="blokk-xl aap-rad--tittel">
                    <FormattedMessage id="aap-rad-tittel"/>
                </Systemtittel>

                <Undertittel className="blokk-s">
                    <FormattedMessage id="aap-rad-ingress-tittel"/>
                </Undertittel>

                <Normaltekst className="blokk-m aap-rad--ingress">
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

                <a className="knapp knapp--hoved aap-rad--til-soknad-knapp" href={tekster.tilSoknadKnappUrl}>
                    <FormattedMessage id="aap-rad-til-soknad-knapp-tekst"/>
                </a>

            </div>
        );
    }

}

export default injectIntl(AapRad);