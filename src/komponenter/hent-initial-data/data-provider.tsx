import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { hentSykmeldtInfo, State as SykmeldtInfoState } from '../../ducks/sykmeldt-info';
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
import { MOTESTOTTE_URL } from '../../ducks/api';

const skalSjekkeEgenvurderingBesvarelse = (foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null): boolean => {
    return foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
};

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    egenvurderingbesvarelse: EgenvurderingbesvarelseState;
}

interface DispatchProps {
    hentSykmeldtInfo: () => void;
    hentJobbsokerbesvarelse: () => void;
    hentUlesteDialoger: () => void;
    hentEgenvurderingbesvarelse: () => void;
}

type Props = StateProps & DispatchProps & OwnProps;

const DataProvider = ({
                          children, sykmeldtInfo, jobbsokerbesvarelse,
                          ulesteDialoger, egenvurderingbesvarelse, hentSykmeldtInfo, hentJobbsokerbesvarelse,
                          hentUlesteDialoger, hentEgenvurderingbesvarelse
                      }: Props) => {


    const [motestotteState, setMotestotteState] = React.useState<MotestotteState>(initialStateMotestotte);

    const data = React.useContext(BrukerregistreringContext).data;
    const foreslaattInnsatsgruppe = selectForeslattInnsatsgruppe(data);

    React.useEffect(() => {
        hentSykmeldtInfo();
        hentJobbsokerbesvarelse();
        hentUlesteDialoger();
        if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
            hentEgenvurderingbesvarelse();
        } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<MotestotteState, MotestotteData>(motestotteState, setMotestotteState, MOTESTOTTE_URL);
        }
    }, []);

    const avhengigheter: any[] = [sykmeldtInfo]; // tslint:disable-line:no-any
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
            <MotestotteContext.Provider value={motestotteState}>
                {children}
            </MotestotteContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: state.sykmeldtInfodata,
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
    ulesteDialoger: state.ulesteDialoger,
    egenvurderingbesvarelse: state.egenvurderingbesvarelse,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    hentUlesteDialoger: () => hentUlesteDialoger()(dispatch),
    hentEgenvurderingbesvarelse: () => hentEgenvurderingbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
