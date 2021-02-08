import React from 'react';
import { parse } from 'query-string';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import DesignMug from './design-mug';
import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const Aktivitetsplan = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const { location } = window;
    const nyRegistrering = parse(location.search).nyRegistrering === 'true';
    const overskrift = 'aktivitetsplan-overskrift-ordinaer';
    const ingress = 'aktivitetsplan-beskrivelse' + (nyRegistrering ? '-ny' : '');
    const kanViseKomponent = underOppfolging;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser aktivitetsplanen', ...amplitudeData });
        }
    }, [amplitudeData, kanViseKomponent]);

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeData });
    };

    return !kanViseKomponent ? null : (
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
