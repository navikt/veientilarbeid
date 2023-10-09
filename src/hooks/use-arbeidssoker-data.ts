import { useSWRImmutable } from './useSWR';
import * as Oppfolging from '../hooks/use-oppfolging-data';
import * as BrukerInfo from '../hooks/use-brukerinfo-data';
import * as UlesteDialoger from '../hooks/use-uleste-dialoger';
import * as Brukerregistrering from '../hooks/use-brukerregistrering-data';
import { ARBEIDSOKER_INNHOLD } from '../ducks/api';

interface ArbeidssokerData {
    oppfolging: { data: Oppfolging.Data; status: number };
    brukerregistrering: { data: Brukerregistrering.Data; status: number };
    brukerInfo: { data: BrukerInfo.Data; status: number };
    ulesteDialoger: { data: UlesteDialoger.Data; status: number };
}

export const useArbeidssokerData = () => useSWRImmutable<ArbeidssokerData>(ARBEIDSOKER_INNHOLD);
