import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import { State as BrukerregistreringState, Data, initialState, BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { fetchData } from '../../ducks/api-utils';
import { BRUKERREGISTRERING_URL} from '../../ducks/api';

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

const OppfolgingBrukerregistreringProvider = ({oppfolging, hentOppfolging, children}: OppfolgingProviderProps) => {

    const [brukerregistreringState, setBrukerregistreringState] = React.useState<BrukerregistreringState>(initialState);

    React.useEffect(() => {
        hentOppfolging();
        fetchData<BrukerregistreringState, Data>(brukerregistreringState, setBrukerregistreringState, BRUKERREGISTRERING_URL);

    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={[oppfolging, brukerregistreringState]}
        >
            <BrukerregistreringContext.Provider value={brukerregistreringState}>
                {children}
            </BrukerregistreringContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentOppfolging: () => hentOppfolging()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingBrukerregistreringProvider);
