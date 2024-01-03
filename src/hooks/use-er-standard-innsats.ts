import { useSWRImmutable } from './useSWR';
import { ER_STANDARD_INNSATSGRUPPE_URL } from '../ducks/api';

function useErStandardInnsats() {
    const { data: erStandardInnsats, error } = useSWRImmutable<boolean>(ER_STANDARD_INNSATSGRUPPE_URL);

    return {
        erStandardInnsats,
        error,
    };
}

export default useErStandardInnsats;
