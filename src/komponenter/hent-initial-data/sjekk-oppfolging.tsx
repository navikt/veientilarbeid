import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { Data as OppfolgingData, selectOppfolging } from '../../ducks/oppfolging';
import {
    erSykmeldt,
    erUnderOppfolging, redirectTilAktivitetsplan,
    redirectTilDittNav
} from './sjekk-oppfolging-utils';
import Overskrift from '../overskrift/overskrift';
import ReaktiveringMelding from '../reaktivering-melding/reaktivering-melding';
import Aktivitetsplan from '../aktivitetsplan/aktivitetsplan';
import Sykefravar from '../sykefravaer/sykefravar';

interface SjekkOppfolgingConfig {
    sendBrukerTilAktivitetsplan: () => void;
    sendBrukerTilDittNav: () => void;
}

interface OwnProps {
    config?: SjekkOppfolgingConfig;
}

interface StateProps {
    oppfolging: OppfolgingData;
}

type Props = OwnProps & StateProps;

class SjekkOppfolging extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        config: {
            sendBrukerTilAktivitetsplan: redirectTilAktivitetsplan,
            sendBrukerTilDittNav: redirectTilDittNav,
        }
    };

    render() {
        const {oppfolging, children, config} = this.props;

        if (erSykmeldt(oppfolging)) {
            return (
                <main id="maincontent" role="main" tabIndex={-1}>
                    <Overskrift sideTittelId="overskrift-oppfolging"/>
                    <div className="sykmelding-oppfolging-side">
                        <ReaktiveringMelding/>

                        <div className="rad-even">
                            <div className="limit">
                                <Aktivitetsplan />
                            </div>
                        </div>
                        <div className="rad">
                            <div className="limit">
                                <Sykefravar />
                            </div>
                        </div>
                    </div>
                </main>
            );

        } else if (erUnderOppfolging(oppfolging)) {
            return children;
        }

        config!.sendBrukerTilAktivitetsplan();
        return null;
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
        oppfolging: selectOppfolging(state).data
    }
);

// tslint:disable-next-line:no-any
export default connect(mapStateToProps)(SjekkOppfolging as any);