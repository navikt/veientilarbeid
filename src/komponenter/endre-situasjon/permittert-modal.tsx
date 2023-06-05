import React, { useEffect, useState } from 'react';
import { BodyShort, Heading, Link, Modal } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';

import Steg2 from './steg2';
import Steg3 from './steg3';
import Steg1 from './steg1';

import spacing from '../../spacing.module.css';

export enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET_PERMITTERINGSPROSENT = 'ENDRET_PERMITTERINGSPROSENT',
    TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    KONKURS = 'KONKURS',
    UAVKLART = 'UAVKLART',
    ANNET = 'ANNET',
}

export enum DinSituasjonSvar {
    MISTET_JOBBEN = 'MISTET_JOBBEN',
    HAR_SAGT_OPP = 'HAR_SAGT_OPP',
    DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
    ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
    VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
    JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
    ER_PERMITTERT = 'ER_PERMITTERT',
    USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
    AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
    VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
}

export const dinSituasjonSvarTekster = {
    [DinSituasjonSvar.MISTET_JOBBEN]: 'Har mistet eller kommer til å miste jobben',
    [DinSituasjonSvar.HAR_SAGT_OPP]: 'Har sagt opp eller kommer til å si opp',
    [DinSituasjonSvar.DELTIDSJOBB_VIL_MER]: 'Har deltidsjobb, men vil jobbe mer',
    [DinSituasjonSvar.ALDRI_HATT_JOBB]: 'Har aldri vært i jobb',
    [DinSituasjonSvar.VIL_BYTTE_JOBB]: 'Har jobb, men vil bytte',
    [DinSituasjonSvar.JOBB_OVER_2_AAR]: 'Har ikke vært i jobb de siste 2 årene',
    [DinSituasjonSvar.ER_PERMITTERT]: 'Er permittert eller kommer til å bli permittert',
    [DinSituasjonSvar.USIKKER_JOBBSITUASJON]: 'Er usikker på jobbsituasjonen min',
    [DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING]: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    [DinSituasjonSvar.VIL_FORTSETTE_I_JOBB]: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
};

export const permittertTekster = {
    [PermittertSvar.OPPSIGELSE]: 'Jeg har fått oppsigelse',
    [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: 'Permitteringsprosenten har endret seg',
    [PermittertSvar.TILBAKE_TIL_JOBB]: 'Skal tilbake til jobben',
    [PermittertSvar.NY_JOBB]: 'Jeg har fått meg ny jobb',
    [PermittertSvar.MIDLERTIDIG_JOBB]: 'Jeg har fått midlertidig jobb',
    [PermittertSvar.KONKURS]: 'Bedriften er konkurs',
    [PermittertSvar.UAVKLART]: 'Arbeidssituasjonen min er uavklart',
    [PermittertSvar.ANNET]: 'Annet',
};

interface PermittertModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: any;
    besvarelse: any | null;
}

const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, amplitudeData, besvarelse } = props;
    const [aktivSide, settAktivSide] = React.useState<number>(1);
    const [valgtSituasjon, settValgtSituasjon] = useState<any>(undefined);
    const [tilleggsData, settTilleggsData] = useState<any>(null);
    const opprinneligSituasjon = besvarelse?.dinSituasjon?.verdi;

    useEffect(() => {
        settAktivSide(1);
    }, [openModal]);

    const Innhold = () => {
        if (aktivSide === 1) {
            return (
                <Steg1
                    valgtSituasjon={valgtSituasjon}
                    opprinneligSituasjon={opprinneligSituasjon}
                    settValgtSituasjon={settValgtSituasjon}
                    onClick={() => settAktivSide(2)}
                />
            );
        }

        if (aktivSide === 2) {
            return (
                <Steg2
                    valgtSituasjon={valgtSituasjon}
                    amplitudeData={amplitudeData}
                    settValgtSituasjon={settValgtSituasjon}
                    settTilleggsData={settTilleggsData}
                    onClick={() => settAktivSide(3)}
                />
            );
        }

        if (aktivSide === 3) {
            return (
                <Steg3
                    valgtSituasjon={valgtSituasjon}
                    tilleggsData={tilleggsData}
                    onClose={() => setOpenModal(false)}
                />
            );
        }

        return null;
    };

    const Tilbake = () => {
        if (aktivSide !== 2) {
            return null;
        }
        // eslint-disable-next-line react/jsx-no-undef
        return (
            <Link href={'#'} onClick={() => settAktivSide(aktivSide - 1)} className={spacing.px0_5}>
                <ChevronLeftIcon /> Tilbake
            </Link>
        );
    };

    return (
        <Modal
            open={openModal}
            aria-label="Jobbsituasjonen min har endret seg"
            onClose={() => setOpenModal((x) => !x)}
            // shouldCloseOnEsc={!datepickerProps.open}
            aria-labelledby="modal-heading"
        >
            <Modal.Content>
                <Tilbake />
                <Heading spacing level="1" size="large" id="modal-heading" className={spacing.mr2}>
                    Min jobbsituasjonen har endret seg
                </Heading>
                <BodyShort className={spacing.mb1}>
                    <small>Steg {aktivSide}/3</small>
                </BodyShort>
                <Innhold />
            </Modal.Content>
        </Modal>
    );
};

export default PermittertModal;
