import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import {
    State as SykmeldtInfoState,
    Data as SykmeldtInfoData,
    initialState as sykmeldtDataInitialstate,
    SykmeldtInfoContext,
} from '../../ducks/sykmeldt-info';
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
import { fetchData } from '../../ducks/api-utils';
import { MOTESTOTTE_URL, STARTREGISTRERING_URL } from '../../ducks/api';

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
    const [sykmeldtInfoState, setSykmeldtInfoState] = React.useState<SykmeldtInfoState>(sykmeldtDataInitialstate);

    const data = React.useContext(BrukerregistreringContext).data;
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    React.useEffect(() => {
        fetchData<SykmeldtInfoState, SykmeldtInfoData>(sykmeldtInfoState, setSykmeldtInfoState, STARTREGISTRERING_URL);
        hentJobbsokerbesvarelse();
        hentUlesteDialoger();
        if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
            hentEgenvurderingbesvarelse();
        } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<MotestotteState, MotestotteData>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
        }
    }, []);

    const avhengigheter: any[] = [sykmeldtInfoState]; // tslint:disable-line:no-any
    const ventPa: any[] = [ulesteDialoger, jobbsokerbesvarelse]; // tslint:disable-line:no-any
    if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
        ventPa.push(egenvurderingbesvarelse);
    }
    if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
        ventPa.push(motestotteState)
    }
    return (

        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={avhengigheter}
            ventPa={ventPa}
        >
            <SykmeldtInfoContext.Provider value={sykmeldtInfoState}>
                <MotestotteContext.Provider value={motestotteState}>
                    {children}
                </MotestotteContext.Provider>
            </SykmeldtInfoContext.Provider>
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
