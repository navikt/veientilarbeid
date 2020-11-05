import React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';

const Aktivitetsplan = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { location } = window;
    const nyRegistrering = parse(location.search).nyRegistrering === 'true';
    const overskrift = 'aktivitetsplan-overskrift-ordinaer';
    const ingress = 'aktivitetsplan-beskrivelse' + (nyRegistrering ? '-ny' : '');

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon
            href={aktivitetsplanLenke}
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
            className="aktivitetsplanPanel"
        >
            <DesignMug />
        </LenkepanelMedIkon>
    );
};

export default Aktivitetsplan;
