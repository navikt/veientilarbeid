import * as React from 'react';
import NavAlertStripe, { AlertstripeTypes } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, InjectedIntlProps } from 'react-intl';

interface FeilmeldingProps {
    tekstId: string;
    type?: AlertstripeTypes;
}

function Feilmelding({tekstId, type, intl}: FeilmeldingProps & InjectedIntlProps) {
    const tekst = intl.messages[tekstId];
    return (
        <div className="feilmelding-container">
            <NavAlertStripe type={type ? type : 'advarsel'}>
                <Normaltekst>
                    <span dangerouslySetInnerHTML={{__html: tekst}}/>
                </Normaltekst>
            </NavAlertStripe>
        </div>
    );
}

export default injectIntl(Feilmelding);