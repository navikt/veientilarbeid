import * as React from 'react';
import { createContext, useContext } from 'react';
import ukerFraDato from '@alheimsins/uker-fra-dato';

import { InnloggingsNiva, useAutentiseringData } from '../../contexts/autentisering';
import { DinSituasjonSvar, useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { FeautreToggleData, useFeatureToggleData } from '../../contexts/feature-toggles';
import { useArbeidssokerPerioder, useUnderOppfolging } from '../../contexts/arbeidssoker';

import { OppfolgingContext } from '../../contexts/oppfolging';
import grupperGeografiskTilknytning from '../../utils/grupper-geografisk-tilknytning';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import dagerFraDato from '../../utils/dager-fra-dato';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import * as SprakValg from '../../contexts/sprak';
import beregnBrukergruppe from '../../lib/beregn-brukergruppe';

const hentSprakValgFraCookie = (): SprakValg.Sprak | null => {
    const decoratorLanguageCookie = document.cookie.match(/decorator-language=([a-z]{2})/);
    return decoratorLanguageCookie && (decoratorLanguageCookie[1] as SprakValg.Sprak);
};

export const initialAmplitudeData: AmplitudeData = {
    brukergruppe: 'ukjent',
    geografiskTilknytning: 'INGEN_VERDI',
    ukerRegistrert: 'INGEN_DATO',
    dagerRegistrert: 'INGEN_DATO',
    nivaa: InnloggingsNiva.LEVEL_3,
    kanReaktiveres: 'nei',
    formidlingsgruppe: 'INGEN_VERDI',
    servicegruppe: 'IVURD',
    foreslattInnsatsgruppe: 'INGEN_VERDI',
    rettighetsgruppe: 'INGEN_VERDI',
    registreringType: 'INGEN_VERDI',
    underOppfolging: 'nei',
    gitVersion: 'INGEN_VERDI',
    buildTimestamp: new Date().toISOString(),
    erSykmeldtMedArbeidsgiver: 'ukjent',
    dinSituasjon: DinSituasjonSvar.INGEN_VERDI,
    endretSituasjon: 'INGEN_DATA',
    reservasjonKRR: 'ukjent',
    aktiveFeatureToggles: [],
    sprakValgFraCookie: 'IKKE_VALGT',
    harAktivArbeidssokerperiode: 'INGEN_DATA',
    antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
    antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
    antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
    meldegruppe: 'INGEN_VERDI',
    antallMeldekortKlareForLevering: 'INGEN_DATA',
    vilFortsattVaereRegistrert: 'INGEN_DATA',
    antallDagerSidenSisteMeldeperiode: 'INGEN_DATA',
    dagpengerStatus: 'INGEN_DATA',
    antallDagerSidenDagpengerStanset: 'INGEN_DATA',
    villeBlittReaktivertAutomatisk: 'INGEN_DATA',
    antallDagerSidenSistInnsendtMeldekort: 'INGEN_DATA',
    antattInaktiveringsgrunn: 'INGEN_DATA',
    levertMeldekortEtterInaktvering: 'INGEN_DATA',
    automatiskReaktivert: 'INGEN_DATA',
    automatiskReaktivertSvar: 'INGEN_DATA',
};

const AmplitudeContext = createContext({
    amplitudeData: initialAmplitudeData,
    oppdaterAmplitudeData: (data: Partial<AmplitudeData>) => {},
});

function useAmplitudeData() {
    const context = useContext(AmplitudeContext);
    if (context === undefined) {
        throw new Error('useAmplitudeData må brukes under en AmplitudeProvider');
    }
    return context;
}

const AmplitudeProvider = (props: { children: React.ReactNode }) => {
    const brukerregistreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = useBrukerinfoData();
    const { securityLevel: nivaa } = useAutentiseringData();
    const arbeidssokerperioder = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;

    const { erSykmeldtMedArbeidsgiver, geografiskTilknytning, registreringType, rettighetsgruppe } = brukerInfoData;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres, reservasjonKRR } = oppfolgingData;
    const opprettetRegistreringDatoString = brukerregistreringData?.registrering?.opprettetDato;
    const dinSituasjon = brukerregistreringData?.registrering?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const geografiskTilknytningOrIngenVerdi = geografiskTilknytning || 'INGEN_VERDI';
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : 'INGEN_DATO';
    const dagerRegistrert = opprettetRegistreringDato ? dagerFraDato(opprettetRegistreringDato) : 'INGEN_DATO';
    const servicegruppeOrIVURD = servicegruppe || 'IVURD';
    const foreslattInnsatsgruppeOrIngenVerdi =
        brukerregistreringData?.registrering?.profilering?.innsatsgruppe || 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || 'INGEN_VERDI';

    const aktiveFeatureToggles = Object.keys(featuretoggleData).reduce((toggles, current) => {
        if (featuretoggleData[current as keyof FeautreToggleData]) {
            toggles.push(current);
        }
        return toggles;
    }, [] as string[]);

    const brukerregistreringDataEllerNull = brukerregistreringData?.registrering ?? null;

    const beregnedeArbeidssokerPerioder = beregnArbeidssokerperioder(arbeidssokerperioder);

    const {
        harAktivArbeidssokerperiode,
        antallDagerSidenSisteArbeidssokerperiode,
        antallUkerSidenSisteArbeidssokerperiode,
        antallUkerMellomSisteArbeidssokerperioder,
    } = beregnedeArbeidssokerPerioder;

    const valgtSprak = hentSprakValgFraCookie();
    const sprakValgFraCookie = valgtSprak || 'IKKE_VALGT';

    const data: AmplitudeData = {
        ...initialAmplitudeData,
        brukergruppe: beregnBrukergruppe({
            brukerregistreringData: brukerregistreringDataEllerNull,
            oppfolgingData,
            brukerInfoData,
        }),
        geografiskTilknytning: grupperGeografiskTilknytning(geografiskTilknytningOrIngenVerdi),
        ukerRegistrert,
        dagerRegistrert,
        nivaa,
        kanReaktiveres: kanReaktiveres ? 'ja' : 'nei',
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        servicegruppe: servicegruppeOrIVURD,
        foreslattInnsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        underOppfolging: underOppfolging ? 'ja' : 'nei',
        rettighetsgruppe: rettighetsgruppe || 'INGEN_VERDI',
        registreringType: registreringType || 'INGEN_VERDI',
        gitVersion: process.env.REACT_APP_VERSION_HASH || 'INGEN_VERDI',
        buildTimestamp: process.env.REACT_APP_BUILD_TIMESTAMP || new Date().toISOString(),
        erSykmeldtMedArbeidsgiver: erSykmeldtMedArbeidsgiver ? 'ja' : 'nei',
        dinSituasjon,
        reservasjonKRR: reservasjonKRR ? 'ja' : 'nei',
        aktiveFeatureToggles,
        sprakValgFraCookie,
        harAktivArbeidssokerperiode,
        antallDagerSidenSisteArbeidssokerperiode,
        antallUkerSidenSisteArbeidssokerperiode,
        antallUkerMellomSisteArbeidssokerperioder,
    };

    const [amplitudeData, setAmplitudeData] = React.useState(data);

    /*
    const oppdaterAmplitudeData = React.useCallback(
        (data: Partial<AmplitudeData>) => {
            setAmplitudeData({
                ...amplitudeData,
                ...data,
            });
        },
        [amplitudeData],
    );
    */

    const oppdaterAmplitudeData = (data: Partial<AmplitudeData>) => {
        setAmplitudeData({
            ...amplitudeData,
            ...data,
        });
    };

    return (
        <AmplitudeContext.Provider value={{ amplitudeData, oppdaterAmplitudeData }}>
            {props.children}
        </AmplitudeContext.Provider>
    );
};

export { AmplitudeContext, AmplitudeProvider, useAmplitudeData };
