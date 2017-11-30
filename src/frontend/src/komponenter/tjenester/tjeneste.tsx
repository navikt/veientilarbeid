import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    tekstId: string;
    className?: string;
    lenkeId: string;
}

function Tjeneste({ className, tekstId, lenkeId, intl}: Props & InjectedIntlProps) {
    return(
        <a className={className} href={intl.messages[lenkeId]}>
            <FormattedMessage id={tekstId} />
        </a>
    );
}

export default injectIntl(Tjeneste);