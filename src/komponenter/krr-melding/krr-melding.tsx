import * as React from 'react';
import { Alert, BodyShort, Link } from '@navikt/ds-react';
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
            <BodyShort className="blokk-xs">{tekster['krr-melding-ingress']}</BodyShort>
            <BodyShort>{tekster['krr-melding-kulepunkt-ingress']}</BodyShort>
            <ul>
                <li>{tekster['krr-melding-kulepunkt1']}</li>
                <li>{tekster['krr-melding-kulepunkt2']}</li>
                <li>{tekster['krr-melding-kulepunkt3']}</li>
            </ul>
            <Link href={difiLenke} onClick={handleLenkeKlikk}>
                {tekster['krr-melding-lenketekst']}
            </Link>
        </Alert>
    );
};

export default KrrMelding;
