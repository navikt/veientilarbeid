import { PermittertSvar } from './permittert-modal';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { Alert, ReadMore } from '@navikt/ds-react';
import { plussDager } from '../../utils/date-utils';

interface MeldekortInfoProps {
    valgtSituasjon?: string;
    tilleggsData?: any;
    visDropdown: boolean;
}
const OPPSIGELSE = (props: MeldekortInfoProps) => {
    const { tilleggsData, visDropdown } = props;

    if (!tilleggsData) return null;

    const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            Frem til {prettyPrintDato(sisteArbeidsdagDato!)} kan du få utbetalt dagpenger som permittert.
            <br />
            Det er derfor viktig at du fortsetter å sende inn meldekortene frem til og med perioden som dekker{' '}
            {prettyPrintDato(sisteArbeidsdagDato!)}.
            {visDropdown && (
                <ReadMore header={'Hva baserer vi dette på?'}>
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
            )}
        </>
    );
};

const hentKomponent = (props: MeldekortInfoProps) => {
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
};
function MeldekortInfo(props: MeldekortInfoProps) {
    return hentKomponent(props);
}

export function MeldekortInfoAlert(props: MeldekortInfoProps) {
    const infoKomponent = hentKomponent(props);

    if (!infoKomponent) {
        return null;
    }

    return <Alert variant={'info'}>{infoKomponent}</Alert>;
}
export default MeldekortInfo;
