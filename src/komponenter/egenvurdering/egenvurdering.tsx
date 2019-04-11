import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { gaTilEgenvurdering } from '../../metrics';

import './egenvurdering.less';

class Egenvurdering extends React.Component<InjectedIntlProps> {

    constructor(props: InjectedIntlProps) {
        super(props);
    }

    componentDidMount() {
    }

    handleButtonClick = () => {
        gaTilEgenvurdering();
        window.location.href = this.props.intl.formatMessage({id: 'egenvurdering-lenke-url'});
    }

    render() {
        return (
            <section className="egenvurdering">
                <Systemtittel tag="h1" className="blokk-xs">
                    <FormattedMessage id="egenvurdering-tittel"/>
                </Systemtittel>
                <Normaltekst className="blokk-m egenvurdering__tekst">
                    <FormattedMessage id="egenvurdering-tekst"/>
                </Normaltekst>
                <Hovedknapp onClick={this.handleButtonClick}>
                    <FormattedMessage id="egenvurdering-lenke-tekst"/>
                </Hovedknapp>
            </section>
        );
    }
}

export default injectIntl(Egenvurdering);
