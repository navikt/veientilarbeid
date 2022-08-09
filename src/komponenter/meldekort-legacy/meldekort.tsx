import { useContext } from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { omMeldekortLenke } from '../../innhold/lenker';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import * as MeldekortInnhold from '../../contexts/meldekort';
import * as Oppfolging from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import { kanViseMeldekortStatus } from '../../lib/kan-vise-meldekort-status';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        overskrift: 'Meldekort',
        ingress: 'Send inn, endre og se innsendte meldekort.',
    },
    en: {
        overskrift: 'Employment status form',
        ingress: 'Submit, edit and see your employment status forms.',
    },
};

const Meldekort = () => {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const brukerInfoData = useBrukerinfoData();
    const { data: meldekortData } = useContext(MeldekortInnhold.MeldekortContext);
    const { data: oppfolgingData } = useContext(Oppfolging.OppfolgingContext);
    const { underOppfolging } = useContext(UnderOppfolgingContext).data;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const { erSykmeldtMedArbeidsgiver } = brukerInfoData;
    const serMeldekortIntro = kanViseMeldekortStatus({
        meldekortData,
        brukerInfoData,
        oppfolgingData,
        registreringData,
    });

    const kanViseKomponent = !erSykmeldtMedArbeidsgiver && underOppfolging && !serMeldekortIntro;

    if (!kanViseKomponent) {
        return null;
    }

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til meldekortet', ...amplitudeData });
    };

    return (
        <LenkepanelMedIkon
            href={omMeldekortLenke}
            className="meldekort"
            alt=""
            onClick={handleClick}
            overskrift={tekst('overskrift')}
            ingress={tekst('ingress')}
        >
            <EmailText />
        </LenkepanelMedIkon>
    );
};

export default Meldekort;
