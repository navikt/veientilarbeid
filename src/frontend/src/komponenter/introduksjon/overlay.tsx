import * as React from 'react';
import {Component} from 'react';
import Modal from 'nav-frontend-modal';
import NavFrontendChevron from 'nav-frontend-chevron';
import Lukknapp from 'nav-frontend-lukknapp';
import Sideknapper from "./sideknapper";

interface Props {
    children: {};
    gjeldendeSide: number;
}

export default class Overlay extends Component<Props> {
    render() {
        const antallSider = React.Children.count(this.props.children);
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
                <Sideknapper antallKnapper={antallSider} gjeldendeKnapp={this.props.gjeldendeSide}/>
            </Modal>
        );
    }
}
