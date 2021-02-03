import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../utils/is-kss-eksperiment';
import isKSSKontroll from '../../utils/is-kss-kontroll';
import React from 'react';
import { AutentiseringContext } from '../../ducks/autentisering';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import grupperGeografiskTilknytning from '../../utils/grupper-geografisk-tilknytning';

import ukerFraDato from '../../utils/uker-fra-dato';
import { beregnDagerEtterFastsattMeldedag } from '../../utils/meldekort-dager-etter-meldedag';
import * as Meldekort from '../../ducks/meldekort';
import { STATUS } from '../../ducks/api';
import { AmplitudeAktivitetsData } from '../../metrics/amplitude-utils';
import antallSynligeInfomeldinger from '../../utils/infomeldinger';
import * as Meldekortstatus from '../../ducks/meldekortstatus';
import isMeldekortbruker from '../../utils/er-meldekortbruker';
import { datoUtenTid } from '../../utils/date-utils';

function hentDagerEtterFastsattMeldedag(
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
    const iDag = datoUtenTid(new Date().toISOString());
    const antallDager = beregnDagerEtterFastsattMeldedag(iDag, meldekortContext.data);
    if (antallDager === null) {
        return 'bruker har ingen meldekort';
    }
    return antallDager.toString();
}

export const AmplitudeProvider = (props: { children: React.ReactNode }) => {
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = React.useContext(BrukerInfoContext).data;
    const { securityLevel: nivaa } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const meldekortContext = React.useContext(Meldekort.MeldekortContext);
    const meldekortStatusContext = React.useContext(Meldekortstatus.MeldekortstatusContext);

    const { alder, geografiskTilknytning } = brukerInfoData;
    const { servicegruppe, formidlingsgruppe, kanReaktiveres } = oppfolgingData;
    const opprettetRegistreringDatoString = brukerregistreringData?.registrering.opprettetDato;
    const dinSituasjon = brukerregistreringData?.registrering.besvarelse.dinSituasjon || 'INGEN_VERDI';
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;
    const geografiskTilknytningOrIngenVerdi = geografiskTilknytning || 'INGEN_VERDI';
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : ukerFraDato(new Date());
    const servicegruppeOrIVURD = servicegruppe || 'IVURD';
    const foreslattInnsatsgruppeOrIngenVerdi =
        brukerregistreringData?.registrering.profilering?.innsatsgruppe || 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = formidlingsgruppe || 'INGEN_VERDI';
    const antallDagerFraPeriodeslutt = hentDagerEtterFastsattMeldedag(meldekortStatusContext, meldekortContext);

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

    const amplitudeAktivitetsData: AmplitudeAktivitetsData = {
        gruppe: POAGruppe,
        geografiskTilknytning: grupperGeografiskTilknytning(geografiskTilknytningOrIngenVerdi),
        isKSSX,
        isKSSK,
        ukerRegistrert,
        nivaa,
        kanReaktiveres: kanReaktiveres ? 'ja' : 'nei',
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        servicegruppe: servicegruppeOrIVURD,
        underOppfolging: underOppfolging ? 'ja' : 'nei',
        antallDagerFraPeriodeslutt: antallDagerFraPeriodeslutt,
        gitVersion: process.env.REACT_APP_VERSION_HASH || 'INGEN_VERDI',
        buildTimestamp: process.env.REACT_APP_BUILD_TIMESTAMP || new Date().toISOString(),
        antallSynligeInfomeldinger: antallSynligeInfomeldinger(),
    };

    return (
        <AmplitudeAktivitetContext.Provider value={amplitudeAktivitetsData}>
            {props.children}
        </AmplitudeAktivitetContext.Provider>
    );
};
