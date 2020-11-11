import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import * as BrukerInfo from '../../ducks/bruker-info';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Motestotte from '../../ducks/motestotte';
import * as Egenvurdering from '../../ducks/egenvurdering';
import * as UlesteDialoger from '../../ducks/ulestedialoger';
import { hentJobbsokerbesvarelse, State as JobbsokerbesvarelseState } from '../../ducks/jobbsokerbesvarelse';
import { fetchData } from '../../ducks/api-utils';
import { MOTESTOTTE_URL, BRUKERINFO_URL, EGENVURDERINGBESVARELSE_URL, ULESTEDIALOGER_URL } from '../../ducks/api';
import { AmplitudeProvider } from './amplitude-provider';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe } from '../../ducks/brukerregistrering';

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
}

interface DispatchProps {
    hentJobbsokerbesvarelse: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const DataProvider = ({ children, jobbsokerbesvarelse, hentJobbsokerbesvarelse }: Props) => {
    const [motestotteState, setMotestotteState] = React.useState<Motestotte.State>(Motestotte.initialState);
    const [brukerInfoState, setBrukerInfoState] = React.useState<BrukerInfo.State>(BrukerInfo.initialState);
    const [egenvurderingState, setEgenvurderingState] = React.useState<Egenvurdering.State>(Egenvurdering.initialState);
    const [ulesteDialogerState, setUlesteDialogerState] = React.useState<UlesteDialoger.State>(
        UlesteDialoger.initialState
    );

    const data = React.useContext(Brukerregistrering.BrukerregistreringContext).data;
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    React.useEffect(() => {
        fetchData<BrukerInfo.State, BrukerInfo.Data>(brukerInfoState, setBrukerInfoState, BRUKERINFO_URL);
        fetchData<UlesteDialoger.State, UlesteDialoger.Data>(
            ulesteDialogerState,
            setUlesteDialogerState,
            ULESTEDIALOGER_URL
        );
        hentJobbsokerbesvarelse();
        if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
            fetchData<Egenvurdering.State, Egenvurdering.Data>(
                egenvurderingState,
                setEgenvurderingState,
                EGENVURDERINGBESVARELSE_URL
            );
        } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<Motestotte.State, Motestotte.Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const avhengigheter: any[] = [brukerInfoState];
    const ventPa: any[] = [ulesteDialogerState, jobbsokerbesvarelse];
    if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
        ventPa.push(egenvurderingState);
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
            <UlesteDialoger.UlesteDialogerContext.Provider value={ulesteDialogerState}>
                <BrukerInfo.BrukerInfoContext.Provider value={brukerInfoState}>
                    <Motestotte.MotestotteContext.Provider value={motestotteState}>
                        <Egenvurdering.EgenvurderingContext.Provider value={egenvurderingState}>
                            <AmplitudeProvider>{children}</AmplitudeProvider>
                        </Egenvurdering.EgenvurderingContext.Provider>
                    </Motestotte.MotestotteContext.Provider>
                </BrukerInfo.BrukerInfoContext.Provider>
            </UlesteDialoger.UlesteDialogerContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
