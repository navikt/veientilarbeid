import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import { hentBrukerRegistrering, State as BrukerregistreringState } from '../../ducks/brukerregistrering';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    oppfolging: OppfolgingState;
    brukerRegistering: BrukerregistreringState;
}

interface DispatchProps {
    hentOppfolging: () => void;
    hentBrukerRegistrering: () => void;
}

type OppfolgingProviderProps = OwnProps & DispatchProps & StateProps;

const OppfolgingBrukerregistreringProvider = ({oppfolging, brukerRegistering, hentOppfolging, hentBrukerRegistrering, children}: OppfolgingProviderProps) => {

    React.useEffect(() => {
        hentOppfolging();
        hentBrukerRegistrering();
    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={[oppfolging, brukerRegistering]}
        >
            {children}
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    oppfolging: state.oppfolging,
    brukerRegistering: state.brukerRegistrering,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentOppfolging: () => hentOppfolging()(dispatch),
    hentBrukerRegistrering: () => hentBrukerRegistrering()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingBrukerregistreringProvider);
