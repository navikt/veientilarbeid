import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { hentOppfolging, selectOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import {
    hentFeatureToggles,
    selectFeatureToggles,
    selectHentServicegruppekodeFeatureToggle,
    selectHentSykeforloepMetadata,
    selectHentJobbsokerbesvarelseFeatureToggle,
    servicekodeToggleKey,
    jobbsokerbesvarelseToggleKey,
    State as FeatureTogglesState, sykeforloepMetadataToggleKey
} from '../../ducks/feature-toggles';
import { hentServicegruppe, selectServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import {
    selectSykeforloepMetadata, hentSykeforloepMetadata, State as SykeforloepMetadataState
} from '../../ducks/sykeforloep-metadata';
import {
    hentJobbsokerbesvarelse,
    selectJobbsokerbesvarelse,
    State as JobbsokerbesvarelseState
} from '../../ducks/jobbsokerbesvarelse';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
    sykeforloepMetadata: SykeforloepMetadataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    featureToggleServicegruppe: boolean;
    featureToggleSykeforloepMetadata: boolean;
    featureToggleJobbsokerbesvarelse: boolean;
}

interface DispatchProps {
    hentOppfolging: () => Promise<void | {}>;
    hentFeatureToggles: () => Promise<void | {}>;
    hentServicegruppe: () => void;
    hentSykeforloepMetadata: () => void;
    hentJobbsokerbesvarelse: () => void;
}

interface Oppfolging {
    underOppfolging: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class HentInitialData extends React.Component<Props> {
    componentWillMount() {
        this.props.hentFeatureToggles().then((response) => {

            this.props.hentOppfolging().then((oppfolgingresponse: Oppfolging) => {
                const featureToggleJobbsokerbesvarelse = response[jobbsokerbesvarelseToggleKey];
                if (featureToggleJobbsokerbesvarelse && oppfolgingresponse.underOppfolging) {
                    this.props.hentJobbsokerbesvarelse();
                }
            });

            const featureToggleSykeforloepMetadata = response[sykeforloepMetadataToggleKey];
            if (featureToggleSykeforloepMetadata) {
                this.props.hentSykeforloepMetadata();
            }

            const featureToggleServicegruppe = response[servicekodeToggleKey];
            if (featureToggleServicegruppe) {
                this.props.hentServicegruppe();
            }
        });
    }

    finnAvhengigheter () {
        const {
            oppfolging,
            servicegruppe,
            sykeforloepMetadata,
            jobbsokerbesvarelse,
            featureToggleServicegruppe,
            featureToggleSykeforloepMetadata,
            featureToggleJobbsokerbesvarelse,
        } = this.props;

        if (featureToggleServicegruppe && featureToggleSykeforloepMetadata && featureToggleJobbsokerbesvarelse) {
            return [oppfolging, servicegruppe, sykeforloepMetadata, jobbsokerbesvarelse];
        } else if (featureToggleServicegruppe && featureToggleSykeforloepMetadata) {
            return [oppfolging, servicegruppe, sykeforloepMetadata];
        } else if (featureToggleServicegruppe && featureToggleJobbsokerbesvarelse) {
            return [oppfolging, servicegruppe, jobbsokerbesvarelse];
        } else if (featureToggleSykeforloepMetadata && featureToggleJobbsokerbesvarelse) {
            return [oppfolging, sykeforloepMetadata, jobbsokerbesvarelse];
        } else if (featureToggleServicegruppe) {
            return [oppfolging, servicegruppe];
        } else if (featureToggleSykeforloepMetadata) {
            return [oppfolging, sykeforloepMetadata];
        } else if (featureToggleJobbsokerbesvarelse) {
        return [oppfolging, jobbsokerbesvarelse];
        } else {
            return [oppfolging];
        }
    }

    render() {
        const {
            children
        } = this.props;

        const avhengigheter = this.finnAvhengigheter();

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={avhengigheter}
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
    sykeforloepMetadata: selectSykeforloepMetadata(state),
    jobbsokerbesvarelse: selectJobbsokerbesvarelse(state),
    featureToggleServicegruppe: selectHentServicegruppekodeFeatureToggle(state),
    featureToggleSykeforloepMetadata: selectHentSykeforloepMetadata(state),
    featureToggleJobbsokerbesvarelse: selectHentJobbsokerbesvarelseFeatureToggle(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentOppfolging: () => dispatch(hentOppfolging()),
    hentFeatureToggles: () => dispatch(hentFeatureToggles()),
    hentServicegruppe: () => dispatch(hentServicegruppe()),
    hentSykeforloepMetadata: () => dispatch(hentSykeforloepMetadata()),
    hentJobbsokerbesvarelse: () => dispatch(hentJobbsokerbesvarelse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
