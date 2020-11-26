import * as React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
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
    hentServicegruppe,
    settServicegruppe,
    hentFormidlingsgruppe,
    settFormidlingsgruppe,
    settReservasjonKRR,
    hentReservasjonKRR,
    settAutentiseringsInfo,
    slettAutentiseringsInfo,
    hentAutentiseringsInfo,
    hentMotestotte,
    settMotestotte,
    slettMotestotte,
    hentRegistreringType,
    settRegistreringType,
    hentGeografiskTilknytning,
    settGeografiskTilknytning,
    hentRettighetsgruppe,
    settRettighetsgruppe,
    hentFeatureToggles,
    settFeatureToggles,
    hentUnderOppfolging,
    slettUnderOppfolging,
    settUnderOppfolging,
    hentKanReaktiveres,
    settKanReaktiveres,
} from './demo-state';

import './demo-dashboard.less';
import { FremtidigSituasjonSvar, ForeslattInnsatsgruppe } from '../ducks/brukerregistrering';
import {
    hentForeslattInnsatsgruppe,
    hentFremtidigSituasjon,
    hentOpprettetDato,
    settForeslattInnsatsgruppe,
    settFremtidigSituasjon,
    settOpprettetDato,
} from './demo-state-brukerregistrering';
import tekster from '../tekster/tekster';
import { InnloggingsNiva } from '../ducks/autentisering';

interface OpprettetRegistreringDato {
    registrertForLanseringEgenvurdering: string;
    registrertMellomLanseringEgenvurderingOgMotestotte: string;
    registrertEtterLanseringMotestotte: string;
    registrertNaa: Date;
}

export const opprettetRegistreringDato: OpprettetRegistreringDato = {
    registrertForLanseringEgenvurdering: '2019-05-09T12:00:00.111111+01:00',
    registrertMellomLanseringEgenvurderingOgMotestotte: '2019-05-11T12:00:00.111111+01:00',
    registrertEtterLanseringMotestotte: '2019-06-05T12:00:00.111111+01:00',
    registrertNaa: new Date(),
};

class DemoDashboard extends React.Component<{}> {
    render() {
        const SYKMELDT_MED_ARBEIDSGIVER = DemoData.SYKMELDT_MED_ARBEIDSGIVER;
        const JSK = DemoData.JSK;
        const EGENVURDERING = DemoData.EGENVURDERING;
        const MOTESTOTTE = DemoData.MOTESTOTTE;
        const ULESTE_DIALOGER = DemoData.ULESTE_DIALOGER;
        const RESERVASJON_KRR = DemoData.RESERVASJON_KRR;
        const AUTENTISERINGS_INFO = DemoData.AUTENTISERINGS_INFO;
        const FEATURES = DemoData.FEATURE_TOGGLES;
        const UNDER_OPPFOLGING = DemoData.UNDER_OPPFOLGING;
        const KAN_REAKTIVERES = DemoData.KAN_REAKTIVERES;

        const handleChangeServicegruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settServicegruppe(e.target.value);
            window.location.reload();
        };

        const handleChangeFormidlingsgruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settFormidlingsgruppe(e.target.value);
            window.location.reload();
        };

        const handleChangeRegistreringType = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settRegistreringType(e.target.value);
            window.location.reload();
        };

        const handleChangeGeografiskTilknytning = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settGeografiskTilknytning(e.target.value);
            window.location.reload();
        };

        const handleChangeRettighetsgruppe = (e: React.ChangeEvent<HTMLSelectElement>) => {
            settRettighetsgruppe(e.target.value);
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
            const element = e.currentTarget as HTMLInputElement;
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
            } else if (element.id === MOTESTOTTE) {
                if (element.checked) {
                    settMotestotte();
                } else {
                    slettMotestotte();
                }
            } else if (element.id === FEATURES) {
                if (element.checked) {
                    settFeatureToggles(true);
                } else {
                    settFeatureToggles(false);
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
            } else if (element.id === UNDER_OPPFOLGING) {
                if (element.checked) {
                    settUnderOppfolging();
                } else {
                    slettUnderOppfolging();
                }
            } else if (element.id === KAN_REAKTIVERES) {
                settKanReaktiveres(element.checked.toString());
            }
            window.location.reload();
        };

        const servicegrupper = {
            IKVAL: 'Standard',
            BATT: 'Spesielt tilpasset',
            BFORM: 'Situasjonsbestemt',
            VARIG: 'Varig',
            IVURD: 'Ikke fastsatt',
            BKART: 'BKART',
        };

        const formidlingsgrupper = {
            ARBS: 'ARBS',
            IARBS: 'IARBS',
            ISERV: 'ISERV',
        };

        const registreringTyper = {
            REAKTIVERING: 'REAKTIVERING',
            SPERRET: 'SPERRET',
            ALLEREDE_REGISTRERT: 'ALLEREDE_REGISTRERT',
            SYKMELDT_REGISTRERING: 'SYKMELDT_REGISTRERING',
            ORDINAER_REGISTRERING: 'ORDINAER_REGISTRERING',
        };

        const geografiskeTilknytninger = {
            '0807': 'Notodden',
            '010302': 'Grünerløkka',
        };

        const rettighetsgrupper = {
            AAP: 'AAP',
            DAGP: 'DAGP',
            INGEN_VERDI: 'INGEN_VERDI',
            IYT: 'IYT',
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
            registrertForLanseringEgenvurdering: '09.05.19 - Før lansering egenvurdering/møtestøtte',
            registrertMellomLanseringEgenvurderingOgMotestotte: '11.05.19 - Etter egenvurdering/før møtestøtte',
            registrertEtterLanseringMotestotte: '05.06.19 - Etter lansering møtestøtte',
            registrertNaa: 'Registrert nå',
        };

        return (
            <section className="demodashboard">
                <Innholdstittel className="blokk-s">{tekster['demo-tittel']}</Innholdstittel>
                <div className="two-select">
                    <SelectKomponent
                        label={'Velg geografisk tilknytning'}
                        onChange={handleChangeGeografiskTilknytning}
                        id="velg-geografisktilknytning"
                        defaultValue={hentGeografiskTilknytning()}
                    >
                        {Object.keys(geografiskeTilknytninger).map((gruppe: string) => (
                            <option key={gruppe} value={gruppe}>
                                {geografiskeTilknytninger[gruppe]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={'Velg rettighetsgruppe'}
                        onChange={handleChangeRettighetsgruppe}
                        id="velg-rettighetsgruppe"
                        defaultValue={hentRettighetsgruppe()}
                    >
                        {Object.keys(rettighetsgrupper).map((gruppe: string) => (
                            <option key={gruppe} value={gruppe}>
                                {rettighetsgrupper[gruppe]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={'Velg registreringstype'}
                        onChange={handleChangeRegistreringType}
                        id="velg-registreringtype"
                        defaultValue={hentRegistreringType()}
                    >
                        {Object.keys(registreringTyper).map((gruppe: string) => (
                            <option key={gruppe} value={gruppe}>
                                {registreringTyper[gruppe]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={tekster['demo-velgservicegruppe']}
                        onChange={handleChangeServicegruppe}
                        id="velg-bruker"
                        defaultValue={hentServicegruppe()}
                    >
                        {Object.keys(servicegrupper).map((gruppe: string) => (
                            <option key={gruppe} value={gruppe}>
                                {servicegrupper[gruppe]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={tekster['demo-velgformidlingsgruppe']}
                        onChange={handleChangeFormidlingsgruppe}
                        id="velg-formidlingsgruppe"
                        defaultValue={hentFormidlingsgruppe()}
                    >
                        {Object.keys(formidlingsgrupper).map((gruppe: string) => (
                            <option key={gruppe} value={gruppe}>
                                {formidlingsgrupper[gruppe]}
                            </option>
                        ))}
                    </SelectKomponent>
                </div>
                <div className="two-select">
                    <SelectKomponent
                        label={tekster['demo-brukerregistrering']}
                        onChange={handleChangeBrukerregistrering}
                        id="velg-fremtidig-situasjon"
                        defaultValue={hentFremtidigSituasjon()}
                    >
                        {Object.keys(FremtidigSituasjonSvar).map((svar: string) => (
                            <option key={svar} value={svar}>
                                {fremtidigeSituasjoner[svar]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={tekster['demo-foreslatt-innsatsgruppe']}
                        onChange={handleChangeForeslaattInnsatsgruppe}
                        id="velg-foreslaatt-innsatsgruppe"
                        defaultValue={hentForeslattInnsatsgruppe()}
                    >
                        {Object.keys(foreslattInnsatsgrupper).map((svar: string) => (
                            <option key={svar} value={svar}>
                                {foreslattInnsatsgrupper[svar]}
                            </option>
                        ))}
                    </SelectKomponent>
                    <SelectKomponent
                        label={tekster['demo-opprettetregistreringdato']}
                        onChange={handleChangeOpprettetRegistreringDato}
                        id="velg-opprettetdato"
                        defaultValue={hentOpprettetDato()}
                    >
                        {Object.keys(opprettetRegistreringDato).map((key: string) => (
                            <option key={key} value={opprettetRegistreringDato[key]}>
                                {opprettetRegistreringDatoLabels[key]}
                            </option>
                        ))}
                    </SelectKomponent>
                </div>
                <CheckboksPanelGruppe
                    onChange={handleClick}
                    legend=""
                    checkboxes={[
                        {
                            label: tekster['demo-sykmelding'],
                            checked: hentSykmeldtMedArbeidsgiver(),
                            id: SYKMELDT_MED_ARBEIDSGIVER,
                        },
                        {
                            label: tekster['demo-jsk'],
                            checked: !!hentJsk(),
                            id: JSK,
                        },
                        {
                            label: tekster['demo-dialog'],
                            checked: hentUlesteDialoger(),
                            id: ULESTE_DIALOGER,
                        },
                        {
                            label: tekster['demo-krr'],
                            checked: hentReservasjonKRR(),
                            id: RESERVASJON_KRR,
                        },
                        {
                            label: tekster['demo-egenvurdering'],
                            checked: !!hentEgenvurdering(),
                            id: EGENVURDERING,
                        },
                        {
                            label: tekster['demo-motestotte'],
                            checked: !!hentMotestotte(),
                            id: MOTESTOTTE,
                        },
                        {
                            label: tekster['demo-autentiseringsinfo'],
                            checked: hentAutentiseringsInfo().securityLevel === InnloggingsNiva.LEVEL_3,
                            id: AUTENTISERINGS_INFO,
                        },
                        {
                            label: 'Aktiver features',
                            checked: !!hentFeatureToggles()[Object.keys(hentFeatureToggles())[0]],
                            id: FEATURES,
                        },
                        {
                            label: 'Under oppfølging',
                            checked: hentUnderOppfolging().underOppfolging === true,
                            id: UNDER_OPPFOLGING,
                        },
                        {
                            label: 'Kan reaktiveres',
                            checked: hentKanReaktiveres(),
                            id: KAN_REAKTIVERES,
                        },
                    ]}
                />
            </section>
        );
    }
}

export default DemoDashboard;
