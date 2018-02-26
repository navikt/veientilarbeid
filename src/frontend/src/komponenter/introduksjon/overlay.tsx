import * as React from 'react';
import {Component} from 'react';
import Modal from 'nav-frontend-modal';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lukknapp from 'nav-frontend-lukknapp';

export default class Overlay extends Component {
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
                {this.props.children}
            </Modal>
        );
    }
}
// Chevron
