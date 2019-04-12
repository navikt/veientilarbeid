import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Select as SelectKomponent, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import {
    DemoData, hentJsk, settJsk, slettJsk,
    hentSykmeldtMedArbeidsgiver, settSykmeldtMedArbeidsgiver,
    hentUlesteDialoger, settUlesteDialoger,
    hentServicegruppe, settServicegruppe,
    hentBrukerRegistrering, settBrukerRegistrering, settForeslaattInnsatsgruppe
} from './demo-state';

import './demo-dashboard.less';
import { FremtidigSituasjonSvar, Innsatsgruppe } from '../ducks/brukerregistrering';

class DemoDashboard extends React.Component<InjectedIntlProps> {
    render() {
        const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
        const JSK = DemoData.JSK;
        const ULESTE_DIALOGER = DemoData.ULESTE_DIALOGER;
        const {messages} = this.props.intl;

        const handleChangeServicegruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settServicegruppe(e.target.value);
            window.location.reload();
        };

        const handleChangeBrukerregistrering = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settBrukerRegistrering(e.target.value);
            window.location.reload();
        };

        const handleChangeForeslaattInnsatsgruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settForeslaattInnsatsgruppe(e.target.value);
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
                settUlesteDialoger(`${element.checked}`);
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

        const innsatsgrupper = {
            STANDARD_INNSATS: 'Standard innsats',
            SITUASJONSBESTEMT_INNSATS: 'Situasjonsbestemt innsats',
            BEHOV_FOR_ARBEIDSEVNEVURDERING: 'Behov for arbeidsevnevurdering',
            UBESTEMT: 'Ubestemt'
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
                        defaultValue={hentBrukerRegistrering().registrering.besvarelse.fremtidigSituasjon}
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
                        label={messages['demo-foreslaatt-innsatsgruppe']}
                        onChange={handleChangeForeslaattInnsatsgruppe}
                        id="velg-foreslaatt-innsatsgruppe"
                        defaultValue={hentBrukerRegistrering().registrering.profilering.innsatsgruppe}
                    >
                        {
                            Object.keys(Innsatsgruppe).map((svar: string) =>
                                <option
                                    key={svar}
                                    value={svar}
                                >
                                    {innsatsgrupper[svar]}
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
                        }
                    ]}
                />
            </section>
        );
    }
}

export default injectIntl(DemoDashboard);
