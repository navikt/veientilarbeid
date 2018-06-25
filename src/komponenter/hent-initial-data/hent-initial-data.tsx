import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentOppfolging, selectOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
}

interface DispatchProps {
    hentOppfolging: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class HentInitialData extends React.Component<Props> {
    componentWillMount() {
        this.props.hentOppfolging();
    }

    render() {
        const { oppfolging, children } = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[oppfolging]}
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state)
    }
);

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
        hentOppfolging: () => dispatch(hentOppfolging())
    });

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);