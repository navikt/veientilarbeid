import * as React from 'react';
import { Component } from 'react';
import Modal from 'nav-frontend-modal';
import Sideknapper from './sidevisning';
import Sideskifte from './sideskifte';

interface Props {
    children: {};
    close: () => void;
    appElementSelector: string;
}

interface State {
    gjeldendeSide: number;
}

export default class Overlay extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            gjeldendeSide: 0
        };
    }

    settSide(side: number) {
        this.setState({
            gjeldendeSide: side
        });
    }

    componentWillMount() {
        Modal.setAppElement(this.props.appElementSelector);
    }

    render() {
        const antallSider = React.Children.count(this.props.children);
        const children = React.Children.toArray(this.props.children);
        console.log('gjeldendeSide:', this.state.gjeldendeSide);

        return (
            <Modal
                isOpen={true}
                closeButton={true}
                contentLabel="Fullført registrering"
                onRequestClose={() =>  this.props.close()}
            >
                <div className="overlay__innhold-wrapper">
                    <Sideskifte
                        onClick={() => this.settSide(this.state.gjeldendeSide - 1)}
                        skalVises={this.state.gjeldendeSide > 0}
                        synkende={true}
                    />
                    <div className="overlay__innhold-med-sideknapper">
                        {children[this.state.gjeldendeSide]}
                        <Sideknapper antallKnapper={antallSider} gjeldendeKnapp={this.state.gjeldendeSide}/>
                    </div>
                    <Sideskifte
                        onClick={() => this.settSide(this.state.gjeldendeSide + 1)}
                        skalVises={this.state.gjeldendeSide < antallSider - 1}
                    />
                </div>
            </Modal>
        );
    }


}
