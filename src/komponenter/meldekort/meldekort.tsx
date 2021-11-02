import { useContext } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { omMeldekortLenke } from '../../innhold/lenker';
import * as Brukerregistrering from '../../context/brukerregistrering';
import * as MeldekortInnhold from '../../context/meldekort';
import * as Oppfolging from '../../context/oppfolging';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerInfoContext } from '../../context/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { FeaturetoggleContext } from '../../context/feature-toggles';
import { kanViseMeldekortStatus } from '../../lib/kan-vise-meldekort-status';

const Meldekort = () => {
    const amplitudeData = useContext(AmplitudeContext);
    const { data: meldekortData } = useContext(MeldekortInnhold.MeldekortContext);
    const { data: registreringData } = useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = useContext(BrukerInfoContext);
    const { data: featuretoggleData } = useContext(FeaturetoggleContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const { erSykmeldtMedArbeidsgiver } = brukerInfoData;
    const serMeldekortIntro = kanViseMeldekortStatus({
        meldekortData,
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
    });

    const kanViseKomponent = !erSykmeldtMedArbeidsgiver && underOppfolging && !serMeldekortIntro;

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
