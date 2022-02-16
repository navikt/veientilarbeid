import LenkepanelMedIkon from './LenkepanelMedIkon';
import IkonBlyant from '../ikoner/IkonBlyant';
import IkonSparegris from '../ikoner/IkonKane';
import IkonPlaster from '../ikoner/IkonPlaster';
import IkonSkilt from '../ikoner/IkonSkilt';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';
import lagHentTekstForSprak, { Tekster } from '../../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../../contexts/sprak';

const TEKSTER: Tekster<string> = {
    nb: {
        'ditt-sykefravaer': 'Ditt sykefravær',
        'ditt-sykefravaer-ingress': 'Dine sykmeldinger og oppgaver',
        'mistet-jobben': 'Mistet jobben?',
        'mistet-jobben-ingress': 'Jobbsøkertips, økonomi og hjelp fra NAV',
        skjemaer: 'Skjemaer',
        'skjemaer-ingress': 'Alle skjemaer og søknader i NAV',
        'din-pensjon': 'Din pensjon',
        'din-pensjon-ingress': 'Kalkulator, søknad og utbetalinger',
    },
};

const DittnavFliser = () => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    return (
        <>
            <div className="dittnav-fliser">
                <LenkepanelMedIkon
                    alt="Ditt sykefravær"
                    overskrift={tekst('ditt-sykefravaer')}
                    ingress={tekst('ditt-sykefravaer-ingress')}
                    className="first"
                    href={lenker.dittSykefravaer.url}
                    gaCategory={GoogleAnalyticsCategory.Forside}
                    gaAction={GoogleAnalyticsAction.DittSykefravaer}
                >
                    <IkonPlaster />
                </LenkepanelMedIkon>
                <LenkepanelMedIkon
                    alt="Mistet jobben?"
                    overskrift={tekst('mistet-jobben')}
                    ingress={tekst('mistet-jobben-ingress')}
                    href={lenker.veilederArbeidssoker.url}
                    gaCategory={GoogleAnalyticsCategory.Forside}
                    gaAction={GoogleAnalyticsAction.MistetJobben}
                >
                    <IkonSkilt />
                </LenkepanelMedIkon>

                <LenkepanelMedIkon
                    alt="Skjemaer"
                    overskrift={tekst('skjemaer')}
                    ingress={tekst('skjemaer-ingress')}
                    className="first"
                    href={lenker.skjemaer.url}
                    gaCategory={GoogleAnalyticsCategory.Forside}
                    gaAction={GoogleAnalyticsAction.Skjemaer}
                >
                    <IkonBlyant />
                </LenkepanelMedIkon>
                <LenkepanelMedIkon
                    alt="Din pensjon"
                    overskrift={tekst('din-pensjon')}
                    ingress={tekst('din-pensjon-ingress')}
                    href={lenker.dinPensjon.url}
                    gaCategory={GoogleAnalyticsCategory.Forside}
                    gaAction={GoogleAnalyticsAction.DinPensjon}
                >
                    <IkonSparegris />
                </LenkepanelMedIkon>
            </div>
        </>
    );
};

export default DittnavFliser;
