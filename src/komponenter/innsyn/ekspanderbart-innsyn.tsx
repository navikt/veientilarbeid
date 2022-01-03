import { useState } from 'react';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import Opplysninger from './registreringsopplysninger';
import { Accordion } from '@navikt/ds-react';
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
            <Accordion style={{ background: 'white', borderRadius: '5px' }}>
                <Accordion.Item>
                    <Accordion.Header onClick={handleClickOpen}>Se svarene dine fra registreringen</Accordion.Header>
                    <Accordion.Content>
                        <Opplysninger
                            opprettetDato={opprettetDato}
                            manueltRegistrertAv={manueltRegistrertAv}
                            besvarelse={besvarelse}
                            teksterForBesvarelse={teksterForBesvarelse}
                            amplitudeData={amplitudeData}
                        />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    ) : null;
};

export default EkspanderbartInnsyn;
