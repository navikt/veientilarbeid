import React, { useEffect, useState } from 'react';
import { BodyShort, Link, Modal } from '@navikt/ds-react';
import { ChevronLeftIcon } from '@navikt/aksel-icons';

import { AmplitudeData } from '../../metrics/amplitude-utils';
import Steg2 from './steg2';
import Steg3 from './steg3';
import Steg1 from './steg1';

import spacing from '../../spacing.module.css';

interface PermittertModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: AmplitudeData;
    besvarelse: any | null;
}

const PermittertModal = (props: PermittertModalProps) => {
    const { openModal, setOpenModal, amplitudeData, besvarelse } = props;
    const [aktivSide, settAktivSide] = React.useState<number>(1);
    const [valgtSituasjon, settValgtSituasjon] = useState<any>('-1');
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
                    opprinneligSituasjon={opprinneligSituasjon}
                    onClick={() => settAktivSide(3)}
                />
            );
        }

        if (aktivSide === 3) {
            return (
                <Steg3
                    amplitudeData={amplitudeData}
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
            width={'medium'}
            open={openModal}
            onClose={() => setOpenModal(false)}
            header={{ heading: 'Jobbsituasjonen min har endret seg', size: 'medium' }}
        >
            <Modal.Body>
                <Tilbake />
                <BodyShort spacing>
                    <small>Steg {aktivSide}/3</small>
                </BodyShort>
                <Innhold />
            </Modal.Body>
        </Modal>
    );
};

export default PermittertModal;
