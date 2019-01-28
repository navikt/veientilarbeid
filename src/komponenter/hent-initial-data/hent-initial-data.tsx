import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { hentOppfolging, selectOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import {
    hentFeatureToggles,
    selectFeatureToggles,
    selectHentServicegruppekodeFeatureToggle,
    selectHentJobbsokerbesvarelseFeatureToggle,
    servicekodeToggleKey,
    jobbsokerbesvarelseToggleKey,
    FeatureToggleState
} from '../../ducks/feature-toggles';
import { hentServicegruppe, selectServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import {
    selectSykmeldtInfo, hentSykmeldtInfo, State as SykmeldtInfodataState
} from '../../ducks/sykmeldt-info';
import {
    hentJobbsokerbesvarelse,
    selectJobbsokerbesvarelse,
    State as JobbsokerbesvarelseState,
} from '../../ducks/jobbsokerbesvarelse';
import getStore from '../../store';
import { STATUS } from '../../ducks/api';
import { ActionType } from '../../ducks/actions';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    featureToggles: FeatureToggleState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    featureToggleServicegruppe: boolean;
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
                        type: ActionType.HENT_JOBBSOKERBESVARELSE_OK,
                        data: { STATUS: STATUS.OK }
                    });
                }
            });

            this.props.hentSykmeldtInfo();

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
            featureToggleJobbsokerbesvarelse,
        } = this.props;

        const avhengigheter: any[] = [oppfolging]; // tslint:disable-line no-any
        avhengigheter.push(sykmeldtInfo);

        if (featureToggleServicegruppe) {
            avhengigheter.push(servicegruppe);
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
    featureToggleJobbsokerbesvarelse: selectHentJobbsokerbesvarelseFeatureToggle(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentOppfolging: () => hentOppfolging()(dispatch),
    hentFeatureToggles: () => hentFeatureToggles()(dispatch),
    hentServicegruppe: () => hentServicegruppe()(dispatch),
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
