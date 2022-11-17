import { BodyLong } from '@navikt/ds-react';

import { Meldeplikt } from '../../contexts/meldeplikt';
import prettyPrintDato from '../../utils/pretty-print-dato';

import spacingStyles from '../../spacing.module.css';

function SisteMeldekortVidereRegistrertValg({ meldeplikt }: { meldeplikt: Meldeplikt | null }) {
    if (!meldeplikt) return null;

    return (
        <BodyLong className={spacingStyles.mb1}>
            Du sa at du ønsket å{meldeplikt.erArbeidssokerNestePeriode ? ' fortsatt ' : ' ikke '}være registrert som
            arbeidssøker på meldekortet som ble levert {prettyPrintDato(meldeplikt.eventOpprettet)}.
        </BodyLong>
    );
}

export default SisteMeldekortVidereRegistrertValg;
