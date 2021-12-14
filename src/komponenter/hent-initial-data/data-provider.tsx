import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import * as BrukerInfo from '../../contexts/bruker-info';
import * as PaabegynteSoknader from '../../contexts/paabegynte-soknader';
import {
    ForeslattInnsatsgruppe,
    selectForeslattInnsatsgruppe,
    useBrukerregistreringData,
} from '../../contexts/brukerregistrering';
import * as Motestotte from '../../contexts/motestotte';
import * as Meldekort from '../../contexts/meldekort';
import * as Egenvurdering from '../../contexts/egenvurdering';
import * as UlesteDialoger from '../../contexts/ulestedialoger';
import { fetchData } from '../../ducks/api-utils';
import {
    BRUKERINFO_URL,
    EGENVURDERINGBESVARELSE_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    PAABEGYNTE_SOKNADER_URL,
    DP_INNSYN_URL,
} from '../../ducks/api';

import { AmplitudeProvider } from './amplitude-provider';
import { SakstemaProvider } from './sakstema-provider';
import { useAutentiseringData, InnloggingsNiva } from '../../contexts/autentisering';
import { UnderOppfolgingContext } from '../../contexts/under-oppfolging';
import * as DpInnsynSoknad from '../../contexts/dp-innsyn-soknad';
import * as DpInnsynVedtak from '../../contexts/dp-innsyn-vedtak';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

const skalSjekkeEgenvurderingBesvarelse = (
    foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null
): boolean => {
    return (
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS
    );
};

interface OwnProps {
    children: React.ReactNode;
}

type Props = OwnProps;

const DataProvider = ({ children }: Props) => {
    const { securityLevel } = useAutentiseringData();
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
    const [meldekortState, setMeldekortState] = React.useState<Meldekort.State>(Meldekort.initialState);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);
    const [paabegynteSoknaderState, setPaabegynteSoknaderState] = React.useState<PaabegynteSoknader.State>(
        PaabegynteSoknader.initialState
    );
    const [egenvurderingState, setEgenvurderingState] = React.useState<Egenvurdering.State>(Egenvurdering.initialState);
    const [ulesteDialogerState, setUlesteDialogerState] = React.useState<UlesteDialoger.State>(
        UlesteDialoger.initialState
    );
    const [dpInnsynSoknadState, setDpInnsynSoknadState] = React.useState<DpInnsynSoknad.State>(
        DpInnsynSoknad.initialState
    );
    const [dpInnsynVedtakState, setDpInnsynVedtakState] = React.useState<DpInnsynVedtak.State>(
        DpInnsynVedtak.initialState
    );

    const data = useBrukerregistreringData();
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    const featureToggleData = useFeatureToggleData();
    const kanHenteDpData = featureToggleData['veientilarbeid.bruk-dp-innsyn-api'];

    React.useEffect(() => {
        if (securityLevel !== InnloggingsNiva.LEVEL_4) {
            return;
        }
        fetchData<Meldekort.State, Meldekort.Data>(meldekortState, setMeldekortState, NESTE_MELDEKORT_URL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [securityLevel]);

    React.useEffect(() => {
        if (securityLevel !== InnloggingsNiva.LEVEL_4) {
            return;
        }

        fetchData<BrukerInfo.State, BrukerInfo.Data>(brukerInfoState, setBrukerInfoState, BRUKERINFO_URL);

        if (kanHenteDpData) {
            fetchData<DpInnsynSoknad.State, DpInnsynSoknad.Data>(
                dpInnsynSoknadState,
                setDpInnsynSoknadState,
                `${DP_INNSYN_URL}/soknad`
            );

            fetchData<DpInnsynVedtak.State, DpInnsynVedtak.Data>(
                dpInnsynVedtakState,
                setDpInnsynVedtakState,
                `${DP_INNSYN_URL}/vedtak`
            );
        }

        fetchData<PaabegynteSoknader.State, PaabegynteSoknader.Data>(
            paabegynteSoknaderState,
            setPaabegynteSoknaderState,
            PAABEGYNTE_SOKNADER_URL
        );
        fetchData<UlesteDialoger.State, UlesteDialoger.Data>(
            ulesteDialogerState,
            setUlesteDialogerState,
            ULESTEDIALOGER_URL
        );

        if (underOppfolging) {
            if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
                fetchData<Egenvurdering.State, Egenvurdering.Data>(
                    egenvurderingState,
                    setEgenvurderingState,
                    EGENVURDERINGBESVARELSE_URL
                );
            } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
                fetchData<Motestotte.State, Motestotte.Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [securityLevel, underOppfolging, kanHenteDpData]);

    const avhengigheter: any[] = [];
    const ventPa: any[] = [];

    if (securityLevel === InnloggingsNiva.LEVEL_4) {
        avhengigheter.push(brukerInfoState);
        ventPa.push(ulesteDialogerState);

        if (underOppfolging) {
            if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
                ventPa.push(egenvurderingState);
            }

            if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
                ventPa.push(motestotteState);
            }
        }
    }

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse" />}
            storrelse="XXL"
            avhengigheter={avhengigheter}
            ventPa={ventPa}
        >
            <Meldekort.MeldekortContext.Provider value={meldekortState}>
                <BrukerInfo.BrukerInfoContext.Provider value={brukerInfoState}>
                    <UlesteDialoger.UlesteDialogerContext.Provider value={ulesteDialogerState}>
                        <Egenvurdering.EgenvurderingContext.Provider value={egenvurderingState}>
                            <Motestotte.MotestotteContext.Provider value={motestotteState}>
                                <PaabegynteSoknader.PaabegynteSoknaderContext.Provider value={paabegynteSoknaderState}>
                                    <DpInnsynSoknad.DpInnsynSoknadContext.Provider value={dpInnsynSoknadState}>
                                        <DpInnsynVedtak.DpInnsynVedtakContext.Provider value={dpInnsynVedtakState}>
                                            <AmplitudeProvider>
                                                {/** Denne skal fjernes når nye DP-innsyn er på plass */}
                                                <SakstemaProvider>{children}</SakstemaProvider>
                                            </AmplitudeProvider>
                                        </DpInnsynVedtak.DpInnsynVedtakContext.Provider>
                                    </DpInnsynSoknad.DpInnsynSoknadContext.Provider>
                                </PaabegynteSoknader.PaabegynteSoknaderContext.Provider>
                            </Motestotte.MotestotteContext.Provider>
                        </Egenvurdering.EgenvurderingContext.Provider>
                    </UlesteDialoger.UlesteDialogerContext.Provider>
                </BrukerInfo.BrukerInfoContext.Provider>
            </Meldekort.MeldekortContext.Provider>
        </Innholdslaster>
    );
};

export default DataProvider;
