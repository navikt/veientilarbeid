import * as React from 'react';
import * as Oppfolging from '../contexts/oppfolging';
import * as Egenvurdering from '../contexts/egenvurdering';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import { fetchData } from '../ducks/api-utils';
import {
    BRUKERINFO_URL,
    BRUKERREGISTRERING_URL,
    EGENVURDERINGBESVARELSE_URL,
    VEILARBOPPFOLGING_URL,
} from '../ducks/api';
import Innholdslaster from '../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';
import { ProfilProvider } from '../contexts/profil';
import * as BrukerInfo from '../contexts/bruker-info';
import { useEffect } from 'react';
import { GjelderFraDatoModalProvider } from '../contexts/gjelder-fra-dato-modal';
import { GjelderFraDatoProvider } from '../contexts/gjelder-fra-dato';

interface Props {
    children: React.ReactElement<any>;
}

const ArbeidssokerDataProvider = (props: Props) => {
    const [brukerregistreringState, setBrukerregistreringState] = React.useState<Brukerregistrering.State>(
        Brukerregistrering.initialState
    );
    const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);
    const [egenvurderingState, setEgenvurderingState] = React.useState<Egenvurdering.State>(Egenvurdering.initialState);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);

    useEffect(() => {
        fetchData<Oppfolging.State, Oppfolging.Data>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
        fetchData<Brukerregistrering.State, Brukerregistrering.Data>(
            brukerregistreringState,
            setBrukerregistreringState,
            BRUKERREGISTRERING_URL
        );
        fetchData<Egenvurdering.State, Egenvurdering.Data>(
            egenvurderingState,
            setEgenvurderingState,
            EGENVURDERINGBESVARELSE_URL
        );
        fetchData<BrukerInfo.State, BrukerInfo.Data>(brukerInfoState, setBrukerInfoState, BRUKERINFO_URL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const avhengigheter = [oppfolgingState, brukerregistreringState, egenvurderingState];

    return (
        <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={avhengigheter}>
            <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
                <Brukerregistrering.BrukerregistreringContext.Provider value={brukerregistreringState}>
                    <Egenvurdering.EgenvurderingContext.Provider value={egenvurderingState}>
                        <BrukerInfo.BrukerInfoContext.Provider value={brukerInfoState}>
                            <ProfilProvider>
                                <GjelderFraDatoModalProvider>
                                    <GjelderFraDatoProvider>{props.children}</GjelderFraDatoProvider>
                                </GjelderFraDatoModalProvider>
                            </ProfilProvider>
                        </BrukerInfo.BrukerInfoContext.Provider>
                    </Egenvurdering.EgenvurderingContext.Provider>
                </Brukerregistrering.BrukerregistreringContext.Provider>
            </Oppfolging.OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default ArbeidssokerDataProvider;
