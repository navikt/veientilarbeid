import { BodyShort, Box, Detail, Heading } from '@navikt/ds-react';

import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBesvarelse } from '../../contexts/besvarelse';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import EndreSituasjon from '../endre-situasjon/min-situasjon';
import { visBesvarelser } from '../../lib/vis-besvarelse';
import spacingStyles from '../../spacing.module.css';
import { svarMap } from '../../models/sporsmal-og-svar';
import useErStandardInnsats from '../../hooks/use-er-standard-innsats';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
import { useBrukerInfoData } from '../../hooks/use-brukerinfo-data';
import { useOppfolgingData } from '../../hooks/use-oppfolging-data';
import prettyPrintDato from '../../utils/pretty-print-dato';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { TEKSTER } from '../registrert-tittel/registrert-tittel';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

function MinSituasjon() {
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();
    const featuretoggleData = useFeatureToggleData();

    const registreringData = useBrukerregistreringData();
    const brukerInfoData = useBrukerInfoData();
    const { besvarelse } = useBesvarelse();
    const oppfolgingData = useOppfolgingData();
    const { erStandardInnsats } = useErStandardInnsats();

    const beregnedeArbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { aktivPeriodeStart } = beregnedeArbeidssokerperioder;
    const { opprettetDato, manueltRegistrertAv } = registreringData?.registrering || {};
    const harRegistreringData = Boolean(registreringData?.registrering);
    const registrertDato = registreringData?.registrering?.opprettetDato || false;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 && harRegistreringData;
    const skalVisesITabs = useSkalBrukeTabs();

    const visEndreSituasjon = visBesvarelser({
        brukerInfoData,
        oppfolgingData,
        registreringData,
        featuretoggleData,
        besvarelseData: besvarelse,
        arbeidssokerPeriodeData: beregnedeArbeidssokerperioder,
        erStandardInnsats,
    });

    if (!kanViseKomponent) return null;

    if (visEndreSituasjon) {
        return <EndreSituasjon />;
    }

    const heading = registreringData?.registrering?.besvarelse?.dinSituasjon
        ? svarMap.dinSituasjon[registreringData?.registrering?.besvarelse?.dinSituasjon]
        : 'Min jobbsituasjon: ukjent';

    return (
        <Box padding="4">
            {!skalVisesITabs && <Detail uppercase>Min situasjon</Detail>}
            <Heading className={spacingStyles.mb1} size="small">
                {heading}
            </Heading>
            {registrertDato && (
                <BodyShort className={spacingStyles.mb1}>
                    {tekst('registreringsDato')}: {prettyPrintDato(registrertDato)}
                </BodyShort>
            )}
            <Sammendrag
                startDato={opprettetDato || aktivPeriodeStart}
                manueltRegistrertAv={manueltRegistrertAv}
                amplitudeData={amplitudeData}
            />
            <InnsynLesMer />
        </Box>
    );
}

export default MinSituasjon;
