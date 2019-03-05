import * as React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import { klikkPaSoknadDagpenger, visInfoOmDagpenger } from '../../metrics';
import { visRettTilDagPenger } from '../../utils/utils';

import './dagpenger.less';

class Dagpenger extends React.Component<InjectedIntlProps> {

    constructor(props: InjectedIntlProps) {
        super(props);
    }

    componentDidMount() {
        if (visRettTilDagPenger(location.search)) {
            this.scrollTilInformasjonsmodul();
            visInfoOmDagpenger();
        }
    }

    handleButtonClick = () => {
        klikkPaSoknadDagpenger(visRettTilDagPenger(location.search));
        window.location.href = this.props.intl.formatMessage({id: 'dagpenger-lenke-url'});
    }

    scrollTilInformasjonsmodul() {
        setTimeout(
            () => {
                const isSupported = 'scrollBehavior' in document.documentElement.style;
                const target = document.getElementById('informasjonsmodul');
                if (target) {
                    if (isSupported) {
                        window.scrollTo({'behavior': 'smooth', 'top': target.offsetTop});
                    } else {
                        window.scrollTo(0, target.offsetTop);
                    }
                }
            },
            400
        );
    }

    render() {
        return (
            <section className="dagpenger blokk-xl" id="informasjonsmodul">
                <div className="limit">
                    <Innholdstittel tag="h1" className="blokk-xs">
                        <FormattedMessage id="dagpenger-tittel"/>
                    </Innholdstittel>
                    <Normaltekst className="blokk-m dagpenger__tekst">
                        <FormattedMessage id="dagpenger-tekst"/>
                    </Normaltekst>
                    <Hovedknapp onClick={this.handleButtonClick}>
                        <FormattedMessage id="dagpenger-lenke-tekst"/>
                    </Hovedknapp>
                </div>
            </section>
        );
    }
}

export default injectIntl(Dagpenger);
