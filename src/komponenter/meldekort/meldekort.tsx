import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { OppfolgingContext } from '../../ducks/oppfolging';

const Meldekort = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { underOppfolging } = React.useContext(OppfolgingContext).data;

    const kanViseKomponent = !erSykmeldtMedArbeidsgiver && underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    const overskrift = 'meldekort-overskrift';
    const ingress = 'meldekort-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til meldekortet', ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon
            href={meldekortLenke}
            className="meldekort"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <EmailText />
        </LenkepanelMedIkon>
    );
};

export default Meldekort;
