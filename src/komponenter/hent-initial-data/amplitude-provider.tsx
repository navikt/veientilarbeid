import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../utils/is-kss-eksperiment';
import isKSSKontroll from '../../utils/is-kss-kontroll';
import React from 'react';
import { AutentiseringContext } from '../../ducks/autentisering';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import { BrukerregistreringContext, DinSituasjonSvar } from '../../ducks/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { PaabegynteSoknaderContext } from '../../ducks/paabegynte-soknader';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import grupperGeografiskTilknytning from '../../utils/grupper-geografisk-tilknytning';

import ukerFraDato from '../../utils/uker-fra-dato';
import {
    beregnDagerEtterFastsattMeldedag,
    hentMeldegruppeForNesteMeldekort,
    hentMeldekortForLevering,
} from '../../utils/meldekort-utils';
import * as Meldekort from '../../ducks/meldekort';
import { STATUS } from '../../ducks/api';
import { AmplitudeData } from '../../metrics/amplitude-utils';
import antallSynligeInfomeldinger from '../../utils/infomeldinger';
import * as Meldekortstatus from '../../ducks/meldekortstatus';
import isMeldekortbruker from '../../utils/er-meldekortbruker';
import { datoUtenTid } from '../../utils/date-utils';
import { hentEksperimenter } from '../../utils/eksperiment-utils';
import { erSamarbeidskontor } from '../../utils/samarbeidskontor-utils';
import { hentEnhetEksperimentId } from '../../lib/ab-eksperiment';

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
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const pabegynteSoknaderData = React.useContext(PaabegynteSoknaderContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = React.useContext(BrukerInfoContext).data;
    const { securityLevel: nivaa } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const meldekortContext = React.useContext(Meldekort.MeldekortContext);
    const meldekortStatusContext = React.useContext(Meldekortstatus.MeldekortstatusContext);

    const {
        erSykmeldtMedArbeidsgiver,
        alder,
        geografiskTilknytning,
        registreringType,
        rettighetsgruppe,
    } = brukerInfoData;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres, reservasjonKRR } = oppfolgingData;
    const opprettetRegistreringDatoString = brukerregistreringData?.registrering?.opprettetDato;
    const dinSituasjon = brukerregistreringData?.registrering?.besvarelse.dinSituasjon || DinSituasjonSvar.INGEN_VERDI;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const geografiskTilknytningOrIngenVerdi = geografiskTilknytning || 'INGEN_VERDI';
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : 'INGEN_DATO';
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

    const antallPabegynteSoknader = pabegynteSoknaderData.soknader.length;

    const amplitudeData: AmplitudeData = {
        gruppe: POAGruppe,
        geografiskTilknytning: grupperGeografiskTilknytning(geografiskTilknytningOrIngenVerdi),
        isKSSX,
        isKSSK,
        erSamarbeidskontor: erSamarbeidskontor(geografiskTilknytningOrIngenVerdi) ? 'ja' : 'nei',
        ukerRegistrert,
        nivaa,
        kanReaktiveres: kanReaktiveres ? 'ja' : 'nei',
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        servicegruppe: servicegruppeOrIVURD,
        underOppfolging: underOppfolging ? 'ja' : 'nei',
        rettighetsgruppe: rettighetsgruppe || 'INGEN_VERDI',
        meldegruppe: meldegruppe || 'INGEN_VERDI',
        registreringType: registreringType || 'INGEN_VERDI',
        antallDagerEtterFastsattMeldingsdag,
        antallMeldekortKlareForLevering,
        gitVersion: process.env.REACT_APP_VERSION_HASH || 'INGEN_VERDI',
        buildTimestamp: process.env.REACT_APP_BUILD_TIMESTAMP || new Date().toISOString(),
        antallSynligeInfomeldinger: antallSynligeInfomeldinger(),
        erSykmeldtMedArbeidsgiver: erSykmeldtMedArbeidsgiver ? 'ja' : 'nei',
        dinSituasjon,
        reservasjonKRR: reservasjonKRR ? 'ja' : 'nei',
        eksperimenter,
        dagpengerSoknadMellomlagret: antallPabegynteSoknader,
        dagpengerVedleggEttersendes: 'INGEN_DATA',
        dagpengerSoknadVenterPaSvar: 'INGEN_DATA',
    };

    return <AmplitudeContext.Provider value={amplitudeData}>{props.children}</AmplitudeContext.Provider>;
};
