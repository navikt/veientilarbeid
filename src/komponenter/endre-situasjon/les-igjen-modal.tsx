import React from 'react';
import { Button, Heading, Modal } from '@navikt/ds-react';

import Veiledning from './veiledning';

import spacing from '../../spacing.module.css';
import flex from '../../flex.module.css';

interface LesIgjenModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    amplitudeData: any;
    besvarelse: any | null;
}

const LesIgjenModal = (props: LesIgjenModalProps) => {
    const { openModal, setOpenModal, besvarelse } = props;
    const valgtSituasjon = besvarelse?.dinSituasjon.verdi;
    const tilleggsData = besvarelse?.dinSituasjon.tilleggsData;

    const Innhold = (props: any) => {
        const { valgtSituasjon, tilleggsData } = props;
        if (!valgtSituasjon || !tilleggsData) return null;

        return (
            <>
                <Veiledning valgtSituasjon={valgtSituasjon} tilleggsData={tilleggsData} />
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
            aria-label="Hva betyr endringene for meg?"
            onClose={() => setOpenModal((x) => !x)}
            // shouldCloseOnEsc={!datepickerProps.open}
            aria-labelledby="modal-heading"
        >
            <Modal.Content>
                <Heading spacing level="1" size="large" id="modal-heading" className={spacing.mr2}>
                    Min jobbsituasjonen har endret seg
                </Heading>
                <Innhold tilleggsData={tilleggsData} valgtSituasjon={valgtSituasjon} />
            </Modal.Content>
        </Modal>
    );
};

export default LesIgjenModal;
