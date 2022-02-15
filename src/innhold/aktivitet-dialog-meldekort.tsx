import { useBrukerinfoData } from '../contexts/bruker-info';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import DittSykefravaer from '../komponenter/ditt-sykefravaer/ditt-sykefravaer';
import Meldekort from '../komponenter/meldekort/meldekort';
import { Cell, Grid } from '@navikt/ds-react';

const AktivitetDialog = () => {
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    return (
        <Grid className="blokk-xs">
            <Cell xs={12} md={6}>
                <Aktivitetsplan />
            </Cell>
            <Cell xs={12} md={6}>
                {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
            </Cell>
        </Grid>
    );
};

export default AktivitetDialog;
