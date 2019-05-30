import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Select as SelectKomponent, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import {
    DemoData,
    hentJsk,
    settJsk,
    slettJsk,
    hentEgenvurdering,
    settEgenvurdering,
    slettEgenvurdering,
    hentSykmeldtMedArbeidsgiver,
    settSykmeldtMedArbeidsgiver,
    hentUlesteDialoger,
    settUlesteDialoger,
    hentInnsatsgruppe,
    settInnsatsgruppe,
    settReservasjonKRR,
    hentReservasjonKRR,
    settAutentiseringsInfo,
    slettAutentiseringsInfo, hentAutentiseringsInfo,
} from './demo-state';

import './demo-dashboard.less';
import { FremtidigSituasjonSvar, ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import {
    hentForeslattInnsatsgruppe,
    hentFremtidigSituasjon, hentOpprettetDato,
    settForeslattInnsatsgruppe,
    settFremtidigSituasjon, settOpprettetDato
} from './demo-state-brukerregistrering';
import { InnloggingsNiva } from '../komponenter/hent-initial-data/autentiseringsInfoFetcher';

interface OpprettetRegistreringDato {
    registrertIForkantAvLansering: string;
    registrertIEtterkantAvLansering: string;
}

export const opprettetRegistreringDato: OpprettetRegistreringDato = {
    registrertIForkantAvLansering: '2019-05-09T12:00:00.111111+01:00',
    registrertIEtterkantAvLansering: '2019-05-11T12:00:00.111111+01:00'
};

class DemoDashboard extends React.Component<InjectedIntlProps> {
    render() {
        const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
        const JSK = DemoData.JSK;
        const EGENVURDERING = DemoData.EGENVURDERING;
        const ULESTE_DIALOGER = DemoData.ULESTE_DIALOGER;
        const RESERVASJON_KRR = DemoData.RESERVASJON_KRR;
        const AUTENTISERINGS_INFO = DemoData.AUTENTISERINGS_INFO;
        const {messages} = this.props.intl;

        const handleChangeInnsatsgruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settInnsatsgruppe(e.target.value);
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
            } else if (element.id === EGENVURDERING) {
                if (element.checked) {
                    settEgenvurdering();
                } else {
                    slettEgenvurdering();
                }
            } else if (element.id === ULESTE_DIALOGER) {
                settUlesteDialoger(element.checked.toString());
            } else if (element.id === RESERVASJON_KRR) {
                settReservasjonKRR(element.checked.toString());
            } else if (element.id === AUTENTISERINGS_INFO) {
                if (element.checked) {
                    settAutentiseringsInfo();
                } else {
                    slettAutentiseringsInfo();
                }
            }
            window.location.reload();
        };

        const innsatsgrupper = {
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
            registrertIForkantAvLansering: '09.05.19',
            registrertIEtterkantAvLansering: '11.05.19',
        };

        return (
            <section className="demodashboard">
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="demo-tittel"/>
                </Innholdstittel>
                <div className="two-select">
                    <SelectKomponent
                        label={messages['demo-velgservicegruppe']}
                        onChange={handleChangeInnsatsgruppe}
                        id="velg-bruker"
                        defaultValue={hentInnsatsgruppe()}
                    >
                        {
                            Object.keys(innsatsgrupper).map((gruppe: string) =>
                                <option
                                    key={gruppe}
                                    value={gruppe}
                                >
                                    {innsatsgrupper[gruppe]}
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
                            Object.keys(foreslattInnsatsgrupper).map((svar: string) =>
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
                        {   label: messages['demo-jsk'],
                            checked: !!hentJsk(),
                            id: JSK},
                        {
                            label: messages['demo-dialog'],
                            checked: hentUlesteDialoger(),
                            id: ULESTE_DIALOGER
                        },
                        {
                            label: messages['demo-krr'],
                            checked: hentReservasjonKRR(),
                            id: RESERVASJON_KRR,
                        },
                        {
                            label: messages['demo-egenvurdering'],
                            checked: !!hentEgenvurdering(),
                            id: EGENVURDERING,
                        },
                        {
                            label: messages['demo-autentiseringsinfo'],
                            checked: hentAutentiseringsInfo().securityLevel === InnloggingsNiva.LEVEL_3,
                            id: AUTENTISERINGS_INFO,
                        }
                    ]}
                />
            </section>
        );
    }
}

export default injectIntl(DemoDashboard);
