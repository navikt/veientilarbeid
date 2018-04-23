import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const SPORREUNDERSOKELSE_URL = 'https://goo.gl/forms/PeCcKq1nWdinBx8J2';

function Sporreundersokelse() {
    return (
        <div className="sporreundersokelse">
            <div className="sporreundersokelse__tekster">
                <Systemtittel className="blokk-s">
                    <FormattedMessage id="sporreundersokelse-overskrift"/>
                </Systemtittel>
                <Normaltekst className="blokk-s">
                    <FormattedMessage id="sporreundersokelse-undertekst"/>
                </Normaltekst>
            </div>
            <a href={SPORREUNDERSOKELSE_URL} className="knapp knapp--standard">
                <FormattedMessage id="sporreundersokelse-lenketekst"/>
            </a>
        </div>

    );
}

export default Sporreundersokelse;