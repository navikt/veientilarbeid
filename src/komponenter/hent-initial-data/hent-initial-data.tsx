import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { State as OppfolgingState } from '../../ducks/oppfolging';
import { FeatureToggleState, jobbsokerbesvarelseToggleKey, servicekodeToggleKey } from '../../ducks/feature-toggles';
import { hentServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { hentSykmeldtInfo, State as SykmeldtInfodataState } from '../../ducks/sykmeldt-info';
import { hentJobbsokerbesvarelse, State as JobbsokerbesvarelseState, } from '../../ducks/jobbsokerbesvarelse';
import getStore from '../../store';
import { STATUS } from '../../ducks/api';
import { ActionType } from '../../ducks/actions';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    features: FeatureToggleState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

interface DispatchProps {
    hentServicegruppe: () => void;
    hentSykmeldtInfo: () => void;
    hentJobbsokerbesvarelse: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class HentInitialData extends React.Component<Props> {
    componentWillMount() {
        const featureJobbsokerbesvarelse = this.props.features[jobbsokerbesvarelseToggleKey];
        const featureServicegruppe = this.props.features[servicekodeToggleKey];

        this.props.hentSykmeldtInfo();

        if (featureJobbsokerbesvarelse && this.props.oppfolging.data.underOppfolging) {
            this.props.hentJobbsokerbesvarelse();
        } else {
            getStore().dispatch({
                type: ActionType.HENT_JOBBSOKERBESVARELSE_OK,
                data: { STATUS: STATUS.OK }
            });
        }
        if (featureServicegruppe) {
            this.props.hentServicegruppe();
        }
    }

    finnAvhengigheter () {
        const {
            oppfolging,
            servicegruppe,
            sykmeldtInfo,
            jobbsokerbesvarelse,
            features
        } = this.props;

        const avhengigheter: any[] = [oppfolging, sykmeldtInfo]; // tslint:disable-line no-any

        if (features[servicekodeToggleKey]) {
            avhengigheter.push(servicegruppe);
        }
        if (features[jobbsokerbesvarelseToggleKey]) {
            avhengigheter.push(jobbsokerbesvarelse);
        }
        return avhengigheter;
    }

    render() {
        const { children } = this.props;
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
    oppfolging: state.oppfolging,
    servicegruppe: state.servicegruppe,
    sykmeldtInfo: state.sykmeldtInfodata,
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
    features: state.featureToggles,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentServicegruppe: () => hentServicegruppe()(dispatch),
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HentInitialData);
