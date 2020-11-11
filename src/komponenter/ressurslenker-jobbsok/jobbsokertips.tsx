import React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { jobbsokerkompetanseLenke, veiviserarbeidssokerLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { JobbsokerbesvarelseContext } from '../../ducks/jobbsokerbesvarelse';

const Jobbsokertips = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const jobbsokerbesvarelseData = React.useContext(JobbsokerbesvarelseContext).data;

    const harJobbbsokerbesvarelse = !!jobbsokerbesvarelseData?.raad;

    const URL = harJobbbsokerbesvarelse ? jobbsokerkompetanseLenke : veiviserarbeidssokerLenke;

    const lenketekst = harJobbbsokerbesvarelse
        ? 'jobbsokertips-overskrift-har-besvarelse'
        : 'jobbsokertips-overskrift-har-ikke-besvarelse';

    const aktivitet = harJobbbsokerbesvarelse ? 'Går til jobbsøkerkompetanse' : 'Går til veiviser arbeidssøker';

    const handleClick = () => {
        loggAktivitet({ aktivitet: aktivitet, ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon href={URL} alt="" onClick={handleClick} overskrift={lenketekst}>
            <JobbsokertipsIkon />
        </LenkepanelMedIkon>
    );
};

export default Jobbsokertips;
