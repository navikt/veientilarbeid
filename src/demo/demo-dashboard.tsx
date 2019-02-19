import * as React from 'react';
import './demo-dashboard.less';
import { Select as SelectKomponent, CheckboksPanelGruppe } from 'nav-frontend-skjema';
import './demo-dashboard.less';
import { Innholdstittel } from 'nav-frontend-typografi';
import { SyntheticEvent } from 'react';
import {
    DemoData, hentJsk,
    hentServicegruppe, hentSykmeldtMedArbeidsgiver,
    settJsk,
    settServicegruppe,
    settSykmeldtMedArbeidsgiver,
    slettJsk
} from './demo-state';

export default function () {
    const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
    const JSK = DemoData.JSK;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        settServicegruppe(e.target.value);
        window.location.reload();
    };

    const handleClick = (e: SyntheticEvent<HTMLInputElement>) => {
        if (e.currentTarget.id === SYKMELDT_MED_ARBEIDSGIVER) {
            settSykmeldtMedArbeidsgiver(`${e.currentTarget.checked}`);
        } else if (e.currentTarget.id === JSK) {
            if (e.currentTarget.checked) {
                settJsk();
            } else {
                slettJsk();
            }
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

    // TODO Dra tekster ut i egne teksfiler
    // TODO Test for å sjekke at dashboard har rendret
    return (
        <section className="demodashboard">
            <Innholdstittel>
                Demo
            </Innholdstittel>
            <SelectKomponent
                label="Velg"
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
                    { label: 'Sykmelding', checked: hentSykmeldtMedArbeidsgiver(), id: SYKMELDT_MED_ARBEIDSGIVER },
                    { label: 'Lagret JSK', checked: !!hentJsk(), id: JSK },
                ]}
            />
        </section>
    );
}