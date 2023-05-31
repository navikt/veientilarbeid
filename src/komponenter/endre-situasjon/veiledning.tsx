import { BodyShort, Link, ReadMore } from '@navikt/ds-react';

import { DinSituasjonSvar, PermittertSvar } from './permittert-modal';

import spacing from '../../spacing.module.css';
import { dokumentasjon_url, mine_dagpenger_url } from '../../url';
import prettyPrintDato from '../../utils/pretty-print-dato';
import { plussDager } from '../../utils/date-utils';
import { dagpengerSoknadLenke } from '../../innhold/lenker';

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
            <p>Basert på det du har oppgitt:</p>
            <p>
                Du må sende oss det nye permitteringsvarselet. Måten du gjør det på er å laste opp dokumentet via{' '}
                <Link href={mine_dagpenger_url}>mine dagpenger</Link>.
            </p>
            <p>Du må fortsette å sende meldekort i permitteringsperioden.</p>
        </>
    );
};

const TILBAKE_TIL_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    const { forsteArbeidsdagDato } = tilleggsData;

    return (
        <>
            <p>Basert på det du har oppgitt:</p>
            <p>
                Du må sende inn meldekort frem til og med meldekortet som ‘dekker’{' '}
                {prettyPrintDato(plussDager(new Date(forsteArbeidsdagDato!), -1).toISOString())} (siste dag som
                permittert).
            </p>
            <p>
                Om du ikke lenger ønsker å være registrert arbeidssøker kan du svare "nei" til spm 5 på det siste
                aktuelle meldekortet.
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
            <p>Basert på det du har oppgitt:</p>
            <p>
                Du må sende inn meldekort frem til og med meldekortet som ‘dekker’{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)} (siste arbeidsdag i nåværende jobb).
            </p>
            <p>Oppsigelsestid når du er permittert er 14 dager.</p>
            <p>
                Om du ikke lenger ønsker å være registrert arbeidssøker kan du svare "nei" til spm 5 på det siste
                aktuelle meldekortet.
            </p>
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    const { tilleggsData } = props;

    if (!tilleggsData) return null;

    return (
        <>
            <p>Basert på det du har oppgitt:</p>
            <p>Du må fortsette å sende inn meldekort i perioden du er midlertidig i arbeid.</p>
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
            <p>Basert på det du har oppgitt:</p>
            <p>
                Du må dokumentere konkursen. Måten du gjør det på er å laste opp dokumentet via{' '}
                <Link href={mine_dagpenger_url}>mine dagpenger</Link>.
            </p>
            <p>
                Du må sende inn meldekort frem til og med meldekortet som ‘dekker’{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)} (siste arbeidsdag).
            </p>
            <p>
                Dersom du fortsatt ønsker å stå registrert som arbeidssøker må du fortsette å sende inn meldekort også
                etter dette.
            </p>
            <p>
                Dersom du vil <Link href={dagpengerSoknadLenke}>søke om dagpenger som forskudd på lønnsgaranti</Link>,
                bør du sende den mellom {prettyPrintDato(plussDager(new Date(sisteArbeidsdagDato!), -7).toISOString())}{' '}
                og {prettyPrintDato(sisteArbeidsdagDato!)}
            </p>
            <p>
                Dersom du ønsker dagpenger etter forskuddet må du krysse av for at du også søker dagpenger for etter
                lønnsgarantiperioden er over, så slipper du to dagpengesøknader.
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
    } else {
        return <ANNET {...props} />;
    }
};

export default Veiledning;
