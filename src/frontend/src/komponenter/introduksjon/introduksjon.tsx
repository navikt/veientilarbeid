import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import OverlaySide from './overlaySide';
import Overlay from './overlay';
import { AppState } from '../../reducer';
import { IntroduksjonActionTypes } from '../../ducks/introduksjon';
import { FormattedMessage } from 'react-intl';

interface StateProps {
    visOverlay: boolean;
    side: number;
}

interface DispatchProps {
    settSide: (side: number) => {};
    settVisOverlay: (visOverlay: boolean) => {};
}

class Introduksjon extends Component<StateProps & DispatchProps> {
    render() {
        return this.props.visOverlay ? (
            <Overlay
                gjeldendeSide={this.props.side}
                lukkOverlay={() => this.props.settVisOverlay(false)}
                settSide={this.props.settSide}
            >
                <OverlaySide>
                    <div className="overlay__illustrasjon-jobbsoker"/>
                    <Innholdstittel className="blokk-s">
                        <FormattedMessage id="introduksjon-overskrift" />
                    </Innholdstittel>
                    <Normaltekst>
                        <FormattedMessage id="introduksjon-brodtekst" />
                    </Normaltekst>
                </OverlaySide>
                <OverlaySide>
                    <div className="overlay__illustrasjon-jobbsoker"/>
                    <Innholdstittel className="blokk-s">TODO FO-169</Innholdstittel>
                </OverlaySide>
            </Overlay>
        ) : (null);
    }
}

const mapStateToProps = (state: AppState) => ({
        visOverlay: state.introduksjonOverlay.visOverlay,
        side: state.introduksjonOverlay.side,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    settSide: (side: number) => dispatch({
        type: IntroduksjonActionTypes.INTRODUKSJON_SETT_SIDE,
        data: {side: side}
    }),
    settVisOverlay: (visOverlay: boolean) => dispatch({
        type: IntroduksjonActionTypes.INTRODUKSJON_VIS_OVERLAY,
        data: {visOverlay: visOverlay}
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Introduksjon);