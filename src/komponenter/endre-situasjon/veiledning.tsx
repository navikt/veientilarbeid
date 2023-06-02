import { BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { DinSituasjonSvar, PermittertSvar } from './permittert-modal';

import { dokumentasjon_url } from '../../url';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { plussDager } from '../../utils/date-utils';
import { dagpengerSoknadLenke } from '../../innhold/lenker';

import spacing from '../../spacing.module.css';

export interface VeiledningsProps {
    valgtSituasjon: PermittertSvar | DinSituasjonSvar;
    tilleggsData?: any;
}

const OPPSIGELSE = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { oppsigelseDato, sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>

            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må laste opp oppsigelsen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Frem til {prettyPrintDato(sisteArbeidsdagDato!)} kan du få utbetalt dagpenger som permittert.
                <br />
                Det er derfor viktig at du fortsetter å sende inn meldekortene frem til og med perioden som dekker{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}.
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
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                Du bør sende inn <Link href={dagpengerSoknadLenke}>ny søknad om ordinære dagpenger</Link> mellom{' '}
                {prettyPrintDato(plussDager(new Date(oppsigelseDato!), -7).toISOString())} og{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}.
                <ReadMore header={'Hva baserer vi dette på?'}>
                    <p>
                        Du har oppgitt at siste dag med lønn fra arbeidsgiver er {prettyPrintDato(sisteArbeidsdagDato!)}
                        .
                    </p>
                    <p>
                        Du kan tidligst kan få dagpenger fra den dagen du sender inn en ny søknad om ordinære dagpenger,
                        <br />
                        og du kan tidligst sende inn søknad 7 dager før datoen du søker om å få dagpenger fra.
                    </p>
                    <p>
                        Reglene er sånn at du ikke kan få utbetalt dagpenger for datoer før du har sendt inn søknaden.
                    </p>
                    <p>Du kan lese mer om regelverket for dagpenger her.</p>
                </ReadMore>
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV, kan du svare nei på det siste spørsmålet
                i meldekortet.
                <br />
                Før du søker dagpenger på nytt, må du huske å registrere deg igjen.
            </p>
        </>
    );
};

const ENDRET_PERMITTERINGSPROSENT = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss det nye permitteringsvarselet</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Du må fortsette å sende meldekort hver 14. dag.
            </p>
        </>
    );
};

const TILBAKE_TIL_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { forsteArbeidsdagDato } = tilleggsData;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
                {prettyPrintDato(plussDager(new Date(forsteArbeidsdagDato!), -1).toISOString())}.
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV etter å ha sendt inn det siste
                meldekortet, kan du svare nei på det siste spørsmålet i meldekortet.
            </p>
        </>
    );
};

const NY_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}.
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                Du vil kunne motta dagpenger i oppsigelsesperioden.
                <br />
                Oppsigelsestid når du er permittert er 14 dager.
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Om du ikke lenger vil være registrert som arbeidssøker hos NAV etter å ha sendt inn det siste
                meldekortet, kan du svare nei på det siste spørsmålet i meldekortet.
            </p>
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss den nye arbeidsavtalen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Du må fortsette å sende inn meldekort i perioden du er midlertidig i arbeid.
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                Dagpengeutbetalingene vil avhenge av hvor mye du jobber og lønnen i den midlertidige jobben.
            </p>
            <p>Gi oss beskjed om noe endrer seg.</p>
        </>
    );
};

const KONKURS = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { sisteArbeidsdagDato } = tilleggsData;

    return (
        <>
            <h2>Hva betyr dette for meg?</h2>
            <p>
                <h4 className={spacing.mbn}>Dokumentasjon</h4>
                <Link href={dokumentasjon_url}>Du må sende oss meldingen om konkursen</Link>
            </p>
            <p>
                <h4 className={spacing.mbn}>Meldekort</h4>
                Du må levere meldekort frem til og med meldekortet som rapporterer for{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}.
            </p>
            <p>
                <h4 className={spacing.mbn}>Dagpenger</h4>
                Du kan <Link href={dagpengerSoknadLenke}>søke om dagpenger som forskudd på lønnsgaranti</Link>, mellom{' '}
                {prettyPrintDato(plussDager(new Date(sisteArbeidsdagDato!), -7).toISOString())} og{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}
            </p>
            <p>
                Dersom du ønsker dagpenger etter forskuddet må du krysse av for at du også søker dagpenger for etter
                lønnsgarantiperioden er over, så slipper du to dagpengesøknader.
            </p>
            <p>
                <h4 className={spacing.mbn}>Arbeidssøkerregistrering</h4>
                Dersom du fortsatt ønsker å stå registrert som arbeidssøker må du fortsette å sende inn meldekort.
            </p>
        </>
    );
};

const UAVKLART = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const ANNET = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const MISTET_JOBBEN = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const HAR_SAGT_OPP = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const DELTIDSJOBB_VIL_MER = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const ALDRI_HATT_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const VIL_BYTTE_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const JOBB_OVER_2_AAR = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const ER_PERMITTERT = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const USIKKER_JOBBSITUASJON = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const AKKURAT_FULLFORT_UTDANNING = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const VIL_FORTSETTE_I_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const Veiledning = (props: VeiledningsProps) => {
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
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
        return <UAVKLART {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.MISTET_JOBBEN) {
        return <MISTET_JOBBEN {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.HAR_SAGT_OPP) {
        return <HAR_SAGT_OPP {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.DELTIDSJOBB_VIL_MER) {
        return <DELTIDSJOBB_VIL_MER {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.ALDRI_HATT_JOBB) {
        return <ALDRI_HATT_JOBB {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.VIL_BYTTE_JOBB) {
        return <VIL_BYTTE_JOBB {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.JOBB_OVER_2_AAR) {
        return <JOBB_OVER_2_AAR {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.ER_PERMITTERT) {
        return <ER_PERMITTERT {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.USIKKER_JOBBSITUASJON) {
        return <USIKKER_JOBBSITUASJON {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.AKKURAT_FULLFORT_UTDANNING) {
        return <AKKURAT_FULLFORT_UTDANNING {...props} />;
    } else if (valgtSituasjon === DinSituasjonSvar.VIL_FORTSETTE_I_JOBB) {
        return <VIL_FORTSETTE_I_JOBB {...props} />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Veiledning;
