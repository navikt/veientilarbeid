import flex from './flex.module.css';
import AiaTabs from './tabs/aia-tabs';
import InnholdStandard from './innhold/innhold-standard';
import { useSkalBrukeTabsStandardIStandardBundle } from './hooks/use-skal-bruke-tabs';

function StandardWrapper() {
    const brukTabs = useSkalBrukeTabsStandardIStandardBundle();

    return <div className={`${flex.flex} ${flex.center}`}>{brukTabs ? <AiaTabs /> : <InnholdStandard />}</div>;
}

export default StandardWrapper;
