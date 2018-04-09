import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { hentOppfolging, selectOppfolging, State as OppfolgingState } from '../../ducks/oppfolging';
import { AppState } from '../../reducer';
import {
    selectInnloggingsinfo,
    hentInnloggingsInfo,
    State as InnloggingsinfoState,
    Data as InnloggingsinfoData
} from '../../ducks/innloggingsinfo';
import StepUp from './stepup';
import { STATUS } from '../../ducks/api-utils';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';

interface StateProps {
    oppfolging: OppfolgingState;
    innloggingsinfo: InnloggingsinfoState;
}

interface DispatchProps {
    hentInnloggingsInfo: () => Promise<void | {}>;
    hentOppfolging: () => void;
}

type Props = StateProps & DispatchProps;

class OppfolgingProvider extends React.Component<Props> {
    componentWillMount() {
        this.props.hentInnloggingsInfo().then( (res) => {
            if ((res as InnloggingsinfoData).securityLevel === '4') {
                this.props.hentOppfolging();
            }
        });
    }

    render() {
        const { children, oppfolging, innloggingsinfo } = this.props;
        const { securityLevel } = innloggingsinfo.data;

        if (securityLevel !== '4' && innloggingsinfo.status === STATUS.OK) {
            return <StepUp />;
        }

        return (
            <Innholdslaster
                feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
                storrelse="XXL"
                avhengigheter={[oppfolging, innloggingsinfo]}
            >
                {children}
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state),
        innloggingsinfo:  selectInnloggingsinfo(state),
    }
);

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    hentInnloggingsInfo:  () => dispatch(hentInnloggingsInfo()),
    hentOppfolging: () => dispatch(hentOppfolging())
    });

export default connect(mapStateToProps, mapDispatchToProps)(OppfolgingProvider);