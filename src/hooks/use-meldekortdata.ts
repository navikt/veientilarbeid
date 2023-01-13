import { DataElement, NESTE_MELDEKORT_URL } from '../ducks/api';
import { useSWRImmutable } from './useSWR';
import { useEffect } from 'react';
import { datoUtenTid } from '../utils/date-utils';
import { hentMeldegruppeForNesteMeldekort, hentMeldekortForLevering } from '../utils/meldekort-utils';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

export interface State extends DataElement {
    data: Data | null;
}

interface MeldeperiodeInn {
    fra?: string;
    til?: string;
    kortKanSendesFra?: string;
    kanKortSendes?: boolean;
    periodeKode?: string;
}

export interface Meldekort {
    mottattDato?: string | null;
    meldeperiode?: MeldeperiodeInn | null;
    meldegruppe?: string | null;
}

export interface Data {
    meldekort?: Meldekort[];
}

export function useMeldekortData() {
    const { data, error } = useSWRImmutable<Data>(NESTE_MELDEKORT_URL);
    const { oppdaterAmplitudeData } = useAmplitudeData();

    const setMeldekortData = (data: Data) => {
        const iDag = datoUtenTid(new Date().toISOString());
        const antallMeldekortKlareForLevering = hentMeldekortForLevering(iDag, data).length;
        const meldegruppe = data ? hentMeldegruppeForNesteMeldekort(data) : null;

        oppdaterAmplitudeData({
            meldegruppe: meldegruppe ? meldegruppe : 'INGEN_VERDI',
            antallMeldekortKlareForLevering: antallMeldekortKlareForLevering,
        });
    };

    useEffect(() => {
        if (data) {
            console.log('SetMeldekortData!');
            setMeldekortData(data);
        }
    }, [data]);

    return {
        meldekortData: data,
        isLoading: !error && !data,
        isError: error,
    };
}
