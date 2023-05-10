import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useFeatureToggleData, FeatureToggles } from './feature-toggles';

import { fetchToJson } from '../ducks/api-utils';
import { BESVARELSE_URL, OPPRETT_DIALOG_URL, requestConfig } from '../ducks/api';
import {
    DinSituasjonSvar,
    UtdanningSvar,
    UtdanningBestattSvar,
    UtdanningGodkjentSvar,
    HelseHinderSvar,
    AndreForholdSvar,
    SisteStillingSvar,
    FremtidigSituasjonSvar,
    TilbakeIArbeidSvar,
} from './brukerregistrering';

export type DinSituasjonRequest = {
    besvarelse: {
        dinSituasjon: {
            verdi: DinSituasjonSvar;
            gjelderFra?: string;
            gjelderTil?: string;
        };
    };
};

export type DinSituasjonResponse = {
    verdi: DinSituasjonSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type UtdanningResponse = {
    verdi: UtdanningSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type UtdanningBestattResponse = {
    verdi: UtdanningBestattSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type UtdanningGodkjentResponse = {
    verdi: UtdanningGodkjentSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type HelseHinderResponse = {
    verdi: HelseHinderSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type AndreForholdResponse = {
    verdi: AndreForholdSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type SisteStillingResponse = {
    verdi: SisteStillingSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type FremtidigSituasjonResponse = {
    verdi: FremtidigSituasjonSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type TilbakeIArbeidResponse = {
    verdi: TilbakeIArbeidSvar;
    gjelderFra: string | null;
    gjelderTil: string | null;
    endret: string | null;
    endretAv: BrukerEllerNav | null;
};

export type BrukerEllerNav = 'BRUKER' | 'VEILEDER' | 'SYSTEM';

export type BesvarelseRequest = {
    tekst?: string;
    overskrift?: string;
    venterPaaSvarFraNav?: boolean;
    oppdatering: DinSituasjonRequest;
};

export type BesvarelseResponse = {
    registreringsId?: string;
    besvarelse?: {
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
    opprettet?: string;
    opprettetAv?: string;
    endret?: string;
    endretAv?: BrukerEllerNav;
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

function BesvarelseProvider(props: { children: ReactNode }) {
    const featureToggles = useFeatureToggleData();
    const [besvarelse, settBesvarelse] = useState<BesvarelseResponse>(null);

    const erToggletPa = featureToggles[FeatureToggles.BRUK_ENDRING_AV_SITUASJON];

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
            await opprettDialog(data);
            const besvarelse: BesvarelseResponse = await fetchToJson(BESVARELSE_URL, {
                ...requestConfig(),
                method: 'POST',
                body: JSON.stringify({ ...data.oppdatering }),
            });
            settBesvarelse(besvarelse);
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
