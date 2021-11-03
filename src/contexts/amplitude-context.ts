import { createContext, useContext } from 'react';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { InnloggingsNiva } from './autentisering';
import { DinSituasjonSvar } from './brukerregistrering';

export const initialState: AmplitudeData = {
    gruppe: 'boo',
    geografiskTilknytning: 'INGEN_VERDI',
    isKSSX: 'nei',
    isKSSK: 'nei',
    erSamarbeidskontor: 'nei',
    ukerRegistrert: 'INGEN_DATO',
    dagerRegistrert: 'INGEN_DATO',
    nivaa: InnloggingsNiva.LEVEL_3,
    kanReaktiveres: 'nei',
    formidlingsgruppe: 'INGEN_VERDI',
    servicegruppe: 'IVURD',
    foreslattInnsatsgruppe: 'INGEN_VERDI',
    rettighetsgruppe: 'INGEN_VERDI',
    meldegruppe: 'INGEN_VERDI',
    registreringType: 'INGEN_VERDI',
    underOppfolging: 'nei',
    antallDagerEtterFastsattMeldingsdag: 'ikke meldekortbruker',
    antallMeldekortKlareForLevering: 0,
    gitVersion: 'INGEN_VERDI',
    buildTimestamp: new Date().toISOString(),
    antallSynligeInfomeldinger: 0,
    erSykmeldtMedArbeidsgiver: 'ukjent',
    dinSituasjon: DinSituasjonSvar.INGEN_VERDI,
    reservasjonKRR: 'ukjent',
    eksperimenter: [],
    dagpengerVedleggEttersendes: 'INGEN_DATA',
    dagpengerSoknadMellomlagret: 'INGEN_DATA',
    dagpengerSoknadVenterPaSvar: 'INGEN_DATA',
    dagpengerDagerMellomPaabegyntSoknadOgRegistrering: 'INGEN_DATA',
    dagpengerDagerMellomInnsendtSoknadOgRegistrering: 'INGEN_DATA',
    dagpengerStatusBeregning: 'INGEN_DATA',
};

const AmplitudeContext = createContext<AmplitudeData>(initialState);

function useAmplitudeData() {
    const context = useContext(AmplitudeContext);
    if (context === undefined) {
        throw new Error('useAmplitudeData må brukes under en AmplitudeProvider');
    }
    return context;
}

export { AmplitudeContext, useAmplitudeData };
