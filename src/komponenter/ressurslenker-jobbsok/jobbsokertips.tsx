import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { loggAktivitet } from '../../metrics/metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { jobbsokerkompetanseLenke, veiviserarbeidssokerLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from "../../ducks/amplitude-aktivitet-context";

interface StateProps {
    harJobbbsokerbesvarelse: boolean;
}

const Ressurslenker = (props: StateProps) => {
    const { harJobbbsokerbesvarelse } = props;
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);

    const URL = harJobbbsokerbesvarelse ? jobbsokerkompetanseLenke : veiviserarbeidssokerLenke;

    const lenketekst = harJobbbsokerbesvarelse
        ? 'jobbsokertips-overskrift-har-besvarelse'
        : 'jobbsokertips-overskrift-har-ikke-besvarelse';

    const aktivitet = harJobbbsokerbesvarelse
        ? 'Går til jobbsøkerkompetanse'
        : 'Går til veiviser arbeidssøker';

    const handleClick = () => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon
            href={URL}
            alt=""
            onClick={handleClick}
            overskrift={lenketekst}
        >
            <JobbsokertipsIkon/>
        </LenkepanelMedIkon>
    );
}

const mapStateToProps = (state: AppState): StateProps => ({
    harJobbbsokerbesvarelse: state.jobbsokerbesvarelse.harJobbsokerbesvarelse,
});

export default connect(mapStateToProps)(Ressurslenker);
