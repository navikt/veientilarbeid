import { Box, Detail } from '@navikt/ds-react';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useBesvarelse } from '../../contexts/besvarelse';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

import Sammendrag from './sammendrag';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import AiAInViewport from '../aia-in-viewport/aia-in-viewport';
import ErRendret from '../er-rendret/er-rendret';

function MinSituasjon() {
    const brukerregistreringData = useBrukerregistreringData();
    const arbeidssokerperiodeData = useArbeidssokerPerioder();
    const { amplitudeData } = useAmplitudeData();
    const { besvarelse } = useBesvarelse();
    const besvarelseData = besvarelse ? besvarelse.besvarelse : null;

    const { aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperiodeData);
    const { opprettetDato, manueltRegistrertAv } = brukerregistreringData?.registrering || {};
    const { endretTidspunkt, endretAv, erBesvarelsenEndret } = besvarelse || {};
    const skalVisesITabs = useSkalBrukeTabs();

    return (
        <Box>
            <ErRendret loggTekst="Rendrer endring av situasjon" />
            <Box>
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
