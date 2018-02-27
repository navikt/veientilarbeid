import * as React from 'react';
import { Component } from 'react';
import * as ReactModal from 'react-modal';
import NavFrontendModal from 'nav-frontend-modal';
import Sideknapper from './sidevisning';
import Sideskifte from './sideskifte';

interface Props {
    children: {};
    gjeldendeSide: number;
    lukkOverlay: () => {};
    settSide: (side: number) => {};
}

export default class Overlay extends Component<Props> {
    render() {
        const antallSider = React.Children.count(this.props.children);
        const children = React.Children.toArray(this.props.children);

        return (
            <NavFrontendModal
                isOpen={true}
                closeButton={true}
                contentLabel="Fullført registrering"
                onRequestClose={() =>  this.props.lukkOverlay()}
            >
                <div className="overlay__innhold-wrapper">
                    <Sideskifte
                        onClick={() => this.props.settSide(this.props.gjeldendeSide - 1)}
                        skalVises={this.props.gjeldendeSide > 0}
                        synkende={true}
                    />
                    <div className="overlay__innhold-med-sideknapper">
                        {children[this.props.gjeldendeSide]}
                        <Sideknapper antallKnapper={antallSider} gjeldendeKnapp={this.props.gjeldendeSide}/>
                    </div>
                    <Sideskifte
                        onClick={() => this.props.settSide(this.props.gjeldendeSide + 1)}
                        skalVises={this.props.gjeldendeSide < antallSider - 1}
                    />
                </div>
            </NavFrontendModal>
        );
    }

    componentWillMount() {
        ReactModal.setAppElement('.appContainer');
    }
}
