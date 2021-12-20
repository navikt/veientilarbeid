import tekster from '../utils/tekster.json';
import LenkepanelMedIkon from './LenkepanelMedIkon';
import IkonBlyant from '../ikoner/IkonBlyant';
import IkonSparegris from '../ikoner/IkonKane';
import IkonPlaster from '../ikoner/IkonPlaster';
import IkonSkilt from '../ikoner/IkonSkilt';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';

const DittnavFliser = () => (
    <>
        <div className="dittnav-fliser">
            <LenkepanelMedIkon
                alt="Ditt sykefravær"
                overskrift={tekster['fliser.ditt.sykevravaer']}
                ingress={tekster['fliser.ditt.sykevravaer.ingress']}
                className="first"
                href={lenker.dittSykefravaer.url}
                gaCategory={GoogleAnalyticsCategory.Forside}
                gaAction={GoogleAnalyticsAction.DittSykefravaer}
            >
                <IkonPlaster />
            </LenkepanelMedIkon>
            <LenkepanelMedIkon
                alt="Mistet jobben?"
                overskrift={tekster['fliser.mistet.jobben']}
                ingress={tekster['fliser.mistet.jobben.ingress']}
                href={lenker.veilederArbeidssoker.url}
                gaCategory={GoogleAnalyticsCategory.Forside}
                gaAction={GoogleAnalyticsAction.MistetJobben}
            >
                <IkonSkilt />
            </LenkepanelMedIkon>

            <LenkepanelMedIkon
                alt="Skjemaer"
                overskrift={tekster['fliser.skjemaer']}
                ingress={tekster['fliser.skjemaer.ingress']}
                className="first"
                href={lenker.skjemaer.url}
                gaCategory={GoogleAnalyticsCategory.Forside}
                gaAction={GoogleAnalyticsAction.Skjemaer}
            >
                <IkonBlyant />
            </LenkepanelMedIkon>
            <LenkepanelMedIkon
                alt="Din pensjon"
                overskrift={tekster['fliser.din.pensjon']}
                ingress={tekster['fliser.din.pensjon.ingress']}
                href={lenker.dinPensjon.url}
                gaCategory={GoogleAnalyticsCategory.Forside}
                gaAction={GoogleAnalyticsAction.DinPensjon}
            >
                <IkonSparegris />
            </LenkepanelMedIkon>
        </div>
    </>
);

export default DittnavFliser;
