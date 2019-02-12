import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolging: OppfolgingState;
}

interface DispatchProps {
    hentOppfolging: () => void;
}

type OppfolgingProviderProps = OwnProps & DispatchProps & StateProps;

class OppfolgingProvider extends React.Component<OppfolgingProviderProps> {
    constructor(props: OppfolgingProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.hentOppfolging();
    }

    render() {
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[this.props.oppfolging]}
            >
                {this.props.children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentOppfolging: () => hentOppfolging()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingProvider);
