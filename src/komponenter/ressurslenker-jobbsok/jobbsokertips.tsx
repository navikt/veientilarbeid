import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { gaTilJobbsokerkompetanse, gaTilVeiviserarbeidssoker } from '../../metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import lenker from '../../innhold/lenker';

interface StateProps {
    harJobbbsokerbesvarelse: boolean;
}

class Ressurslenker extends React.Component<StateProps> {
    render () {
        const {harJobbbsokerbesvarelse} = this.props;
        const URL = harJobbbsokerbesvarelse ? lenker.jobbsokerkompetanse : lenker.veiviserarbeidssoker;

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
