import { Box, Detail } from '@navikt/ds-react';
import {
    hentSisteArbeidssokerPeriode,
    hentSisteOpplysningerOmArbeidssoker,
} from '@navikt/arbeidssokerregisteret-utils';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useArbeidssokerperioder } from '../../contexts/arbeidssokerperioder';
import { useOpplysningerOmArbeidssoker } from '../../contexts/opplysninger-om-arbeidssoker';
import { useBesvarelse } from '../../contexts/besvarelse';
import useSkalBrukeTabs from '../../hooks/use-skal-bruke-tabs';

import Sammendrag from './sammendrag';
import AiAInViewport from '../aia-in-viewport/aia-in-viewport';
import ErRendret from '../er-rendret/er-rendret';

function MinSituasjon() {
    const arbeidssoekerperioder = useArbeidssokerperioder().arbeidssokerperioder;
    const opplysningerOmArbeidssoeker = useOpplysningerOmArbeidssoker().opplysningerOmArbeidssoker;
    const { amplitudeData } = useAmplitudeData();
    const { besvarelse } = useBesvarelse();

    const sisteArbeidssoekerperiode = hentSisteArbeidssokerPeriode(arbeidssoekerperioder);
    const startDato = sisteArbeidssoekerperiode.startet.tidspunkt;
    const sisteOpplysninger = hentSisteOpplysningerOmArbeidssoker(opplysningerOmArbeidssoeker);
    const manueltRegistrertAv = sisteOpplysninger.sendtInnAv.utfoertAv.type !== 'BRUKER';
    const besvarelseData = besvarelse ? besvarelse.besvarelse : null;

    const { endretTidspunkt, endretAv, erBesvarelsenEndret } = besvarelse || {};
    const skalVisesITabs = useSkalBrukeTabs();

    return (
        <Box>
            <ErRendret loggTekst="Rendrer endring av situasjon" />
            <Box>
                {!skalVisesITabs && <Detail uppercase>Min situasjon</Detail>}
                <Sammendrag
                    startDato={startDato}
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
