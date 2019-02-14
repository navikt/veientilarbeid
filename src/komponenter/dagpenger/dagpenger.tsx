import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';

import './dagpenger.less';

const Dagpenger = injectIntl(({intl}) => {

    const handleButtonClick = () => {
        window.location.href = intl.formatMessage({id: 'dagpenger-lenke-url'});
    };

    return (
        <section className="dagpenger">
            <Innholdstittel tag="h1" className="blokk-xs">
                <FormattedMessage id="dagpenger-tittel"/>
            </Innholdstittel>
            <Normaltekst className="blokk-m dagpenger__tekst">
                <FormattedMessage id="dagpenger-tekst"/>
            </Normaltekst>
            <Hovedknapp onClick={handleButtonClick}>
                <FormattedMessage id="dagpenger-lenke-tekst"/>
            </Hovedknapp>
        </section>
    );
});

export default Dagpenger;
