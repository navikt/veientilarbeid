import { Alert, BodyShort, Button } from '@navikt/ds-react';
import { useState } from 'react';

import { DinSituasjonSvar } from '../../contexts/brukerregistrering';
import { dinSituasjonSvarTekster, PermittertSvar, permittertTekster } from '../../models/endring-av-situasjon';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import { loggAktivitet } from '../../metrics/metrics';
import Veiledning from './veiledning';
import TilleggsData from '../innsyn/tilleggsdata';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

export interface Steg3Props {
    amplitudeData: AmplitudeData;
    valgtSituasjon: PermittertSvar | DinSituasjonSvar;
    tilleggsData?: any;
    onClose(): void;
}

const Steg3 = (props: Steg3Props) => {
    const [openedDagpenger, setOpenedDagpenger] = useState(false);
    const [openedRegistrering, setOpenedRegistrering] = useState(false);
    const { valgtSituasjon, onClose, tilleggsData, amplitudeData } = props;
    const headingTekst = permittertTekster[valgtSituasjon] || dinSituasjonSvarTekster[valgtSituasjon];

    const handleReadmoreDagpenger = (komponent: string) => {
        if (!openedDagpenger) {
            loggAktivitet({
                aktivitet: 'Leser dagpengeveiledning',
                komponent,
                ...amplitudeData,
            });
            setOpenedDagpenger(true);
        }
    };

    const handleReadmoreRegistrering = (komponent: string) => {
        if (!openedRegistrering) {
            loggAktivitet({
                aktivitet: 'Leser registreringsveiledning',
                komponent,
                ...amplitudeData,
            });
            setOpenedRegistrering(true);
        }
    };

    return (
        <>
            <Alert variant="info" className={spacing.mb1}>
                NAV har mottatt følgende oppdateringer:
                <div className={spacing.mv1}>
                    <BodyShort>{headingTekst}</BodyShort>
                    <TilleggsData verdi={valgtSituasjon} tilleggsData={tilleggsData} />
                </div>
            </Alert>
            <Veiledning
                valgtSituasjon={valgtSituasjon}
                tilleggsData={tilleggsData}
                handleReadmoreRegistrering={handleReadmoreRegistrering}
                handleReadmoreDagpenger={handleReadmoreDagpenger}
            />
            <div className={`${flex.flex} ${flex.flexEnd}`}>
                <Button variant={'primary'} onClick={onClose}>
                    Lukk
                </Button>
            </div>
        </>
    );
};

export default Steg3;
