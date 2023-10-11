import * as React from 'react';
import { ReactNode, useEffect } from 'react';

import { fetchData } from '../ducks/api-utils';
import { MOTESTOTTE_URL } from '../ducks/api';
import { ProfilProvider } from '../contexts/profil';
import { GjelderFraDatoModalProvider } from '../contexts/gjelder-fra-dato-modal';
import { GjelderFraDatoProvider } from '../contexts/gjelder-fra-dato';
import { AmplitudeProvider } from '../komponenter/hent-initial-data/amplitude-provider';
import * as Motestotte from '../contexts/motestotte';
import { BehovForVeiledningProvider } from '../contexts/behov-for-veiledning';
import { DagpengerStatusProvider } from '../contexts/dagpenger-status';
import { useArbeidssokerData } from '../hooks/use-arbeidssoker-data';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe } from '../hooks/use-brukerregistrering-data';

interface Props {
    children: ReactNode;
}

const ArbeidssokerDataProvider = ({ children }: Props) => {
    const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
    const { data: arbeidsSokerData } = useArbeidssokerData();

    useEffect(() => {
        if (arbeidsSokerData) {
            const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(arbeidsSokerData.brukerregistrering.data);

            if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
                fetchData<Motestotte.State, Motestotte.Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
            }
        }
    }, [arbeidsSokerData]);

    return (
        <Motestotte.MotestotteContext.Provider value={motestotteState}>
            <ProfilProvider>
                <BehovForVeiledningProvider>
                    <GjelderFraDatoModalProvider>
                        <GjelderFraDatoProvider>
                            <AmplitudeProvider>
                                <DagpengerStatusProvider>{children}</DagpengerStatusProvider>
                            </AmplitudeProvider>
                        </GjelderFraDatoProvider>
                    </GjelderFraDatoModalProvider>
                </BehovForVeiledningProvider>
            </ProfilProvider>
        </Motestotte.MotestotteContext.Provider>
    );
};

export default ArbeidssokerDataProvider;
