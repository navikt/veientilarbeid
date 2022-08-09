import { useBrukerinfoData } from '../contexts/bruker-info';
import AktivitetsplanLegacy from '../komponenter/aktivitetsplan/aktivitetsplan-legacy';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Meldekort from '../komponenter/meldekort-legacy/meldekort';

const AktivitetDialog = () => {
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    return (
        <>
            <AktivitetsplanLegacy />
            {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
        </>
    );
};

export default AktivitetDialog;
