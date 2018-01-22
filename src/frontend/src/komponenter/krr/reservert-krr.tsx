import * as React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';

import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import { getIntlText } from '../../utils/utils';

interface ReservertKrrProps {
    intl?: InjectedIntl;
}

function ReservertKrr({intl}: ReservertKrrProps) {
    const infotekst = getIntlText('reservert-krr.infotekst', intl);

    return(
        <AlertStripeInfoSolid className="reserver-krr__alertstripe" >
            <span dangerouslySetInnerHTML={{__html: infotekst}}/>
        </AlertStripeInfoSolid>
    );
}

export default injectIntl(ReservertKrr);