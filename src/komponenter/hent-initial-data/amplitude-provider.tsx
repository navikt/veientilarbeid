import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../utils/is-kss-eksperiment';
import isKSSKontroll from '../../utils/is-kss-kontroll';
import React from 'react';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { BrukerInfoContext } from '../../ducks/bruker-info';

import ukerFraDato from '../../utils/uker-fra-dato';

export const AmplitudeProvider = (props: { children: React.ReactNode }) => {
    const brukerregistreringData = React.useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const brukerInfoData = React.useContext(BrukerInfoContext).data;

    const { alder, geografiskTilknytning } = brukerInfoData;
    const { servicegruppe, formidlingsgruppe } = oppfolgingData;
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
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi,
        isKSSX,
        isKSSK,
        ukerRegistrert,
    };

    return (
        <AmplitudeAktivitetContext.Provider value={amplitudeAktivitetsData}>
            {props.children}
        </AmplitudeAktivitetContext.Provider>
    );
};
