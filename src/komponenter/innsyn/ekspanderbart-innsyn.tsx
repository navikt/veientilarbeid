import { useState } from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import Opplysninger from './registreringsopplysninger';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { loggAktivitet } from '../../metrics/metrics';
import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';

const EkspanderbartInnsyn = () => {
    const [clickedInnsyn, setClickedInnsyn] = useState(false);

    const brukerregistreringData = useBrukerregistreringData();
    const amplitudeData = useAmplitudeData();
    const { opprettetDato, manueltRegistrertAv, besvarelse, teksterForBesvarelse } =
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
            <Ekspanderbartpanel tittel="Se svarene dine fra registreringen" border onClick={handleClickOpen}>
                <Opplysninger
                    opprettetDato={opprettetDato}
                    manueltRegistrertAv={manueltRegistrertAv}
                    besvarelse={besvarelse}
                    teksterForBesvarelse={teksterForBesvarelse}
                    amplitudeData={amplitudeData}
                />
            </Ekspanderbartpanel>
        </div>
    ) : null;
};

export default EkspanderbartInnsyn;
