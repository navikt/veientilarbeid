import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import { Heading } from '@navikt/ds-react';

const StatusTittel = () => {
    const kanViseKomponent = useErInnloggetArbeidssoker();

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <Heading style={{ margin: 'var(--navds-font-size-medium)' }} size="medium">
            Du er registrert som arbeidssøker
        </Heading>
    );
};

export default StatusTittel;
