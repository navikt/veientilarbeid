import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentFeatureToggles, FeatureToggleState } from '../../ducks/feature-toggles';
import Feilmelding from '../feilmeldinger/feilmelding';

interface OwnProps {
    children: React.ReactElement<any>; // tslint:disable-line:no-any
}

interface StateProps {
    features: FeatureToggleState;
}

interface DispatchProps {
    hentFeatureToggles: () => void;
}

type FeatureToggleProviderProps = OwnProps & DispatchProps & StateProps;
// TODO Fjerne kall til Feature
class FeatureToggleProvider extends React.Component<FeatureToggleProviderProps> {
    constructor(props: FeatureToggleProviderProps) {
        super(props);
    }

    componentDidMount() {
        this.props.hentFeatureToggles();
    }

    render() {
        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[this.props.features]}
            >
                {this.props.children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    features: state.featureToggles,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentFeatureToggles: () => hentFeatureToggles()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggleProvider);
