import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Select as SelectKomponent, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import {
    DemoData, hentJsk,
    hentServicegruppe, hentSykmeldtMedArbeidsgiver,
    hentUlesteDialoger, settUlesteDialoger,
    settJsk,
    settServicegruppe,
    settSykmeldtMedArbeidsgiver,
    slettJsk
} from './demo-state';

import './demo-dashboard.less';

class DemoDashboard extends React.Component<InjectedIntlProps> {
    render() {
        const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
        const JSK = DemoData.JSK;
        const ULESTE_DIALOGER = DemoData.ULESTE_DIALOGER;

        const { messages } = this.props.intl;

        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settServicegruppe(e.target.value);
            window.location.reload();
        };

        const handleClick = (e: React.SyntheticEvent<EventTarget, Event>, value: string | undefined) => {
            const element = (e.currentTarget as HTMLInputElement);
            if (element.id === SYKMELDT_MED_ARBEIDSGIVER) {
                settSykmeldtMedArbeidsgiver(`${value}`);
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

        return (
            <section className="demodashboard">
                <Innholdstittel className="blokk-s">
                    <FormattedMessage id="demo-tittel"/>
                </Innholdstittel>
                <SelectKomponent
                    label={messages['demo-velgservicegruppe']}
                    onChange={handleChange}
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
                <CheckboksPanelGruppe
                    onChange={handleClick}
                    legend=""
                    checkboxes={[
                        {
                            label: messages['demo-sykmelding'],
                            checked: hentSykmeldtMedArbeidsgiver(),
                            id: SYKMELDT_MED_ARBEIDSGIVER
                        },
                        { label: messages['demo-jsk'], checked: !!hentJsk(), id: JSK },
                        {
                            label: messages['demo-dialog'],
                            checked: hentUlesteDialoger(),
                            id: ULESTE_DIALOGER
                        },
                    ]}
                />
            </section>
        );
    }
}

export default injectIntl(DemoDashboard);
