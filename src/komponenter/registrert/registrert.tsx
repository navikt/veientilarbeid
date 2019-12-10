import React, { useState, useContext } from 'react';
import { Element } from 'nav-frontend-typografi';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import Modal from 'nav-frontend-modal';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import Opplysninger from '../innsyn/registreringsopplysninger'

const Registrert = () => {
    const [modalIsOpen, setModalState] = useState(false);
    const brukerregistreringData = useContext(BrukerregistreringContext).data;
    const { registrering } = brukerregistreringData
    const { opprettetDato, manueltRegistrertAv, besvarelse } = registrering

    const openModal = (event: any) => {
        event.preventDefault();
        setModalState(true);
    };
    const closeModal = () => {
        setModalState(false);
    };

    return (
        <>
        <AlertStripeInfo className="blokk-s">
            <Element>Du er registrert som arbeidssøker. <a href="" onClick={openModal}>Vis informasjon fra registreringen</a></Element>
        </AlertStripeInfo>
        <Modal
            isOpen={ modalIsOpen }
            onRequestClose={() => closeModal()}
            closeButton={true}
            contentLabel="Informasjon fra registreringen"
        >
            <div style={{padding:'2rem 2.5rem'}}>
                <Opplysninger
                    opprettetDato={ opprettetDato }
                    manueltRegistrertAv={ manueltRegistrertAv }
                    besvarelse={ besvarelse }
                />
            </div>
        </Modal>
        </>
    );
};

export default Registrert;
