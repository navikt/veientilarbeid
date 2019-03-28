import * as React from 'react';
import { connect } from 'react-redux';
import Rad from './rad';
import { AppState } from '../../reducer';
import AapRad from '../../komponenter/aap/aap';
import Dialog from '../../komponenter/dialog/dialog';
import Banner from '../../komponenter/banner/banner';
import Meldekort from '../../komponenter/meldekort/meldekort';
import Tiltakinfo from '../../komponenter/tiltakinfo/tiltakinfo';
import OkonomiRad from '../../komponenter/okonomi/okonomi-rad';
import InfoPaneler from '../../komponenter/info-paneler/info-paneler';
import ReaktiveringMelding from '../../komponenter/reaktivering-melding';
import Aktivitetsplan from '../../komponenter/aktivitetsplan/aktivitetsplan';
import { Servicegruppe, State as ServicegruppeState } from '../../ducks/servicegruppe';
import { selectSykmeldtInfo, State as SykmeldtInfoState } from '../../ducks/sykmeldt-info';
import RessurslenkerJobbsok from '../../komponenter/ressurslenker-jobbsok/ressurslenker-jobbsok';
import { FremtidigSituasjonSvar, selectFremtidigSituasjonSvar } from '../../ducks/brukerregistrering';

interface StateProps {
    sykmeldtInfo: SykmeldtInfoState;
    servicegruppe: ServicegruppeState;
    fremtidigSvar: FremtidigSituasjonSvar;
}

class Startside extends React.Component<StateProps> {

    erInnsatsgruppe() {
        return (
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BFORM ||
            this.props.servicegruppe.data.servicegruppe === Servicegruppe.BATT
        );
    }

    static skalIkkeSeArbeidstjenester(svar: FremtidigSituasjonSvar): boolean {
        return (
            svar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER ||
            svar === FremtidigSituasjonSvar.SAMME_ARBEIDSGIVER_NY_STILLING
        );
    }

    render() {
        const erSykmeldtMedArbeidsgiver = this.props.sykmeldtInfo.data.erSykmeldtMedArbeidsgiver;
        const innsatsgruppe = this.erInnsatsgruppe();
        const ikkeArbeidstjenester = Startside.skalIkkeSeArbeidstjenester(this.props.fremtidigSvar);

        return (
            <>
                {erSykmeldtMedArbeidsgiver
                    ?
                    <>
                        <Banner type="sykmeldt"/>
                        <Rad>
                            <Aktivitetsplan/>
                            <Dialog/>
                        </Rad>
                        <Rad>
                            <InfoPaneler/>
                        </Rad>
                        <Rad>
                            <AapRad/>
                        </Rad>
                        {!ikkeArbeidstjenester ?
                            <Rad>
                                <RessurslenkerJobbsok/>
                            </Rad> : null
                        }
                        <Rad>
                            <OkonomiRad/>
                        </Rad>
                    </>
                    :
                    <>
                        <Banner type="ordinaer"/>
                        <Rad>
                            <ReaktiveringMelding/>
                            <Aktivitetsplan/>
                            <div className="tokol">
                                <Dialog/>
                                <Meldekort/>
                            </div>
                        </Rad>
                        <Rad>
                            <RessurslenkerJobbsok/>
                        </Rad>
                        {innsatsgruppe && (
                            <Rad>
                                <Tiltakinfo/>
                            </Rad>
                        )}
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => ({
    sykmeldtInfo: selectSykmeldtInfo(state),
    servicegruppe: state.servicegruppe,
    fremtidigSvar: selectFremtidigSituasjonSvar(state),
});

export default connect(mapStateToProps)(Startside);
