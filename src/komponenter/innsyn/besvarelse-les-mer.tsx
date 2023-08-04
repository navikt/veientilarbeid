import { useState } from 'react';
import { ReadMore } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useSprakValg } from '../../contexts/sprak';
import { useBesvarelse } from '../../contexts/besvarelse';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';

import { loggAktivitet } from '../../metrics/metrics';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import OpplysningerFraBesvarelsen from './opplysninger-fra-besvarelsen';

const TEKSTER = {
    nb: {
        header: 'Se alle opplysningene fra registreringen',
    },
    en: {
        header: 'See your answers from the registration as job seeker',
    },
};

const BesvarelseLesMer = () => {
    const [clickedInnsyn, setClickedInnsyn] = useState(false);
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const { besvarelse } = useBesvarelse();
    const brukerregistreringData = useBrukerregistreringData();
    const { amplitudeData } = useAmplitudeData();

    const { manueltRegistrertAv } = brukerregistreringData?.registrering || {};

    const handleClickOpenRegistreringsopplysninger = () => {
        if (!clickedInnsyn) {
            loggAktivitet({ aktivitet: 'Ser opplysninger fra besvarelsen', ...amplitudeData });
            setClickedInnsyn(true);
        }
    };

    return (
        <ReadMore size="medium" header={tekst('header')} onClick={handleClickOpenRegistreringsopplysninger}>
            <OpplysningerFraBesvarelsen besvarelseData={besvarelse} manueltRegistrertAv={manueltRegistrertAv} />
        </ReadMore>
    );
};

export default BesvarelseLesMer;
