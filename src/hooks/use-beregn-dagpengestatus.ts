import { useBrukerinfoData } from '../contexts/bruker-info';
import { useBrukerregistreringData } from '../contexts/brukerregistrering';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';
import { useDpInnsynPaabegynteSoknaderData } from '../contexts/dp-innsyn-paabegynte-soknader';
import { useSWRImmutable } from './useSWR';
import { DP_INNSYN_URL } from '../ducks/api';
import beregnDagpengeStatus from '../lib/beregn-dagpenge-status';
import { DpInnsynSoknad, Vedtak } from '../models/dagpenger';

export function useBeregnDagpengestatus() {
    const brukerInfoData = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
    const { data: innsendteSoknader = [] } = useSWRImmutable<DpInnsynSoknad[]>(`${DP_INNSYN_URL}/soknad`);
    const { data: dagpengeVedtak = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
        arbeidssokerperioder,
    });

    return dagpengeStatus;
}
