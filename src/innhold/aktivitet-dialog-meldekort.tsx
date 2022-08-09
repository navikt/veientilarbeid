import { useBrukerinfoData } from '../contexts/bruker-info';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Meldekort from '../komponenter/meldekort-legacy/meldekort';

const AktivitetDialog = () => {
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    return (
        <>
            <Aktivitetsplan />
            {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
        </>
    );
};

export default AktivitetDialog;
