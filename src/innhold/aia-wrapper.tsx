import AiaTabs from '../tabs/aia-tabs';
import ArbeidssokerInnhold from './arbeidssoker-innhold';
import useSkalBrukeTabs from '../hooks/use-skal-bruke-tabs';

function AiaWrapper() {
    const brukTabs = useSkalBrukeTabs();

    return <div id={'aia-wrapper'}>{brukTabs ? <AiaTabs /> : <ArbeidssokerInnhold />}</div>;
}

export default AiaWrapper;
