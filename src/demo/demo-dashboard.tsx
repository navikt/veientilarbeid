import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Select as SelectKomponent, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import {
    DemoData, hentJsk, settJsk, slettJsk,
    hentSykmeldtMedArbeidsgiver, settSykmeldtMedArbeidsgiver,
    hentUlesteDialoger, settUlesteDialoger,
    hentServicegruppe, settServicegruppe, settReservasjonKRR, hentReservasjonKRR,
} from './demo-state';

import './demo-dashboard.less';
import { FremtidigSituasjonSvar, ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import {
    hentForeslattInnsatsgruppe,
    hentFremtidigSituasjon, hentOpprettetDato,
    settForeslattInnsatsgruppe,
    settFremtidigSituasjon, settOpprettetDato
} from './demo-state-brukerregistrering';

interface OpprettetRegistreringDato {
    registrertIForkantAvLansering: string;
    registrertIEtterkantAvLansering: string;
}

export const opprettetRegistreringDato: OpprettetRegistreringDato = {
    registrertIForkantAvLansering: '2020-01-01T12:00:00.111111+01:00',
    registrertIEtterkantAvLansering: '2020-01-03T12:00:00.111111+01:00'
};

class DemoDashboard extends React.Component<InjectedIntlProps> {
    render() {
        const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
        const JSK = DemoData.JSK;
        const ULESTE_DIALOGER = DemoData.ULESTE_DIALOGER;
        const RESERVASJON_KRR = DemoData.RESERVASJON_KRR;
        const {messages} = this.props.intl;

        const handleChangeServicegruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settServicegruppe(e.target.value);
            window.location.reload();
        };

        const handleChangeBrukerregistrering = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settFremtidigSituasjon(e.target.value as FremtidigSituasjonSvar);
            window.location.reload();
        };

        const handleChangeForeslaattInnsatsgruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settForeslattInnsatsgruppe(e.target.value as ForeslattInnsatsgruppe);
            window.location.reload();
        };

        const handleChangeOpprettetRegistreringDato = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settOpprettetDato(e.target.value);
            window.location.reload();
        };

        const handleClick = (e: React.SyntheticEvent<EventTarget, Event>) => {
            const element = (e.currentTarget as HTMLInputElement);
            if (element.id === SYKMELDT_MED_ARBEIDSGIVER) {
                settSykmeldtMedArbeidsgiver(element.checked.toString());
            } else if (element.id === JSK) {
                if (element.checked) {
                    settJsk();
                } else {
                    slettJsk();
                }
            } else if (element.id === ULESTE_DIALOGER) {
                settUlesteDialoger(element.checked.toString());
            } else if (element.id === RESERVASJON_KRR) {
                settReservasjonKRR(element.checked.toString());
            }
            window.location.reload();
        };

        const servicegrupper = {
            'IKVAL': 'Standard',
            'BATT': 'Spesielt tilpasset',
            'BFORM': 'Situasjonsbestemt',
            'VARIG': 'Varig',
            'IVURD': 'Ikke fastsatt',
        };

        const fremtidigeSituasjoner = {
            SAMME_ARBEIDSGIVER: 'Samme arbeidsgiver',
            SAMME_ARBEIDSGIVER_NY_STILLING: 'Samme arbeidsgiver, ny stilling',
            NY_ARBEIDSGIVER: 'Ny arbeidsgiver',
            USIKKER: 'Usikker',
            INGEN_PASSER: 'Ingen passer',
        };

        const foreslattInnsatsgrupper = {
            STANDARD_INNSATS: 'Standard innsats',
            SITUASJONSBESTEMT_INNSATS: 'Situasjonsbestemt innsats',
            BEHOV_FOR_ARBEIDSEVNEVURDERING: 'Behov for arbeidsevnevurdering',
        };

        const opprettetRegistreringDatoLabels = {
            registrertIForkantAvLansering: '01.01.20',
            registrertIEtterkantAvLansering: '03.01.20',
        };

        return (
            <section className="demodashboard">
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="demo-tittel"/>
                </Innholdstittel>
                <div className="two-select">
                    <SelectKomponent
                        label={messages['demo-velgservicegruppe']}
                        onChange={handleChangeServicegruppe}
                        id="velg-bruker"
                        defaultValue={hentServicegruppe()}
                    >
                        {
                            Object.keys(servicegrupper).map((gruppe: string) =>
                                <option
                                    key={gruppe}
                                    value={gruppe}
                                >
                                    {servicegrupper[gruppe]}
                                </option>
                            )
                        }
                    </SelectKomponent>
                    <SelectKomponent
                        label={messages['demo-brukerregistrering']}
                        onChange={handleChangeBrukerregistrering}
                        id="velg-fremtidig-situasjon"
                        defaultValue={hentFremtidigSituasjon()}
                    >
                        {
                            Object.keys(FremtidigSituasjonSvar).map((svar: string) =>
                                <option
                                    key={svar}
                                    value={svar}
                                >
                                    {fremtidigeSituasjoner[svar]}
                                </option>
                            )
                        }
                    </SelectKomponent>
                    <SelectKomponent
                        label={messages['demo-foreslatt-innsatsgruppe']}
                        onChange={handleChangeForeslaattInnsatsgruppe}
                        id="velg-foreslaatt-innsatsgruppe"
                        defaultValue={hentForeslattInnsatsgruppe()}
                    >
                        {
                            Object.keys(ForeslattInnsatsgruppe).map((svar: string) =>
                                <option
                                    key={svar}
                                    value={svar}
                                >
                                    {foreslattInnsatsgrupper[svar]}
                                </option>
                            )
                        }
                    </SelectKomponent>
                    <SelectKomponent
                        label={messages['demo-opprettetregistreringdato']}
                        onChange={handleChangeOpprettetRegistreringDato}
                        id="velg-opprettetdato"
                        defaultValue={hentOpprettetDato()}
                    >
                        {
                            Object.keys(opprettetRegistreringDato).map((key: string) =>
                                <option
                                    key={key}
                                    value={opprettetRegistreringDato[key]}
                                >
                                    {opprettetRegistreringDatoLabels[key]}
                                </option>
                            )
                        }
                    </SelectKomponent>
                </div>
                <CheckboksPanelGruppe
                    onChange={handleClick}
                    legend=""
                    checkboxes={[
                        {
                            label: messages['demo-sykmelding'],
                            checked: hentSykmeldtMedArbeidsgiver(),
                            id: SYKMELDT_MED_ARBEIDSGIVER
                        },
                        {label: messages['demo-jsk'], checked: !!hentJsk(), id: JSK},
                        {
                            label: messages['demo-dialog'],
                            checked: hentUlesteDialoger(),
                            id: ULESTE_DIALOGER
                        },
                        {
                            label: messages['demo-krr'],
                            checked: hentReservasjonKRR(),
                            id: RESERVASJON_KRR,
                        }
                    ]}
                />
            </section>
        );
    }
}

export default injectIntl(DemoDashboard);
