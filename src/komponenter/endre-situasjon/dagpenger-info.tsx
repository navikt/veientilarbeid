import { VeiledningsProps } from './veiledning';
import { PermittertSvar } from './permittert-modal';
import { Link, ReadMore } from '@navikt/ds-react';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { plussDager } from '../../utils/date-utils';

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
function DagpengerInfo(props: VeiledningsProps) {
    const { valgtSituasjon } = props;

    if (valgtSituasjon === PermittertSvar.OPPSIGELSE) {
        return <OPPSIGELSE {...props} />;
    }
    // else if (valgtSituasjon === PermittertSvar.TILBAKE_TIL_JOBB) {
    //     return <TILBAKE_TIL_JOBB {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.MIDLERTIDIG_JOBB) {
    //     return <MIDLERTIDIG_JOBB {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.KONKURS) {
    //     return <KONKURS {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.NY_JOBB) {
    //     return <NY_JOBB {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.ENDRET_PERMITTERINGSPROSENT) {
    //     return <ENDRET_PERMITTERINGSPROSENT {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.ANNET) {
    //     return <ANNET {...props} />;
    // } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
    //     return <UAVKLART {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.MISTET_JOBBEN) {
    //     return <MISTET_JOBBEN {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.HAR_SAGT_OPP) {
    //     return <HAR_SAGT_OPP {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.DELTIDSJOBB_VIL_MER) {
    //     return <DELTIDSJOBB_VIL_MER {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.ALDRI_HATT_JOBB) {
    //     return <ALDRI_HATT_JOBB {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.VIL_BYTTE_JOBB) {
    //     return <VIL_BYTTE_JOBB {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.JOBB_OVER_2_AAR) {
    //     return <JOBB_OVER_2_AAR {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.ER_PERMITTERT) {
    //     return <ER_PERMITTERT {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.USIKKER_JOBBSITUASJON) {
    //     return <USIKKER_JOBBSITUASJON {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING) {
    //     return <AKKURAT_FULLFORT_UTDANNING {...props} />;
    // } else if (valgtSituasjon === DinSituasjonSvar.VIL_FORTSETTE_I_JOBB) {
    //     return <VIL_FORTSETTE_I_JOBB {...props} />;
    // } else {
    //     return <ANNET {...props} />;
    // }
    return null;
}
export default DagpengerInfo;
