import { Link, ReadMore } from '@navikt/ds-react';

import { VeiledningsProps } from './veiledning';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { plussDager } from '../../utils/date-utils';
import { PermittertSvar } from '../../models/endring-av-situasjon';

const OPPSIGELSE = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Du bør sende inn <Link href={dagpengerSoknadLenke}>ny søknad om ordinære dagpenger</Link> mellom{' '}
            {prettyPrintDato(plussDager(new Date(oppsigelseDato!), -7).toISOString())} og{' '}
            {prettyPrintDato(sisteArbeidsdagDato!)}.
            <ReadMore header={'Hva baserer vi denne veiledningen på?'}>
                <p>Du har oppgitt at siste dag med lønn fra arbeidsgiver er {prettyPrintDato(sisteArbeidsdagDato!)}.</p>
                <p>
                    Du kan tidligst kan få dagpenger fra den dagen du sender inn en ny søknad om ordinære dagpenger,
                    <br />
                    og du kan tidligst sende inn søknad 7 dager før datoen du søker om å få dagpenger fra.
                </p>
                <p>Reglene er sånn at du ikke kan få utbetalt dagpenger for datoer før du har sendt inn søknaden.</p>
                <p>Du kan lese mer om regelverket for dagpenger her.</p>
            </ReadMore>
        </>
    );
};

const NY_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            Du vil kunne motta dagpenger i oppsigelsesperioden.
            <br />
            Oppsigelsestid når du er permittert er 14 dager.
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return <>Dagpengeutbetalingene vil avhenge av hvor mye du jobber og lønnen i den midlertidige jobben.</>;
};

const KONKURS = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Du kan <Link href={dagpengerSoknadLenke}>søke om dagpenger som forskudd på lønnsgaranti</Link>, mellom{' '}
            {prettyPrintDato(plussDager(new Date(sisteArbeidsdagDato!), -7).toISOString())} og{' '}
            {prettyPrintDato(sisteArbeidsdagDato!)}
        </>
    );
};

function DagpengerInfo(props: VeiledningsProps) {
    const { valgtSituasjon } = props;

    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE {...props} />;
    } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
        return <MIDLERTIDIG_JOBB {...props} />;
    } else if (valgtSituasjon === PermittertSvar.KONKURS) {
        return <KONKURS {...props} />;
    } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
        return <NY_JOBB {...props} />;
    }
    return null;
}
export default DagpengerInfo;
