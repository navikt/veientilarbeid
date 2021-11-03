import { useBrukerinfoData } from '../contexts/bruker-info';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import Dialog from '../komponenter/dialog/dialog';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Meldekort from '../komponenter/meldekort/meldekort';

const AktivitetDialog = () => {
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    return (
        <>
            <Aktivitetsplan />
            <div className="tokol">
                <Dialog />
                {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
            </div>
        </>
    );
};

export default AktivitetDialog;
