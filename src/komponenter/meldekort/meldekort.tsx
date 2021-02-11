import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { omMeldekortLenke } from '../../innhold/lenker';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const Meldekort = () => {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const kanViseKomponent = !erSykmeldtMedArbeidsgiver && underOppfolging;

    if (!kanViseKomponent) {
        return null;
    }

    const overskrift = 'meldekort-overskrift';
    const ingress = 'meldekort-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til meldekortet', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon
            href={omMeldekortLenke}
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
