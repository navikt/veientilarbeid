import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentOppfolging, selectOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import {
    hentFeatureToggles,
    selectFeatureToggles ,
    selectHentServicegruppekodeFeatureToggle,
    State as FeatureTogglesState
} from '../../ducks/feature-toggles';
import { hentServicegruppe, selectServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
}

interface DispatchProps {
    hentOppfolging: () => void;
    hentFeatureToggles: () => Promise<void | {}>;
    hentServicegruppe: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class HentInitialData extends React.Component<Props> {
    componentWillMount() {
        this.props.hentFeatureToggles().then(() => {
                this.props.hentOppfolging();
                if (selectHentServicegruppekodeFeatureToggle) {
                    this.props.hentServicegruppe();
                }
            }
        );
    }

    render() {
        const { oppfolging, servicegruppe, children } = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[oppfolging, servicegruppe]}
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state),
        featureToggles: selectFeatureToggles(state),
        servicegruppe: selectServicegruppe(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
        hentOppfolging: () => dispatch(hentOppfolging()),
        hentFeatureToggles: () => dispatch(hentFeatureToggles()),
        hentServicegruppe: () => dispatch(hentServicegruppe()),
    });

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);