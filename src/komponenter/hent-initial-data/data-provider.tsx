import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import * as BrukerInfo from '../../ducks/bruker-info';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as PaabegynteSoknader from '../../ducks/paabegynte-soknader';
import * as MuligeEttersendelser from '../../ducks/mulige-ettersendelser';
import * as Sakstema from '../../ducks/sakstema';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe } from '../../ducks/brukerregistrering';
import * as Motestotte from '../../ducks/motestotte';
import * as Meldekort from '../../ducks/meldekort';
import * as Egenvurdering from '../../ducks/egenvurdering';
import * as UlesteDialoger from '../../ducks/ulestedialoger';
import * as Jobbsokerbesvarelse from '../../ducks/jobbsokerbesvarelse';
import { fetchData } from '../../ducks/api-utils';
import {
    BRUKERINFO_URL,
    EGENVURDERINGBESVARELSE_URL,
    JOBBSOKERBESVARELSE_URL,
    MOTESTOTTE_URL,
    NESTE_MELDEKORT_URL,
    ULESTEDIALOGER_URL,
    PAABEGYNTE_SOKNADER_URL,
    MULIGE_ETTERSENDELSER_URL,
    SAKSTEMA_URL,
} from '../../ducks/api';
import { AmplitudeProvider } from './amplitude-provider';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

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
    const { securityLevel } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
    const [meldekortState, setMeldekortState] = React.useState<Meldekort.State>(Meldekort.initialState);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);
    const [sakstemaState, setSakstemaState] = React.useState<Sakstema.State>(Sakstema.initialState);
    const [muligeEttersendelserState, setMuligeEttersendelserState] = React.useState<MuligeEttersendelser.State>(
        MuligeEttersendelser.initialState
    );
    const [paabegynteSoknaderState, setPaabegynteSoknaderState] = React.useState<PaabegynteSoknader.State>(
        PaabegynteSoknader.initialState
    );
    const [egenvurderingState, setEgenvurderingState] = React.useState<Egenvurdering.State>(Egenvurdering.initialState);
    const [ulesteDialogerState, setUlesteDialogerState] = React.useState<UlesteDialoger.State>(
        UlesteDialoger.initialState
    );
    const [jobbsokerbesvarelseState, setJobbsokerbesvarelseState] = React.useState<Jobbsokerbesvarelse.State>(
        Jobbsokerbesvarelse.initialState
    );

    const data = React.useContext(Brukerregistrering.BrukerregistreringContext).data;
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

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
        fetchData<Sakstema.State, Sakstema.Data>(sakstemaState, setSakstemaState, SAKSTEMA_URL);
        fetchData<MuligeEttersendelser.State, MuligeEttersendelser.Data>(
            muligeEttersendelserState,
            setMuligeEttersendelserState,
            MULIGE_ETTERSENDELSER_URL
        );
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
            fetchData<Jobbsokerbesvarelse.State, Jobbsokerbesvarelse.Data>(
                jobbsokerbesvarelseState,
                setJobbsokerbesvarelseState,
                JOBBSOKERBESVARELSE_URL
            );
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
    }, [securityLevel, underOppfolging]);

    const avhengigheter: any[] = [];
    const ventPa: any[] = [];

    if (securityLevel === InnloggingsNiva.LEVEL_4) {
        avhengigheter.push(brukerInfoState);
        ventPa.push(ulesteDialogerState);

        if (underOppfolging) {
            ventPa.push(jobbsokerbesvarelseState);

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
                        <Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider value={jobbsokerbesvarelseState}>
                            <Egenvurdering.EgenvurderingContext.Provider value={egenvurderingState}>
                                <Motestotte.MotestotteContext.Provider value={motestotteState}>
                                    <PaabegynteSoknader.PaabegynteSoknaderContext.Provider
                                        value={paabegynteSoknaderState}
                                    >
                                        <MuligeEttersendelser.MuligeEttersendelserContext.Provider
                                            value={muligeEttersendelserState}
                                        >
                                            <Sakstema.SakstemaContext.Provider value={sakstemaState}>
                                                <AmplitudeProvider>{children}</AmplitudeProvider>
                                            </Sakstema.SakstemaContext.Provider>
                                        </MuligeEttersendelser.MuligeEttersendelserContext.Provider>
                                    </PaabegynteSoknader.PaabegynteSoknaderContext.Provider>
                                </Motestotte.MotestotteContext.Provider>
                            </Egenvurdering.EgenvurderingContext.Provider>
                        </Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider>
                    </UlesteDialoger.UlesteDialogerContext.Provider>
                </BrukerInfo.BrukerInfoContext.Provider>
            </Meldekort.MeldekortContext.Provider>
        </Innholdslaster>
    );
};

export default DataProvider;
