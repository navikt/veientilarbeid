import prettyPrintDato from '../../utils/pretty-print-dato';
import { ReadMore } from '@navikt/ds-react';
import { plussDager } from '../../utils/date-utils';
import { VeiledningsProps } from './veiledning';
import { PermittertSvar } from '../../models/endring-av-situasjon';

const OPPSIGELSE = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Frem til {prettyPrintDato(oppsigelseDato!)} kan du få utbetalt dagpenger som permittert.
            <br />
            Det er derfor viktig at du fortsetter å sende inn meldekortene frem til og med perioden som dekker{' '}
            {prettyPrintDato(oppsigelseDato!)}.
            <ReadMore header={'Hva baserer vi denne veiledningen på?'}>
                <p>
                    Når du blir oppsagt er den siste dagen du får dagpenger som permittert for den dagen du mottok
                    beskjeden om at du ble oppsagt.
                </p>
                <p>Du har oppgitt at du fikk denne beskjeden {prettyPrintDato(oppsigelseDato!)}</p>
                <p>
                    Arbeidsgiveren din har ansvaret for å betale lønn fra{' '}
                    {prettyPrintDato(plussDager(new Date(oppsigelseDato!), 1).toISOString())} frem til og med{' '}
                    {prettyPrintDato(sisteArbeidsdagDato!)}.
                </p>
                <p>Du kan lese mer om regelverket for permittering her</p>
            </ReadMore>
        </>
    );
};
const TILBAKE_TIL_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { forsteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
            {prettyPrintDato(plussDager(new Date(forsteArbeidsdagDato!), -1).toISOString())}.
        </>
    );
};

const NY_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
            {prettyPrintDato(sisteArbeidsdagDato!)}.
        </>
    );
};

const KONKURS = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
            {prettyPrintDato(sisteArbeidsdagDato!)}.
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    return <>Du må fortsette å sende inn meldekort i perioden du er midlertidig i arbeid.</>;
};

const ENDRET_PERMITTERINGSPROSENT = (props: VeiledningsProps) => {
    return <>Du må fortsette å sende meldekort hver 14. dag.</>;
};
const SAGT_OPP = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { oppsigelseDato } = tilleggsData;

    return (
        <>
            Frem til {prettyPrintDato(oppsigelseDato!)} kan du få utbetalt dagpenger som permittert.
            <br />
            Det er derfor viktig at du fortsetter å sende inn meldekortene frem til og med perioden som dekker{' '}
            {prettyPrintDato(oppsigelseDato!)}.
        </>
    );
};
function MeldekortInfo(props: VeiledningsProps) {
    const { valgtSituasjon } = props;

    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE {...props} />;
    } else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
        return <TILBAKE_TIL_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.KONKURS) {
        return <KONKURS {...props} />;
    } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
        return <NY_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
        return <ENDRET_PERMITTERINGSPROSENT {...props} />;
    } else if (valgtSituasjon === PermittertSvar.SAGT_OPP) {
        return <SAGT_OPP {...props} />;
    }
    return null;
}
export default MeldekortInfo;
