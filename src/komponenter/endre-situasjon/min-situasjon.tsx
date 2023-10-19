import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useBesvarelse } from '../../contexts/besvarelse';
import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';

import Sammendrag from './sammendrag';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import AiAInViewport from '../aia-in-viewport/aia-in-viewport';
import ErRendret from '../er-rendret/er-rendret';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
import { Box, Detail } from '@navikt/ds-react';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

function MinSituasjon() {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const autentiseringData = useAutentiseringData();
    const { besvarelse } = useBesvarelse();
    const besvarelseData = besvarelse ? besvarelse.besvarelse : null;

    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv } = brukerregistreringData?.registrering || {};
    const { endretTidspunkt, endretAv, erBesvarelsenEndret } = besvarelse || {};
    const kanViseKomponent = autentiseringData.securityLevel === InnloggingsNiva.LEVEL_4;
    const skalVisesITabs = useSkalBrukeTabs();
    if (!kanViseKomponent) return null;

    return (
        <Box padding="4" style={{ paddingLeft: 0, paddingTop: 0, paddingRight: 0 }}>
            <ErRendret loggTekst="Rendrer endring av situasjon" />
            <Box padding="4">
                {!skalVisesITabs && <Detail uppercase>Min situasjon</Detail>}
                <Sammendrag
                    startDato={opprettetDato || aktivPeriodeStart}
                    manueltRegistrertAv={manueltRegistrertAv}
                    amplitudeData={amplitudeData}
                    besvarelse={besvarelseData}
                    endretTidspunkt={endretTidspunkt}
                    endretAv={endretAv}
                    erBesvarelsenEndret={erBesvarelsenEndret}
                />
            </Box>
            <AiAInViewport loggTekst="Viser endring av situasjon" />
        </Box>
    );
}

export default MinSituasjon;
