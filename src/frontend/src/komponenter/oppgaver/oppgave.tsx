import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';

interface Props {
    tittelId: string;
    beskrivelseId: string;
    lenkeId: string;
    className: string;
}

function Oppgave({tittelId, beskrivelseId, lenkeId, className, intl}: Props & InjectedIntlProps) {
    return (
        <a className={className} href={intl.messages[lenkeId]}>
            <h3 className="typo-undertittel"><FormattedMessage id={tittelId}/></h3>
            <div><FormattedMessage id={beskrivelseId}/></div>
        </a>
    );
}

export default injectIntl(Oppgave);