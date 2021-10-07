import tekster from '../utils/tekster.json';
import LenkepanelMedIkon from './LenkepanelMedIkon';
import PanelOverskrift from './PanelOverskrift';
import IkonBlyant from '../ikoner/IkonBlyant';
import IkonSparegris from '../ikoner/IkonKane';
import IkonPlaster from '../ikoner/IkonPlaster';
import IkonSkilt from '../ikoner/IkonSkilt';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';

const DittnavFliser = () => (
    <>
        <div className="dittnav-lenkeikon-container">
            <LenkepanelMedIkon
                alt="Ditt sykefravær"
                overskrift={PanelOverskrift({ overskrift: tekster['fliser.ditt.sykevravaer'], type: 'Undertittel' })}
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
                overskrift={PanelOverskrift({ overskrift: tekster['fliser.mistet.jobben'], type: 'Undertittel' })}
                ingress={tekster['fliser.mistet.jobben.ingress']}
                href={lenker.veilederArbeidssoker.url}
                gaCategory={GoogleAnalyticsCategory.Forside}
                gaAction={GoogleAnalyticsAction.MistetJobben}
            >
                <IkonSkilt />
            </LenkepanelMedIkon>
        </div>
        <div className="dittnav-lenkeikon-container">
            <LenkepanelMedIkon
                alt="Skjemaer"
                overskrift={PanelOverskrift({ overskrift: tekster['fliser.skjemaer'], type: 'Undertittel' })}
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
                overskrift={PanelOverskrift({ overskrift: tekster['fliser.din.pensjon'], type: 'Undertittel' })}
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
