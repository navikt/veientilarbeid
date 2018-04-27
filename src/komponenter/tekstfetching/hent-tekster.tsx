import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentTekster, selectTekster, State as TeksterState } from '../../ducks/tekster';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { visInformasjonsmodul } from '../../utils/utils';

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

class HentTekster extends React.Component<Props> {
    componentWillMount() {
        // Feature-toggle informasjonsmodul 2/3 (sjekk dagpenger.tsx)
        if (!visInformasjonsmodul(location.search)) {
            return;
        }

        this.props.hentTekster();
    }

    render() {
        const { tekster, children } = this.props;

        // Feature-toggle informasjonsmodul 3/3 (sjekk dagpenger.tsx)
        if (!visInformasjonsmodul(location.search)) {
            return children;
        }

        // TODO Dette gjør at spinneren kjører to ganger. Fiks ved å legge til avhengighet i den andre innholdslasteren.
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

export default connect(mapStateToProps, mapDispatchToProps)(HentTekster);