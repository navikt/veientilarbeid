import { BodyShort, Heading, Link, Modal } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';
import spacing from '../../spacing.module.css';
import React, { useEffect, useState } from 'react';
import Steg2 from './steg2';
import Steg3 from './steg3';
import Steg1 from './steg1';

export enum PermittertSvar {
    OPPSIGELSE = 'OPPSIGELSE',
    ENDRET_PERMITTERINGSPROSENT = 'ENDRET_PERMITTERINGSPROSENT',
    TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
    NY_JOBB = 'NY_JOBB',
    MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
    UAVKLART = 'UAVKLART',
    ANNET = 'ANNET',
}

export const permittertTekster = {
    [PermittertSvar.OPPSIGELSE]: 'Jeg har fått oppsigelse',
    [PermittertSvar.ENDRET_PERMITTERINGSPROSENT]: 'Permitteringsprosenten har endret seg',
    [PermittertSvar.TILBAKE_TIL_JOBB]: 'Skal tilbake til jobben',
    [PermittertSvar.NY_JOBB]: 'Jeg har fått meg ny jobb',
    [PermittertSvar.MIDLERTIDIG_JOBB]: 'Jeg har fått midlertidig jobb',
    [PermittertSvar.UAVKLART]: 'Arbeidssituasjonen min er uavklart',
    [PermittertSvar.ANNET]: 'Annet',
};

interface PermittertModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: any;
    besvarelse: any | null; //BesvarelseResponse['besvarelse'] | null;
}

const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, amplitudeData } = props;
    const [aktivSide, settAktivSide] = React.useState<number>(1);
    const [valgtSituasjon, settValgtSituasjon] = useState<PermittertSvar>(PermittertSvar.OPPSIGELSE);
    const [tilleggsData, settTilleggsData] = useState<any>(null);

    useEffect(() => {
        settAktivSide(1);
    }, [openModal]);

    const Innhold = () => {
        if (aktivSide === 1) {
            return (
                <Steg1
                    valgtSituasjon={valgtSituasjon}
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
                <Heading spacing level="1" size="large" id="modal-heading">
                    Min jobbsituasjonen har endret seg
                </Heading>
                <Heading level="2" size="medium">
                    Fortell oss hva som har endret seg slik at vi kan veilede deg videre
                </Heading>
                <BodyShort className={spacing.mb1}>Steg {aktivSide} / 3</BodyShort>
                <Innhold />
            </Modal.Content>
        </Modal>
    );
};

export default PermittertModal;
