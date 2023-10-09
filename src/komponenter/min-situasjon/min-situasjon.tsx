import { Detail, Heading, Panel } from '@navikt/ds-react';

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

    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4 && harRegistreringData;

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
        <Panel>
            <Detail uppercase>Min situasjon</Detail>
            <Heading className={spacingStyles.mb1} size="medium">
                {heading}
            </Heading>
            <Sammendrag
                startDato={opprettetDato || aktivPeriodeStart}
                manueltRegistrertAv={manueltRegistrertAv}
                amplitudeData={amplitudeData}
            />
            <InnsynLesMer />
        </Panel>
    );
}

export default MinSituasjon;
