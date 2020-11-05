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
    selectForeslattInnsatsgruppe,
} from '../../ducks/brukerregistrering';
import { hentJobbsokerbesvarelse, State as JobbsokerbesvarelseState } from '../../ducks/jobbsokerbesvarelse';
import { hentEgenvurderingbesvarelse, State as EgenvurderingbesvarelseState } from '../../ducks/egenvurdering';
import {
    Data as MotestotteData,
    initialState as initialStateMotestotte,
    State as MotestotteState,
    MotestotteContext,
} from '../../ducks/motestotte';
import {
    Data as SituasjonData,
    initialState as initialStateSituasjon,
    State as SituasjonState,
    SituasjonContext,
} from '../../ducks/situasjon';

import { fetchData } from '../../ducks/api-utils';
import { MOTESTOTTE_URL, BRUKERINFO_URL, SITUASJON_URL } from '../../ducks/api';
import { AmplitudeProvider } from './amplitude-provider';

const skalSjekkeEgenvurderingBesvarelse = (
    foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null
): boolean => {
    return (
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS
    );
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
    children,
    jobbsokerbesvarelse,
    ulesteDialoger,
    egenvurderingbesvarelse,
    hentJobbsokerbesvarelse,
    hentUlesteDialoger,
    hentEgenvurderingbesvarelse,
}: Props) => {
    const [motestotteState, setMotestotteState] = React.useState<MotestotteState>(initialStateMotestotte);
    const [situasjonState, setSituasjonState] = React.useState<SituasjonState>(initialStateSituasjon);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfoState>(brukerInfoDataInitialstate);

    const data = React.useContext(BrukerregistreringContext).data;
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
        ventPa.push(motestotteState);
    }

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse" />}
            storrelse="XXL"
            avhengigheter={avhengigheter}
            ventPa={ventPa}
        >
            <BrukerInfoContext.Provider value={brukerInfoState}>
                <MotestotteContext.Provider value={motestotteState}>
                    <SituasjonContext.Provider value={situasjonState}>
                        <AmplitudeProvider>{children}</AmplitudeProvider>
                    </SituasjonContext.Provider>
                </MotestotteContext.Provider>
            </BrukerInfoContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
    ulesteDialoger: state.ulesteDialoger,
    egenvurderingbesvarelse: state.egenvurderingbesvarelse,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    hentUlesteDialoger: () => hentUlesteDialoger()(dispatch),
    hentEgenvurderingbesvarelse: () => hentEgenvurderingbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
