import * as React from 'react';
import { connect } from 'react-redux';
import Rad from './rad';
import { AppState } from '../../reducer';
import AapRad from '../../komponenter/aap/aap';
import Dialog from '../../komponenter/dialog/dialog';
import Banner from '../../komponenter/banner/banner';
import Meldekort from '../../komponenter/meldekort/meldekort';
import DittSykefravaer from '../../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Dagpenger from '../../komponenter/dagpenger/dagpenger';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import OkonomiRad from '../../komponenter/okonomi/okonomi-rad';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import { Servicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from '../../ducks/sykmeldt-info';
import RessurslenkerJobbsok from '../../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import {
    ForeslattInnsatsgruppe,
    FremtidigSituasjonSvar, selectForeslattInnsatsgruppe,
    selectFremtidigSituasjonSvar, selectOpprettetRegistreringDato
} from '../../ducks/brukerregistrering';
import Egenvurdering from '../../komponenter/egenvurdering/egenvurdering';

const LANSERINGSDATO = new Date(2020, 0, 2);

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    servicegruppe: ServicegruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
    foreslattInnsatsgruppe: ForeslattInnsatsgruppe;
    reservasjonKRR: boolean;
    opprettetRegistreringDato: Date;
    harEgenvurderingbesvarelse: boolean;
}

const Startside = ({sykmeldtInfo, servicegruppe, fremtidigSvar, foreslattInnsatsgruppe, reservasjonKRR,
                    opprettetRegistreringDato, harEgenvurderingbesvarelse }: StateProps) => {

    const erSykmeldtMedArbeidsgiver = sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;

    const skalViseTiltaksinfoLenke = (
        erSykmeldtMedArbeidsgiver ||
        servicegruppe.data.servicegruppe === Servicegruppe.BFORM ||
        servicegruppe.data.servicegruppe === Servicegruppe.BATT
    );

    const tilbakeTilSammeArbeidsgiver = (
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
        fremtidigSvar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
    );

    const visRessurslenker = !(tilbakeTilSammeArbeidsgiver && erSykmeldtMedArbeidsgiver);

    const skalViseEgenvurderingLenke = (
        !harEgenvurderingbesvarelse &&
        opprettetRegistreringDato > LANSERINGSDATO &&
        !reservasjonKRR &&
        (foreslattInnsatsgruppe === ForeslattInnsatsgruppe.STANDARD_INNSATS ||
        foreslattInnsatsgruppe === ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS)
    );

    // TODO Fjerne banner (inkl. brødsmuler)
    return (
        <>
            {erSykmeldtMedArbeidsgiver ? <Banner type="sykmeldt"/> : <Banner type="ordinaer"/>}

            <Rad>
                <ReaktiveringMelding/>
                { skalViseEgenvurderingLenke ? <Egenvurdering/> : null }
                <Aktivitetsplan/>
                <div className="tokol">
                    <Dialog/>
                    {erSykmeldtMedArbeidsgiver ? <DittSykefravaer/> : <Meldekort/>}
                </div>
            </Rad>

            {erSykmeldtMedArbeidsgiver && (
                <Rad><AapRad/></Rad>
            )}

            <Rad>
                {visRessurslenker ? <RessurslenkerJobbsok/> : null}
                {skalViseTiltaksinfoLenke ? <Tiltakinfo/> : null}
            </Rad>

            <Rad>
                {erSykmeldtMedArbeidsgiver ? <OkonomiRad/> : <Dagpenger/>}
            </Rad>
        </>
    );
};

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    servicegruppe: state.servicegruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
    reservasjonKRR: state.oppfolging.data.reservasjonKRR,
    foreslattInnsatsgruppe: selectForeslattInnsatsgruppe(state),
    opprettetRegistreringDato: new Date(selectOpprettetRegistreringDato(state)),
    harEgenvurderingbesvarelse: state.egenvurderingbesvarelse.harEgenvurderingbesvarelse,
});

export default connect(mapStateToProps)(Startside);
