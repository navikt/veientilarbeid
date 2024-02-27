import React from 'react';
import { Button, Modal } from '@navikt/ds-react';

import Veiledning from './veiledning';
import { loggAktivitet } from '../../metrics/metrics';

import flex from '../../flex.module.css';

interface LesIgjenModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: any;
    besvarelse: any | null;
}

const LesIgjenModal = (props: LesIgjenModalProps) => {
    const { openModal, setOpenModal, besvarelse, amplitudeData } = props;
    const valgtSituasjon = besvarelse?.dinSituasjon.verdi;
    const tilleggsData = besvarelse?.dinSituasjon.tilleggsData;

    const Innhold = (props: any) => {
        const [openedDagpenger, setOpenedDagpenger] = React.useState(false);
        const [openedRegistrering, setOpenedRegistrering] = React.useState(false);
        const { valgtSituasjon, tilleggsData, amplitudeData } = props;

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

        if (!valgtSituasjon || !tilleggsData) return null;

        return (
            <>
                <Veiledning
                    valgtSituasjon={valgtSituasjon}
                    tilleggsData={tilleggsData}
                    handleReadmoreRegistrering={handleReadmoreRegistrering}
                    handleReadmoreDagpenger={handleReadmoreDagpenger}
                />
                <div className={`${flex.flex} ${flex.flexEnd}`}>
                    <Button variant={'primary'} onClick={() => setOpenModal(false)}>
                        Lukk
                    </Button>
                </div>
            </>
        );
    };

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            width={'medium'}
            header={{ heading: 'Jobbsituasjonen min har endret seg', size: 'medium' }}
        >
            <Modal.Body>
                <Innhold tilleggsData={tilleggsData} valgtSituasjon={valgtSituasjon} amplitudeData={amplitudeData} />
            </Modal.Body>
        </Modal>
    );
};

export default LesIgjenModal;
