import React from 'react';
import { loggAktivitet } from '../../metrics/metrics';
import JobbsokertipsIkon from './svg/jobbsokertips';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { jobbsokerkompetanseLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { JobbsokerbesvarelseContext } from '../../ducks/jobbsokerbesvarelse';

const Jobbsokertips = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const jobbsokerbesvarelseData = React.useContext(JobbsokerbesvarelseContext).data;

    const harJobbbsokerbesvarelse = !!jobbsokerbesvarelseData?.raad;

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til jobbsøkerkompetanse', ...amplitudeData });
    };

    if (!harJobbbsokerbesvarelse) return null;

    return (
        <LenkepanelMedIkon
            href={jobbsokerkompetanseLenke}
            alt=""
            onClick={handleClick}
            overskrift={'jobbsokertips-overskrift-har-besvarelse'}
        >
            <JobbsokertipsIkon />
        </LenkepanelMedIkon>
    );
};

export default Jobbsokertips;
