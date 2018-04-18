import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentTekster, selectTekster, State as TeksterState } from '../../ducks/tekster';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    tekster: TeksterState;
}

interface DispatchProps {
    hentTekster: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class TeksterProvider extends React.Component<Props> {
    componentWillMount() {
        this.props.hentTekster();
    }

    render() {
        const { tekster, children } = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[tekster]}
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        tekster: selectTekster(state)
    }
);

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentTekster: () => dispatch(hentTekster())
});

export default connect(mapStateToProps, mapDispatchToProps)(TeksterProvider);