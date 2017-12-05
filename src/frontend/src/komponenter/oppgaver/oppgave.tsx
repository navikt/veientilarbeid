import * as React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import Lenkeboks from '../lenkeboks/lenkeboks';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    tittelId: string;
    beskrivelseId: string;
    lenkeId: string;
}

function Oppgave({tittelId, beskrivelseId, lenkeId, intl}: Props & InjectedIntlProps) {
    return (
        <Lenkeboks href={intl.messages[lenkeId]}>
            <Undertittel className="lenkeboks-overskrift blokk-m"><FormattedMessage id={tittelId}/></Undertittel>
            <div className="lenkeboks-beskrivelse"><FormattedMessage id={beskrivelseId}/></div>
        </Lenkeboks>
    );
}

export default injectIntl(Oppgave);