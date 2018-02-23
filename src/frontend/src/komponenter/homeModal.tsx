import * as React from 'react';
import {Component} from 'react';
import Modal from 'nav-frontend-modal';
import {Ingress, Innholdstittel, Normaltekst} from 'nav-frontend-typografi';

export default class HomeModal extends Component {
    render() {
        return (
            <Modal
                isOpen={true}
                closeButton={false}
                contentLabel='Heisann'
                onRequestClose={() => null}
            >
                <Innholdstittel>Tittel i modalen</Innholdstittel>
                <Ingress>Ingress i modalen</Ingress>
                <Normaltekst>Normaltekst i modalen</Normaltekst>
            </Modal>
        );
    }
}