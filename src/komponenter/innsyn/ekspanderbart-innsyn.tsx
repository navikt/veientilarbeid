import { useState } from 'react';
import { Accordion } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import Opplysninger from './registreringsopplysninger';
import { loggAktivitet } from '../../metrics/metrics';
import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        header: 'Se svarene dine fra registreringen',
    },
    en: {
        header: 'See your answers from the registration as job seeker',
    },
};

const EkspanderbartInnsyn = () => {
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const brukerregistreringData = useBrukerregistreringData();
    const amplitudeData = useAmplitudeData();
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse, sisteStilling } =
        brukerregistreringData?.registrering || {};

    const handleClickOpen = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra registreringen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    const visOpplysninger = opprettetDato && besvarelse && teksterForBesvarelse;
    const kanViseKomponent = useErInnloggetArbeidssoker() && visOpplysninger;

    return kanViseKomponent ? (
        <div style={{ margin: '1rem 0' }}>
            <Accordion style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header onClick={handleClickOpen}>{tekst('header')}</Accordion.Header>
                    <Accordion.Content>
                        <Opplysninger
                            opprettetDato={opprettetDato}
                            manueltRegistrertAv={manueltRegistrertAv}
                            besvarelse={besvarelse}
                            teksterForBesvarelse={teksterForBesvarelse}
                            amplitudeData={amplitudeData}
                            sisteStilling={sisteStilling}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    ) : null;
};

export default EkspanderbartInnsyn;
