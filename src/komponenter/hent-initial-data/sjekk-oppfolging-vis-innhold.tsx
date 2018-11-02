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
import SykemeldingOppfolgingInnhold from '../innhold-sykmelding/innhold-sykmelding';
import Innhold from '../innhold/innhold';

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

    // tslint:disable-next-line:no-any
    renderInnhold (tittelId: string, innhold: any) {
        return (
            <main id="maincontent" role="main" tabIndex={-1}>
                <Overskrift sideTittelId={tittelId}/>
                {innhold}
            </main>
        );
    }

    render() {
        const {oppfolging, config} = this.props;

        if (erSykmeldt(oppfolging)) {
            return this.renderInnhold('overskrift-oppfolging', <SykemeldingOppfolgingInnhold/> );
        } else if (erUnderOppfolging(oppfolging)) {
            return this.renderInnhold('overskrift-veientilarbeid', <Innhold/> );
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