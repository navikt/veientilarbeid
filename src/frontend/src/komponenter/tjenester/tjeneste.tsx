import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel';

interface Props {
    tekstId: string;
    lenkeId: string;
}

function Tjeneste({tekstId, lenkeId, intl}: Props & InjectedIntlProps) {
    return (
            <Lenkepanel tittelProps="normaltekst" href={intl.messages[lenkeId]} >
                {intl.messages[tekstId]}
            </Lenkepanel>
    );
}

export default injectIntl(Tjeneste);