import * as React from 'react';
import {Component} from 'react';
import Modal from 'nav-frontend-modal';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lukknapp from 'nav-frontend-lukknapp';

export default class HomeModal extends Component {
    render() {
        return (
            <Modal
                isOpen={true}
                closeButton={false}
                contentLabel='Heisann'
                onRequestClose={() => null}
            >
                <Lukknapp> Lukk </Lukknapp>
                <NavFrontendChevron stor={true}/>
                <Innholdstittel>Registreringen er fullført!</Innholdstittel>
                <Normaltekst>Velkommen til din Jobbsøkerprofil! Her finner du CV, Aktivitetsplan og nyttig informasjon til deg som arbeidssøker.</Normaltekst>
            </Modal>
        );
    }
}
// Chevron
