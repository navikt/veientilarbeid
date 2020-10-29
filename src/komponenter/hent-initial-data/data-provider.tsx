import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import {
    State as BrukerInfoState,
    Data as BrukerInfoData,
    initialState as brukerInfoDataInitialstate,
    BrukerInfoContext,
} from '../../ducks/bruker-info';
import { hentUlesteDialoger, State as UlesteDialogerState } from '../../ducks/dialog';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    selectForeslattInnsatsgruppe
} from '../../ducks/brukerregistrering';
import { hentJobbsokerbesvarelse, State as JobbsokerbesvarelseState } from '../../ducks/jobbsokerbesvarelse';
import { hentEgenvurderingbesvarelse, State as EgenvurderingbesvarelseState } from '../../ducks/egenvurdering';
import {
    Data as MotestotteData,
    initialState as initialStateMotestotte,
    State as MotestotteState,
    MotestotteContext
} from '../../ducks/motestotte';
import {
    Data as SituasjonData,
    initialState as initialStateSituasjon,
    State as SituasjonState,
    SituasjonContext
} from '../../ducks/situasjon';

import { fetchData } from '../../ducks/api-utils';
import { MOTESTOTTE_URL, BRUKERINFO_URL, SITUASJON_URL } from '../../ducks/api';
import getPoaGroup from '../../utils/get-poa-group';
import isKSSEksperiment from '../../utils/is-kss-eksperiment';
import isKSSKontroll from '../../utils/is-kss-kontroll';
import { OppfolgingContext } from '../../ducks/oppfolging';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
const ukerFraDato = require('@alheimsins/uker-fra-dato');

const skalSjekkeEgenvurderingBesvarelse = (foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null): boolean => {
    return foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
};

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState;
}

interface DispatchProps {
    hentJobbsokerbesvarelse: () => void;
    hentUlesteDialoger: () => void;
    hentEgenvurderingbesvarelse: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const DataProvider = ({
                          children, jobbsokerbesvarelse, ulesteDialoger, egenvurderingbesvarelse,
                          hentJobbsokerbesvarelse, hentUlesteDialoger, hentEgenvurderingbesvarelse
                      }: Props) => {

    const [motestotteState, setMotestotteState] = React.useState<MotestotteState>(initialStateMotestotte);
    const [situasjonState, setSituasjonState] = React.useState<SituasjonState>(initialStateSituasjon);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfoState>(brukerInfoDataInitialstate);

    const data = React.useContext(BrukerregistreringContext).data;
    const oppfolgingData = React.useContext(OppfolgingContext).data;
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    React.useEffect(() => {
        fetchData<BrukerInfoState, BrukerInfoData>(brukerInfoState, setBrukerInfoState, BRUKERINFO_URL);
        fetchData<SituasjonState, SituasjonData>(situasjonState, setSituasjonState, SITUASJON_URL);
        hentJobbsokerbesvarelse();
        hentUlesteDialoger();
        if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
            hentEgenvurderingbesvarelse();
        } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<MotestotteState, MotestotteData>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const avhengigheter: any[] = [brukerInfoState];
    const ventPa: any[] = [ulesteDialoger, jobbsokerbesvarelse, situasjonState];
    if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
        ventPa.push(egenvurderingbesvarelse);
    }
    if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
        ventPa.push(motestotteState)
    }

    // Setter opp innhold for amplitude
    const opprettetRegistreringDatoString = data?.registrering.opprettetDato;
    const dinSituasjon = data?.registrering.besvarelse.dinSituasjon || 'INGEN_VERDI';
    const opprettetRegistreringDato = opprettetRegistreringDatoString ? new Date(opprettetRegistreringDatoString) : null;
    const geografiskTilknytningOrIngenVerdi = brukerInfoState.data.geografiskTilknytning ? brukerInfoState.data.geografiskTilknytning  : 'INGEN_VERDI'
    const ukerRegistrert = opprettetRegistreringDato ? ukerFraDato(opprettetRegistreringDato) : ukerFraDato(new Date());
    const { alder } = brukerInfoState.data
    const servicegruppeOrIVURD = oppfolgingData?.servicegruppe || 'IVURD';
    const foreslattInnsatsgruppeOrIngenVerdi = data?.registrering.profilering?.innsatsgruppe || 'INGEN_VERDI';
    const formidlingsgruppeOrIngenVerdi = oppfolgingData?.formidlingsgruppe || 'INGEN_VERDI';

    const POAGruppe = getPoaGroup({
        dinSituasjon,
        formidlingsgruppe: formidlingsgruppeOrIngenVerdi,
        innsatsgruppe: foreslattInnsatsgruppeOrIngenVerdi,
        alder,
        servicegruppe: servicegruppeOrIVURD,
        opprettetRegistreringDato });
    const isKSSX = isKSSEksperiment({
        dinSituasjon,
        POAGruppe,
        opprettetRegistreringDato,
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi
    }) ? 'ja' : 'nei';
    const isKSSK = isKSSKontroll({
        dinSituasjon,
        POAGruppe,
        opprettetRegistreringDato,
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi
    }) ? 'ja' : 'nei';

    
    const amplitudeAktivitetsData = {
        gruppe: POAGruppe,
        geografiskTilknytning: geografiskTilknytningOrIngenVerdi,
        isKSSX,
        isKSSK,
        ukerRegistrert
    };


    return (

        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={avhengigheter}
            ventPa={ventPa}
        >
            <BrukerInfoContext.Provider value={ brukerInfoState }>
                <MotestotteContext.Provider value={motestotteState}>
                    <SituasjonContext.Provider value={situasjonState}>
                        <AmplitudeAktivitetContext.Provider value={amplitudeAktivitetsData}>
                            {children}
                        </AmplitudeAktivitetContext.Provider>
                    </SituasjonContext.Provider>
                </MotestotteContext.Provider>
            </BrukerInfoContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
    ulesteDialoger: state.ulesteDialoger,
    egenvurderingbesvarelse: state.egenvurderingbesvarelse
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    hentUlesteDialoger: () => hentUlesteDialoger()(dispatch),
    hentEgenvurderingbesvarelse: () => hentEgenvurderingbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
