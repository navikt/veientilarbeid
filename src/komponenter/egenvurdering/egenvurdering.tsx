import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';

import './egenvurdering.less';

class Egenvurdering extends React.Component<InjectedIntlProps> {

    constructor(props: InjectedIntlProps) {
        super(props);
    }

    handleButtonClick = () => {
        window.location.href = this.props.intl.formatMessage({id: 'egenvurdering-lenke-url'});
    };

    render() {
        return (
            <section className="egenvurdering blokk-m">
                <div className="innhold">
                    <Systemtittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="egenvurdering-tittel"/>
                    </Systemtittel>
                    <Normaltekst className="blokk-m egenvurdering__tekst">
                        <FormattedMessage id="egenvurdering-tekst"/>
                    </Normaltekst>
                    <Hovedknapp onClick={this.handleButtonClick}>
                        <FormattedMessage id="egenvurdering-lenke-tekst"/>
                    </Hovedknapp>
                </div>
            </section>
        );
    }
}

export default injectIntl(Egenvurdering);