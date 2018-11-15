import * as React from 'react';
import { Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import RettPaAapInnhold from './rett-pa-aap-innhold';
import SoketidspunktInnhold from './soketidspunkt-innhold';
import './aap-rad.less';

const AapRad = (props?: InjectedIntlProps) => {

    const { messages } = props!.intl;

    const tekster = {
        rettPaAapPanelTittel: messages['aap-rad-rett-pa-aap-panel-tittel'],
        soknadsTidspunktPanelTittel: messages['aap-rad-soknadstidspunkt-panel-tittel'],
    };

    return (
        <div className="aap-rad">
            <Undertittel>
                <FormattedMessage id="aap-rad-tittel" />
            </Undertittel>

            <Systemtittel>
                <FormattedMessage id="aap-rad-ingress-tittel"/>
            </Systemtittel>

            <Normaltekst>
                <FormattedMessage id="aap-rad-ingress"/>
            </Normaltekst>

            <Ekspanderbartpanel tittel={tekster.rettPaAapPanelTittel} tittelProps="undertittel" border>
                <RettPaAapInnhold/>
            </Ekspanderbartpanel>

            <Ekspanderbartpanel tittel={tekster.soknadsTidspunktPanelTittel} tittelProps="undertittel" border>
                <SoketidspunktInnhold/>
            </Ekspanderbartpanel>

            <a className="knapp knapp--hoved" href="PLACEHOLDER">
                <FormattedMessage id=""/>
            </a>
            
        </div>
    );
};

export default injectIntl(AapRad);