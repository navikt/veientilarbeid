import React from 'react';
import { Button, Heading, Modal } from '@navikt/ds-react';

import Veiledning from './veiledning';
import { loggAktivitet } from '../../metrics/metrics';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';
import styles from './modal.module.css';

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
            aria-label="Jobbsituasjonen min har endret seg"
            onClose={() => setOpenModal((x) => !x)}
            // shouldCloseOnEsc={!datepickerProps.open}
            aria-labelledby="modal-heading"
        >
            <Modal.Content className={styles.maxWidth}>
                <Heading spacing level="1" size="large" id="modal-heading" className={spacing.mr2}>
                    Jobbsituasjonen min har endret seg
                </Heading>
                <Innhold tilleggsData={tilleggsData} valgtSituasjon={valgtSituasjon} amplitudeData={amplitudeData} />
            </Modal.Content>
        </Modal>
    );
};

export default LesIgjenModal;
