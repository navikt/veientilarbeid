import * as React from 'react';
import { Alert } from '@navikt/ds-react';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import './krr-melding.less';
import { difiLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { loggAktivitet } from '../../metrics/metrics';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';

const KrrMelding = () => {
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const { reservasjonKRR } = oppfolgingData;
    const amplitudeData = useAmplitudeData();
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const kanViseKomponent = underOppfolging;

    const handleLenkeKlikk = () => {
        loggAktivitet({ aktivitet: 'Går til krr-oppsett', ...amplitudeData });
    };

    if (!reservasjonKRR || !kanViseKomponent) return null;

    return (
        <Alert variant="warning" className="krr-melding blokk-xs">
            <Normaltekst className="blokk-xs">{tekster['krr-melding-ingress']}</Normaltekst>
            <Normaltekst>{tekster['krr-melding-kulepunkt-ingress']}</Normaltekst>
            <ul>
                <li>
                    <Normaltekst>{tekster['krr-melding-kulepunkt1']}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>{tekster['krr-melding-kulepunkt2']}</Normaltekst>
                </li>
                <li>
                    <Normaltekst>{tekster['krr-melding-kulepunkt3']}</Normaltekst>
                </li>
            </ul>
            <Lenke href={difiLenke} onClick={handleLenkeKlikk}>
                <Normaltekst>{tekster['krr-melding-lenketekst']}</Normaltekst>
            </Lenke>
        </Alert>
    );
};

export default KrrMelding;
