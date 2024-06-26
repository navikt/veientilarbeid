import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';
import { useAmplitudeData } from '../komponenter/hent-initial-data/amplitude-provider';

import { fetchToJson } from '../ducks/api-utils';
import { BESVARELSE_URL, OPPRETT_DIALOG_URL, OPPRETT_OPPGAVE_URL, requestConfig } from '../ducks/api';

import { PermittertSvar } from '../models/endring-av-situasjon';
import {
    AndreForholdSvar,
    DinSituasjonSvar,
    FremtidigSituasjonSvar,
    HelseHinderSvar,
    SisteStillingSvar,
    TilbakeIArbeidSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    UtdanningSvar,
} from '../hooks/use-brukerregistrering-data';

export type DinSituasjonTilleggsdata = {
    oppsigelseDato?: string;
    forsteArbeidsdagDato?: string;
    sisteArbeidsdagDato?: string;
    gjelderFraDato?: string;
    permitteringsProsent?: string;
    permitteringForlenget?: string;
    stillingsProsent?: string;
    harNyJobb?: string;
};

export type DinSituasjonRequest = {
    dinSituasjon: {
        verdi: DinSituasjonSvar | PermittertSvar;
        gjelderFraDato?: string;
        gjelderTilDato?: string;
        tilleggsData: DinSituasjonTilleggsdata;
    };
};

export type DinSituasjonResponse = {
    verdi: DinSituasjonSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
    tilleggsData: DinSituasjonTilleggsdata | null;
};

export type UtdanningResponse = {
    verdi: UtdanningSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type UtdanningBestattResponse = {
    verdi: UtdanningBestattSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type UtdanningGodkjentResponse = {
    verdi: UtdanningGodkjentSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type HelseHinderResponse = {
    verdi: HelseHinderSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type AndreForholdResponse = {
    verdi: AndreForholdSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type SisteStillingResponse = {
    verdi: SisteStillingSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type FremtidigSituasjonResponse = {
    verdi: FremtidigSituasjonSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type TilbakeIArbeidResponse = {
    verdi: TilbakeIArbeidSvar;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretTidspunkt: string | null;
    endretAv: BrukerEllerNav | null;
};

export type BrukerEllerNav = 'BRUKER' | 'VEILEDER' | 'SYSTEM';

export type BesvarelseRequest = {
    tekst?: string;
    overskrift?: string;
    oppgaveBeskrivelse?: string;
    venterPaaSvarFraNav?: boolean;
    valgtSituasjon?: PermittertSvar | DinSituasjonSvar;
    oppdatering: DinSituasjonRequest;
};

export type Besvarelse = {
    dinSituasjon?: DinSituasjonResponse;
    utdanning?: UtdanningResponse;
    utdanningBestatt?: UtdanningBestattResponse;
    utdannningGodkjent?: UtdanningGodkjentResponse;
    helseHinder?: HelseHinderResponse;
    andreForhold?: AndreForholdResponse;
    sisteStilling?: SisteStillingResponse;
    fremtidigSituasjon?: FremtidigSituasjonResponse;
    tilbakeIArbeid?: TilbakeIArbeidResponse;
};

export type BesvarelseResponse = {
    registreringsId?: string;
    besvarelse?: Besvarelse;
    registreringsTidspunkt?: string;
    opprettetAv?: string;
    endretTidspunkt?: string;
    endretAv?: BrukerEllerNav;
    erBesvarelsenEndret?: boolean;
} | null;

interface BesvarelseProviderType {
    besvarelse: BesvarelseResponse;
    lagreBesvarelse: (behovForVeiledning: BesvarelseRequest) => Promise<void>;
}

export const BesvarelseContext = createContext<BesvarelseProviderType>({
    besvarelse: null,
    lagreBesvarelse: () => Promise.resolve(),
});

async function opprettDialog(data: {
    tekst?: string;
    overskrift?: string;
    venterPaaSvarFraNav?: boolean;
}): Promise<null | { id: string }> {
    if (!data.tekst && !data.overskrift) {
        return Promise.resolve(null);
    }

    return fetchToJson(OPPRETT_DIALOG_URL, {
        ...requestConfig(),
        method: 'POST',
        body: JSON.stringify({
            tekst: data.tekst,
            overskrift: data.overskrift,
            venterPaaSvarFraNav: data.venterPaaSvarFraNav,
        }),
    });
}

async function opprettOppgave(data: {
    oppgaveBeskrivelse?: string;
    valgtSituasjon?: DinSituasjonSvar | PermittertSvar;
}): Promise<null | { id: string }> {
    if (!data.oppgaveBeskrivelse) {
        return Promise.resolve(null);
    }

    return fetchToJson(OPPRETT_OPPGAVE_URL, {
        ...requestConfig(),
        method: 'POST',
        body: JSON.stringify({
            beskrivelse: data.oppgaveBeskrivelse,
            dinSituasjon: data.valgtSituasjon,
        }),
    });
}

function BesvarelseProvider(props: { children: ReactNode }) {
    const featureToggles = useFeatureToggleData();
    const { oppdaterAmplitudeData } = useAmplitudeData();
    const [besvarelse, settBesvarelse] = useState<BesvarelseResponse>(null);

    const erToggletPa = featureToggles[FeatureToggles.BRUK_ENDRING_AV_SITUASJON];
    const erOpprettOppgaveToggletPaa = featureToggles[FeatureToggles.BRUK_OPPRETT_OPPGAVE];

    const hentBesvarelse = async () => {
        try {
            const oppdatertBesvarelse = await fetchToJson(BESVARELSE_URL, requestConfig());
            if (oppdatertBesvarelse) {
                settBesvarelse(oppdatertBesvarelse as BesvarelseResponse);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const lagreBesvarelse = async (data: BesvarelseRequest) => {
        try {
            if (erOpprettOppgaveToggletPaa) {
                await opprettOppgave(data);
                try {
                    await opprettDialog(data);
                } catch (err) {
                    // Gå videre og lagre besvarelse, oppgave er opprettet
                    console.error('Feil ved opprettelse av dialog', err);
                }
            } else {
                // Kast exception hvis dialog feiler, og oppgave ikke opprettet
                await opprettDialog(data);
            }
            const behov: BesvarelseResponse = await fetchToJson(BESVARELSE_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ ...data.oppdatering }),
            });
            settBesvarelse(behov);
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        if (erToggletPa) {
            hentBesvarelse();
        }
    }, [erToggletPa]);

    useEffect(() => {
        if (besvarelse?.erBesvarelsenEndret === true) {
            oppdaterAmplitudeData({
                endretSituasjon: besvarelse.besvarelse?.dinSituasjon?.verdi || 'N/A',
            });
        }
    }, [besvarelse]);

    const contextValue = {
        besvarelse,
        lagreBesvarelse,
    };

    return <BesvarelseContext.Provider value={contextValue}>{props.children}</BesvarelseContext.Provider>;
}

function useBesvarelse() {
    const context = useContext(BesvarelseContext);

    if (context === undefined) {
        throw new Error('useBesvarelse må brukes under en BesvarelseProvider');
    }
    return context;
}

export { BesvarelseProvider, useBesvarelse };
