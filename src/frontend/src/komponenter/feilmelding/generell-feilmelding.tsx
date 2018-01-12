import * as React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';

import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { getIntlText } from '../../utils/utils';

interface GenerellFeilmeldingProps {
    intl?: InjectedIntl;
}

function GenerellFeilmelding({intl}: GenerellFeilmeldingProps) {
    const infotekst = getIntlText('feilmelding.generell', intl);

    return(
        <AlertStripeAdvarselSolid className="feilmelding-generell__alertstripe" >
            <span dangerouslySetInnerHTML={{__html: infotekst}}/>
        </AlertStripeAdvarselSolid>
    );
}

export default injectIntl(GenerellFeilmelding);