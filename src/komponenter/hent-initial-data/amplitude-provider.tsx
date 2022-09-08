import * as React from 'react';
import ukerFraDato from '@alheimsins/uker-fra-dato';

import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../eksperiment/is-kss-eksperiment';
import isKSSKontroll from '../../eksperiment/is-kss-kontroll';
import { useAutentiseringData } from '../../contexts/autentisering';
import { AmplitudeContext } from '../../contexts/amplitude-context';
import { DinSituasjonSvar, useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { OppfolgingContext } from '../../contexts/oppfolging';
import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import grupperGeografiskTilknytning from '../../utils/grupper-geografisk-tilknytning';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

import dagerFraDato from '../../utils/dager-fra-dato';

import {
    beregnDagerEtterFastsattMeldedag,
    hentMeldegruppeForNesteMeldekort,
    hentMeldekortForLevering,
} from '../../utils/meldekort-utils';
import * as Meldekort from '../../contexts/meldekort';
import { STATUS } from '../../ducks/api';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import antallSynligeInfomeldinger from '../../utils/infomeldinger';
import * as Meldekortstatus from '../../contexts/meldekortstatus';
import isMeldekortbruker from '../../utils/er-meldekortbruker';
import { antallDagerSiden, datoUtenTid } from '../../utils/date-utils';
import { hentEksperimenter } from '../../eksperiment/eksperiment-utils';
import { erSamarbeidskontor } from '../../eksperiment/samarbeidskontor-utils';
import { hentEnhetEksperimentId } from '../../eksperiment/ab-eksperiment';
import dagerFraPabegyntSoknad from '../../utils/dager-fra-pabegynt-soknad';
import erStandardInnsatsgruppe from '../../lib/er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import erSannsynligvisInaktivertStandardbruker from '../../lib/er-sannsyligvis-inaktivert-standard-innsatsgruppe';
import { useDpInnsynSoknadData } from '../../contexts/dp-innsyn-soknad';
import { useDpInnsynVedtakData } from '../../contexts/dp-innsyn-vedtak';
import beregnDagpengeStatus, { sorterEtterNyesteVedtak } from '../../lib/beregn-dagpenge-status';
import { hentSprakValgFraCookie } from './data-provider';
import { useArbeidssokerPerioder, useUnderOppfolging } from '../../contexts/arbeidssoker';

function hentDagerEtterFastsattMeldedag(
    iDag: Date,
    meldekortstatusContext: Meldekortstatus.State,
    meldekortContext: Meldekort.State
): string {
    const erMeldekortbruker = isMeldekortbruker(meldekortstatusContext.data);
    if (!erMeldekortbruker) {
        return 'ikke meldekortbruker';
    }
    const harHentetMeldekort = meldekortContext.status !== STATUS.NOT_STARTED;
    if (!harHentetMeldekort) {
        return 'ukjent';
    }
    const antallDager = beregnDagerEtterFastsattMeldedag(iDag, meldekortContext.data);
    if (antallDager === null) {
        return 'bruker har ingen meldekort';
    }
    return antallDager.toString();
}

export const AmplitudeProvider = (props: { children: React.ReactNode }) => {
    const brukerregistreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const innsendteSoknader = useDpInnsynSoknadData();
    const dagpengeVedtak = useDpInnsynVedtakData();
    const pabegynteSoknaderData = useDpInnsynPaabegynteSoknaderData();
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = useBrukerinfoData();
    const { securityLevel: nivaa } = useAutentiseringData();
    const arbeidssokerperioder = useArbeidssokerPerioder();
    const underOppfolging = useUnderOppfolging()?.underoppfolging;
    const meldekortContext = React.useContext(Meldekort.MeldekortContext);
    const meldekortStatusContext = React.useContext(Meldekortstatus.MeldekortstatusContext);
    const { etterregistrerteMeldekort, antallGjenstaaendeFeriedager } = meldekortStatusContext.data;

    const { erSykmeldtMedArbeidsgiver, alder, geografiskTilknytning, registreringType, rettighetsgruppe } =
        brukerInfoData;
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

    const iDag = datoUtenTid(new Date().toISOString());
    const antallDagerEtterFastsattMeldingsdag = hentDagerEtterFastsattMeldedag(
        iDag,
        meldekortStatusContext,
        meldekortContext
    );
    const antallMeldekortKlareForLevering = hentMeldekortForLevering(iDag, meldekortContext.data).length;

    const meldegruppe = hentMeldegruppeForNesteMeldekort(meldekortContext.data);

    const forsterketUngdomsinnsats = alder < 30;

    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato,
    });
    const isKSSX = isKSSEksperiment({
        dinSituasjon,
        POAGruppe,
        opprettetRegistreringDato,
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi,
    })
        ? 'ja'
        : 'nei';
    const isKSSK = isKSSKontroll({
        dinSituasjon,
        POAGruppe,
        opprettetRegistreringDato,
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi,
    })
        ? 'ja'
        : 'nei';

    const eksperimenter = hentEksperimenter({
        dinSituasjon,
        geografiskTilknytning,
        registreringsDato: opprettetRegistreringDato,
        enhetEksperimentId: hentEnhetEksperimentId(),
    });

    const aktiveFeatureToggles = Object.keys(featuretoggleData).reduce((toggles, current) => {
        if (featuretoggleData[current]) {
            toggles.push(current);
        }
        return toggles;
    }, [] as string[]);

    const harDagpengesoknadTilBehandling = 'INGEN_DATA';
    const antallPabegynteSoknader = pabegynteSoknaderData.length;
    const dagpengerDagerMellomPaabegyntSoknadOgRegistrering = dagerFraPabegyntSoknad({
        soknader: pabegynteSoknaderData,
        registreringsDato: opprettetRegistreringDato,
    });

    const dagpengerDagerMellomInnsendtSoknadOgRegistrering = 'INGEN_DATA';

    const brukerregistreringDataEllerNull = brukerregistreringData?.registrering ?? null;

    const brukerErStandardInnsatsgruppe = erStandardInnsatsgruppe({
        brukerregistreringData: brukerregistreringDataEllerNull,
        oppfolgingData,
    });

    const brukerErUngMedStandardInnsatsgruppe = brukerErStandardInnsatsgruppe && forsterketUngdomsinnsats;

    const brukerErSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData: brukerregistreringDataEllerNull,
        oppfolgingData,
    });

    const sannsynligvisInaktivertStandardbruker = erSannsynligvisInaktivertStandardbruker({
        brukerregistreringData: brukerregistreringDataEllerNull,
        oppfolgingData,
    });

    const beregnedeArbeidssokerPerioder = beregnArbeidssokerperioder(arbeidssokerperioder);

    const dagpengestatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData: brukerregistreringData,
        paabegynteSoknader: pabegynteSoknaderData,
        innsendteSoknader,
        dagpengeVedtak,
        arbeidssokerperioder: beregnedeArbeidssokerPerioder,
    });

    const {
        harAktivArbeidssokerperiode,
        antallDagerSidenSisteArbeidssokerperiode,
        antallUkerSidenSisteArbeidssokerperiode,
        antallUkerMellomSisteArbeidssokerperioder,
    } = beregnedeArbeidssokerPerioder;

    const sisteDagpengevedtak = dagpengeVedtak
        .filter((vedtak) => vedtak.status === 'INNVILGET')
        .sort(sorterEtterNyesteVedtak)[0];
    const dagerSidenDagpengerStanset =
        sisteDagpengevedtak?.tilDato && dagpengestatus === 'stanset'
            ? antallDagerSiden(new Date(sisteDagpengevedtak.tilDato))
            : undefined;

    const brukergruppering = brukerErUngMedStandardInnsatsgruppe
        ? 'standard og ungdomsinnsats'
        : brukerErStandardInnsatsgruppe
        ? 'standard'
        : brukerErSituasjonsbestemtInnsatsgruppe
        ? 'situasjonsbestemt'
        : sannsynligvisInaktivertStandardbruker
        ? 'sannsynligvis standard og inaktivert'
        : 'annet';

    const valgtSprak = hentSprakValgFraCookie();
    const sprakValgFraCookie = valgtSprak || 'IKKE_VALGT';

    const amplitudeData: AmplitudeData = {
        gruppe: POAGruppe,
        brukergruppe: brukergruppering,
        dagpengestatus,
        dagerSidenDagpengerStanset,
        geografiskTilknytning: grupperGeografiskTilknytning(geografiskTilknytningOrIngenVerdi),
        isKSSX,
        isKSSK,
        erSamarbeidskontor: erSamarbeidskontor(geografiskTilknytningOrIngenVerdi) ? 'ja' : 'nei',
        ukerRegistrert,
        dagerRegistrert,
        nivaa,
        kanReaktiveres: kanReaktiveres ? 'ja' : 'nei',
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        servicegruppe: servicegruppeOrIVURD,
        foreslattInnsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        underOppfolging: underOppfolging ? 'ja' : 'nei',
        rettighetsgruppe: rettighetsgruppe || 'INGEN_VERDI',
        meldegruppe: meldegruppe || 'INGEN_VERDI',
        registreringType: registreringType || 'INGEN_VERDI',
        antallDagerEtterFastsattMeldingsdag,
        antallMeldekortKlareForLevering,
        meldekortEtterregistrerteMeldekort: etterregistrerteMeldekort || 0,
        meldekortAntallGjenstaaendeFeriedager: antallGjenstaaendeFeriedager || 0,
        gitVersion: process.env.REACT_APP_VERSION_HASH || 'INGEN_VERDI',
        buildTimestamp: process.env.REACT_APP_BUILD_TIMESTAMP || new Date().toISOString(),
        antallSynligeInfomeldinger: antallSynligeInfomeldinger(),
        erSykmeldtMedArbeidsgiver: erSykmeldtMedArbeidsgiver ? 'ja' : 'nei',
        dinSituasjon,
        reservasjonKRR: reservasjonKRR ? 'ja' : 'nei',
        eksperimenter,
        aktiveFeatureToggles,
        dagpengerSoknadMellomlagret: antallPabegynteSoknader,
        dagpengerVedleggEttersendes: 'INGEN_DATA',
        dagpengerSoknadVenterPaSvar: harDagpengesoknadTilBehandling,
        dagpengerDagerMellomPaabegyntSoknadOgRegistrering,
        dagpengerDagerMellomInnsendtSoknadOgRegistrering,
        dagpengerStatusBeregning: 'INGEN_DATA',
        sprakValgFraCookie,
        harAktivArbeidssokerperiode,
        antallDagerSidenSisteArbeidssokerperiode,
        antallUkerSidenSisteArbeidssokerperiode,
        antallUkerMellomSisteArbeidssokerperioder,
    };

    return <AmplitudeContext.Provider value={amplitudeData}>{props.children}</AmplitudeContext.Provider>;
};
