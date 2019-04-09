import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilJobbsokerkompetanse, gaTilVeiviserarbeidssoker } from '../../metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';

const VEIVISER2_URL = '/veiviserarbeidssoker/';
const JOBBSOKERKOMPETANSE_RESULTAT_URL = '/jobbsokerkompetanse/resultatside';

interface StateProps {
    harJobbbsokerbesvarelse: boolean;
}

class Ressurslenker extends React.Component<StateProps> {
    render () {
        const {harJobbbsokerbesvarelse} = this.props;
        const URL = harJobbbsokerbesvarelse ? JOBBSOKERKOMPETANSE_RESULTAT_URL : VEIVISER2_URL;

        const lenketekst = harJobbbsokerbesvarelse
            ? 'jobbsokertips-overskrift-har-besvarelse'
            : 'jobbsokertips-overskrift-har-ikke-besvarelse';

        const gaTil = harJobbbsokerbesvarelse
            ? gaTilJobbsokerkompetanse
            : gaTilVeiviserarbeidssoker;

        return (
            <LenkepanelMedIkon
                href={URL}
                alt=""
                onClick={gaTil}
                overskrift={lenketekst}
            >
                <JobbsokertipsIkon/>
            </LenkepanelMedIkon>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    harJobbbsokerbesvarelse: state.jobbsokerbesvarelse.harJobbsokerbesvarelse
});

export default connect(mapStateToProps)(Ressurslenker);
