import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from '../../dispatch-type';
import { AppState } from '../../reducer';
import Innholdslaster from '../innholdslaster/innholdslaster';
import Feilmelding from '../feilmeldinger/feilmelding';
import { hentSykmeldtInfo, State as SykmeldtInfodataState } from '../../ducks/sykmeldt-info';
import { hentUlesteDialoger, State as UlesteDialogerState } from '../../ducks/dialog';
import { ForeslattInnsatsgruppe, selectForeslattInnsatsgruppe } from '../../ducks/brukerregistrering';
import { hentJobbsokerbesvarelse, State as JobbsokerbesvarelseState } from '../../ducks/jobbsokerbesvarelse';
import { hentEgenvurderingbesvarelse, State as EgenvurderingbesvarelseState } from '../../ducks/egenvurdering';
import {
    Data,
    initialState as initialStateMotestotte,
    State as MotestotteState,
    MotestotteContext
} from '../../ducks/motestotte';
import {
    State as InnsatsgruppeState,
    Data as InnsatsgruppeData,
    initialState as initialStateInnsatsgruppe,
    InnsatsgruppeContext
} from '../../ducks/innsatsgruppe';
import { fetchData } from '../../ducks/api-utils';
import { INNSATSGRUPPE_URL, MOTESTOTTE_URL } from '../../ducks/api';

const skalSjekkeEgenvurderingBesvarelse = (foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null): boolean => {
    return foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS;
};

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
    underOppfolging: boolean;
    sykmeldtInfo: SykmeldtInfodataState;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
    ulesteDialoger: UlesteDialogerState;
    foreslaattInnsatsgruppe: ForeslattInnsatsgruppe | undefined | null;
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
                          children, underOppfolging, foreslaattInnsatsgruppe, sykmeldtInfo, jobbsokerbesvarelse,
                          ulesteDialoger, egenvurderingbesvarelse, hentSykmeldtInfo, hentJobbsokerbesvarelse,
                          hentUlesteDialoger, hentEgenvurderingbesvarelse
                      }: Props) => {


    const [motestotteState, setMotestotteState] = React.useState<MotestotteState>(initialStateMotestotte);
    const [innsatsgruppeState, setInnsatsgruppeState] = React.useState<InnsatsgruppeState>(initialStateInnsatsgruppe);

    React.useEffect(() => {
        hentSykmeldtInfo();
        hentJobbsokerbesvarelse();
        fetchData<InnsatsgruppeState, InnsatsgruppeData>(innsatsgruppeState, setInnsatsgruppeState, INNSATSGRUPPE_URL)();
        hentUlesteDialoger();
        if (skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe)) {
            hentEgenvurderingbesvarelse();
        } else if (foreslaattInnsatsgruppe === ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING) {
            fetchData<MotestotteState, Data>(motestotteState, setMotestotteState, MOTESTOTTE_URL)();
        }
    }, []);

    const avhengigheter: any[] = [jobbsokerbesvarelse, egenvurderingbesvarelse, sykmeldtInfo]; // tslint:disable-line:no-any
    const ventPa: any[] = [innsatsgruppeState, ulesteDialoger]; // tslint:disable-line:no-any
    const betingelser: boolean[] = [underOppfolging, skalSjekkeEgenvurderingBesvarelse(foreslaattInnsatsgruppe), true];

    return (

        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse"/>}
            storrelse="XXL"
            avhengigheter={avhengigheter}
            ventPa={ventPa}
            betingelser={betingelser}
        >
            <InnsatsgruppeContext.Provider value={innsatsgruppeState}>
                <MotestotteContext.Provider value={motestotteState}>
                    {children}
                </MotestotteContext.Provider>
            </InnsatsgruppeContext.Provider>
        </Innholdslaster>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    underOppfolging: state.oppfolging.data.underOppfolging,
    sykmeldtInfo: state.sykmeldtInfodata,
    jobbsokerbesvarelse: state.jobbsokerbesvarelse,
    ulesteDialoger: state.ulesteDialoger,
    foreslaattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    egenvurderingbesvarelse: state.egenvurderingbesvarelse,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentSykmeldtInfo: () => hentSykmeldtInfo()(dispatch),
    hentJobbsokerbesvarelse: () => hentJobbsokerbesvarelse()(dispatch),
    hentUlesteDialoger: () => hentUlesteDialoger()(dispatch),
    hentEgenvurderingbesvarelse: () => hentEgenvurderingbesvarelse()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataProvider);
