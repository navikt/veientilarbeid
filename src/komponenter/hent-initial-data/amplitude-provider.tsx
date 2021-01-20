import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../utils/is-kss-eksperiment';
import isKSSKontroll from '../../utils/is-kss-kontroll';
import React from 'react';
import {AutentiseringContext} from '../../ducks/autentisering';
import {AmplitudeAktivitetContext} from '../../ducks/amplitude-aktivitet-context';
import {BrukerregistreringContext} from '../../ducks/brukerregistrering';
import {OppfolgingContext} from '../../ducks/oppfolging';
import {UnderOppfolgingContext} from '../../ducks/under-oppfolging';
import {BrukerInfoContext} from '../../ducks/bruker-info';
import grupperGeografiskTilknytning from '../../utils/grupper-geografisk-tilknytning'

import ukerFraDato from '../../utils/uker-fra-dato';
import dagerFraPeriodeSlutt from "../../utils/meldekort-dager-til-siste-frist";
import {MeldekortContext} from "../../ducks/meldekort";
import {STATUS} from "../../ducks/api";

export const AmplitudeProvider = (props: { children: React.ReactNode }) => {
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = React.useContext(BrukerInfoContext).data;
    const { securityLevel: nivaa } = React.useContext(AutentiseringContext).data;
    const { underOppfolging } = React.useContext(UnderOppfolgingContext).data;
    const meldekortData = React.useContext(MeldekortContext);
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

    let antallDagerFraPeriodeslutt = "ikke meldekortbruker"
    const erMeldekortBruker = React.useContext(MeldekortContext).status !== STATUS.NOT_STARTED
    if (erMeldekortBruker){
        const sjekkDagerFraPeriodeslutt = dagerFraPeriodeSlutt(meldekortData.data)
        antallDagerFraPeriodeslutt = sjekkDagerFraPeriodeslutt ? sjekkDagerFraPeriodeslutt.toString() : "bruker har ingen meldekort"
    }

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

    const amplitudeAktivitetsData = {
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
        antallDagerFraPeriodeslutt: antallDagerFraPeriodeslutt
    };

    return (
        <AmplitudeAktivitetContext.Provider value={amplitudeAktivitetsData}>
            {props.children}
        </AmplitudeAktivitetContext.Provider>
    );
};
