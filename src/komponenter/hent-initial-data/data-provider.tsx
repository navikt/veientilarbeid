import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { State as OppfolgingState } from '../../ducks/oppfolging';
import { hentServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { hentSykmeldtInfo, State as SykmeldtInfodataState } from '../../ducks/sykmeldt-info';
import { hentUlesteDialoger, State as UlesteDialogerState } from '../../ducks/dialog';
import { hentBrukerRegistrering, State as BrukerRegistreringState } from '../../ducks/brukerregistrering';
import {
    hentJobbsokerbesvarelse, settJobbsokerbesvarelseOK, State as JobbsokerbesvarelseState,
} from '../../ducks/jobbsokerbesvarelse';
import {
    hentEgenvurderingbesvarelse, settEgenvurderingbesvarelseOK, State as EgenvurderingbesvarelseState,
} from '../../ducks/egenvurdering';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    brukerRegistrering: BrukerRegistreringState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState
}

interface DispatchProps {
    hentServicegruppe: () => void;
    hentSykmeldtInfo: () => void;
    hentJobbsokerbesvarelse: () => void;
    settJobbsokerbesvarelseOK: () => void;
    hentUlesteDialoger: () => void;
    hentBrukerRegistrering: () => void;
    hentEgenvurderingbesvarelse: () => void;
    settEgenvurderingbesvarelseOK: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

class DataProvider extends React.Component<Props> {

    componentWillMount() {
        this.props.hentSykmeldtInfo();

        if (this.props.oppfolging.data.underOppfolging) {
            this.props.hentJobbsokerbesvarelse();
        } else {
            this.props.settJobbsokerbesvarelseOK();
        }
        this.props.hentServicegruppe();
        this.props.hentUlesteDialoger();
        this.props.hentBrukerRegistrering();
        this.props.hentEgenvurderingbesvarelse();
    }

    render() {
        const {
            children, oppfolging, servicegruppe, sykmeldtInfo,
            jobbsokerbesvarelse, ulesteDialoger, brukerRegistrering, egenvurderingbesvarelse
        } = this.props;

        const avhengigheter: any[] = [oppfolging, sykmeldtInfo]; // tslint:disable-line:no-any
        const ventPa: any[] = [servicegruppe, jobbsokerbesvarelse, ulesteDialoger, brukerRegistrering, egenvurderingbesvarelse]; // tslint:disable-line:no-any

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={avhengigheter}
                ventPa={ventPa}
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
    ulesteDialoger: state.ulesteDialoger,
    brukerRegistrering: state.brukerRegistrering,
    egenvurderingbesvarelse: state.egenvurderingbesvarelse,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentServicegruppe: () => hentServicegruppe()(dispatch),
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    settJobbsokerbesvarelseOK: () => dispatch(settJobbsokerbesvarelseOK()),
    hentUlesteDialoger: () => hentUlesteDialoger()(dispatch),
    hentBrukerRegistrering: () => hentBrukerRegistrering()(dispatch),
    hentEgenvurderingbesvarelse: () => hentEgenvurderingbesvarelse()(dispatch),
    settEgenvurderingbesvarelseOK: () => dispatch(settEgenvurderingbesvarelseOK()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
