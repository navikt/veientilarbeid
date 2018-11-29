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
    selectHentSykmeldtInfodata,
    selectHentJobbsokerbesvarelseFeatureToggle,
    servicekodeToggleKey,
    jobbsokerbesvarelseToggleKey,
    State as FeatureTogglesState, sykmeldtInfodataToggleKey
} from '../../ducks/feature-toggles';
import { hentServicegruppe, selectServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import {
    selectSykmeldtInfo, hentSykmeldtInfo, State as SykmeldtInfodataState
} from '../../ducks/sykmeldt-info';
import {
    hentJobbsokerbesvarelse,
    selectJobbsokerbesvarelse,
    State as JobbsokerbesvarelseState,
    ActionTypes as ActionTypesJobbsokerbesvarelse
} from '../../ducks/jobbsokerbesvarelse';
import getStore from '../../store';
import { STATUS } from '../../ducks/api-utils';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    featureToggleServicegruppe: boolean;
    featureToggleSykmeldtInfodata: boolean;
    featureToggleJobbsokerbesvarelse: boolean;
}

interface DispatchProps {
    hentOppfolging: () => Promise<void | {}>;
    hentFeatureToggles: () => Promise<void | {}>;
    hentServicegruppe: () => void;
    hentSykmeldtInfo: () => void;
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
                } else {
                    getStore().dispatch({
                        type: ActionTypesJobbsokerbesvarelse.HENT_JOBBSOKERBESVARELSE_OK,
                        data: { STATUS: STATUS.OK }
                    });
                }
            });

            const featureToggleSykmeldtInfodata = response[sykmeldtInfodataToggleKey];
            if (featureToggleSykmeldtInfodata) {
                this.props.hentSykmeldtInfo();
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
            sykmeldtInfo,
            jobbsokerbesvarelse,
            featureToggleServicegruppe,
            featureToggleSykmeldtInfodata,
            featureToggleJobbsokerbesvarelse,
        } = this.props;

        const avhengigheter: any[] = [oppfolging]; // tslint:disable-line no-any

        if (featureToggleServicegruppe) {
            avhengigheter.push(servicegruppe);
        }

        if (featureToggleSykmeldtInfodata) {
            avhengigheter.push(sykmeldtInfo);
        }

        if (featureToggleJobbsokerbesvarelse) {
            avhengigheter.push(jobbsokerbesvarelse);
        }

        return avhengigheter;
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
    sykmeldtInfo: selectSykmeldtInfo(state),
    jobbsokerbesvarelse: selectJobbsokerbesvarelse(state),
    featureToggleServicegruppe: selectHentServicegruppekodeFeatureToggle(state),
    featureToggleSykmeldtInfodata: selectHentSykmeldtInfodata(state),
    featureToggleJobbsokerbesvarelse: selectHentJobbsokerbesvarelseFeatureToggle(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentOppfolging: () => dispatch(hentOppfolging()),
    hentFeatureToggles: () => dispatch(hentFeatureToggles()),
    hentServicegruppe: () => dispatch(hentServicegruppe()),
    hentSykmeldtInfo: () => dispatch(hentSykmeldtInfo()),
    hentJobbsokerbesvarelse: () => dispatch(hentJobbsokerbesvarelse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
