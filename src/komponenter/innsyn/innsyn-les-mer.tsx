import { useState } from 'react';
import { ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { loggAktivitet } from '../../metrics/metrics';
import Opplysninger from './registreringsopplysninger';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

const TEKSTER = {
    nb: {
        header: 'Dine opplysninger fra registreringen',
    },
    en: {
        header: 'See your answers from the registration as job seeker',
    },
};

const InnsynLesMer = () => {
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const brukerregistreringData = useBrukerregistreringData();
    const amplitudeData = useAmplitudeData();
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse, sisteStilling } =
        brukerregistreringData?.registrering || {};

    const visOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse;
    const autentiseringData = useAutentiseringData();
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 && visOpplysninger;

    const handleClickOpen = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra registreringen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return kanViseKomponent ? (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpen}>
            <Opplysninger
                opprettetDato={opprettetDato}
                manueltRegistrertAv={manueltRegistrertAv}
                besvarelse={besvarelse}
                teksterForBesvarelse={teksterForBesvarelse}
                amplitudeData={amplitudeData}
                sisteStilling={sisteStilling}
            />
        </ReadMore>
    ) : null;
};

export default InnsynLesMer;
