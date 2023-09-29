import * as React from 'react';
import { useEffect } from 'react';
import * as Oppfolging from '../contexts/oppfolging';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe } from '../contexts/brukerregistrering';
import { fetchData } from '../ducks/api-utils';
import { ARBEIDSOKER_INNHOLD, MOTESTOTTE_URL, STATUS } from '../ducks/api';
import Innholdslaster from '../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import { ProfilProvider } from '../contexts/profil';
import * as BrukerInfo from '../contexts/bruker-info';
import { GjelderFraDatoModalProvider } from '../contexts/gjelder-fra-dato-modal';
import { GjelderFraDatoProvider } from '../contexts/gjelder-fra-dato';
import { AmplitudeProvider } from '../komponenter/hent-initial-data/amplitude-provider';
import * as Motestotte from '../contexts/motestotte';
import * as UlesteDialoger from '../contexts/ulestedialoger';
import { BehovForVeiledningProvider } from '../contexts/behov-for-veiledning';
import { DagpengerStatusProvider } from '../contexts/dagpenger-status';
import { useSWRImmutable } from '../hooks/useSWR';

interface Props {
    children: React.ReactElement<any>;
}

const ArbeidssokerDataProvider = (props: Props) => {
    const [brukerregistreringState, setBrukerregistreringState] = React.useState<Brukerregistrering.State>(
        Brukerregistrering.initialState,
    );
    const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);

    const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
    const [ulesteDialogerState, setUlesteDialogerState] = React.useState<UlesteDialoger.State>(
        UlesteDialoger.initialState,
    );

    const { data } = useSWRImmutable<{
        oppfolging: any;
        brukerregistrering: any;
        brukerInfo: any;
        ulesteDialoger: any;
    }>(ARBEIDSOKER_INNHOLD);

    useEffect(() => {
        if (data) {
            setOppfolgingState({
                data: data.oppfolging.data,
                status: data.oppfolging.status === 200 ? STATUS.OK : STATUS.ERROR,
            });
            setBrukerInfoState({
                data: data.brukerInfo.data,
                status: data.brukerInfo.status === 200 ? STATUS.OK : STATUS.ERROR,
            });
            setBrukerregistreringState({
                data: data.brukerregistrering.data,
                status: data.brukerregistrering.status === 200 ? STATUS.OK : STATUS.ERROR,
            });
            setUlesteDialogerState({
                data: data.ulesteDialoger.data,
                status: data.ulesteDialoger.status === 200 ? STATUS.OK : STATUS.ERROR,
            });
        }
    }, [data]);

    useEffect(() => {
        const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(brukerregistreringState.data);

        if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<Motestotte.State, Motestotte.Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerregistreringState]);

    const avhengigheter = [oppfolgingState, brukerregistreringState, brukerInfoState];

    return (
        <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={avhengigheter}>
            <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
                <Brukerregistrering.BrukerregistreringContext.Provider value={brukerregistreringState}>
                    <BrukerInfo.BrukerInfoContext.Provider value={brukerInfoState}>
                        <Motestotte.MotestotteContext.Provider value={motestotteState}>
                            <UlesteDialoger.UlesteDialogerContext.Provider value={ulesteDialogerState}>
                                <ProfilProvider>
                                    <BehovForVeiledningProvider>
                                        <GjelderFraDatoModalProvider>
                                            <GjelderFraDatoProvider>
                                                <AmplitudeProvider>
                                                    <DagpengerStatusProvider>{props.children}</DagpengerStatusProvider>
                                                </AmplitudeProvider>
                                            </GjelderFraDatoProvider>
                                        </GjelderFraDatoModalProvider>
                                    </BehovForVeiledningProvider>
                                </ProfilProvider>
                            </UlesteDialoger.UlesteDialogerContext.Provider>
                        </Motestotte.MotestotteContext.Provider>
                    </BrukerInfo.BrukerInfoContext.Provider>
                </Brukerregistrering.BrukerregistreringContext.Provider>
            </Oppfolging.OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default ArbeidssokerDataProvider;
