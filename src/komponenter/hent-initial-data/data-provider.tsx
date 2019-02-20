import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { State as OppfolgingState } from '../../ducks/oppfolging';
import { hentServicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { hentSykmeldtInfo, State as SykmeldtInfodataState } from '../../ducks/sykmeldt-info';
import {
    hentJobbsokerbesvarelse, settJobbsokerbesvarelseOK, State as JobbsokerbesvarelseState,
} from '../../ducks/jobbsokerbesvarelse';

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    oppfolging: OppfolgingState;
    servicegruppe: ServicegruppeState;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

interface DispatchProps {
    hentServicegruppe: () => void;
    hentSykmeldtInfo: () => void;
    hentJobbsokerbesvarelse: () => void;
    settJobbsokerbesvarelseOK: () => void;
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

    }

    render() {
        const { children, oppfolging, servicegruppe, sykmeldtInfo, jobbsokerbesvarelse } = this.props;

        const avhengigheter: any[] = [oppfolging, sykmeldtInfo, servicegruppe, jobbsokerbesvarelse]; // tslint:disable-line

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
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentServicegruppe: () => hentServicegruppe()(dispatch),
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    settJobbsokerbesvarelseOK: () => dispatch(settJobbsokerbesvarelseOK())
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
