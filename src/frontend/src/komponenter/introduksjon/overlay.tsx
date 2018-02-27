import * as React from 'react';
import {Component} from 'react';
import Modal from 'nav-frontend-modal';
import Sideknapper from "./sideknapper";
import Sideskifte from "./sideskifte";

interface Props {
    children: {};
    gjeldendeSide: number;
    lukkOverlay: () => {};
}

export default class Overlay extends Component<Props> {
    render() {
        const antallSider = React.Children.count(this.props.children);
        const children = React.Children.toArray(this.props.children);

        return (
            <Modal
                isOpen={true}
                closeButton={true}
                contentLabel='Heisann'
                onRequestClose={() =>  this.props.lukkOverlay()}
            >
                <div className='overlay__innhold-wrapper'>
                    <Sideskifte onClick={() => null} skalVises={true} synkende={true}/>
                    <div className='overlay__innhold-med-sideknapper'>
                        {children[this.props.gjeldendeSide]}
                        <Sideknapper antallKnapper={antallSider} gjeldendeKnapp={this.props.gjeldendeSide}/>
                    </div>
                    <Sideskifte onClick={() => null} skalVises={true}/>
                </div>
            </Modal>
        );
    }
}
