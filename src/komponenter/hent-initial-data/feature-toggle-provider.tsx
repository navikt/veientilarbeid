import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
// import Innholdslaster from '../innholdslaster/innholdslaster';
import { hentFeatureToggles, FeatureToggleState } from '../../ducks/feature-toggles';
// import Feilmelding from '../feilmeldinger/feilmelding';

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

class FeatureToggleProvider extends React.Component<FeatureToggleProviderProps> {
    constructor(props: FeatureToggleProviderProps) {
        super(props);
    }

    componentDidMount() {
        // this.props.hentFeatureToggles();
    }

    render() {
        return this.props.children;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    features: state.featureToggles,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentFeatureToggles: () => hentFeatureToggles()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureToggleProvider);
