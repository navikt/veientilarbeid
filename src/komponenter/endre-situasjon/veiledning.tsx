import { BodyShort, Link } from '@navikt/ds-react';

import { DinSituasjonSvar, PermittertSvar } from './permittert-modal';

import spacing from '../../spacing.module.css';
import { mine_dagpenger_url } from '../../url';
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
            <p>Basert på det du har oppgitt:</p>
            <p>
                Du må dokumentere oppsigelsen. Måten du gjør det på er å laste opp dokumentet via{' '}
                <Link href={mine_dagpenger_url}>mine dagpenger</Link>.
            </p>
            <p>
                Du må sende inn meldekort frem til og med meldekortet som ‘dekker’ {prettyPrintDato(oppsigelseDato!)}{' '}
                (dagen du mottok oppsigelsen).
                <br />
                Siste dagen du får dagpenger som permittert er frem til og med dagen du fikk beskjeden – altså{' '}
                {prettyPrintDato(oppsigelseDato!)}.
                <br />
                Frem til {prettyPrintDato(oppsigelseDato!)} får du utbetalt dagpenger som permittert.
                <br />
                Arbeidsgiveren din har ansvaret for å betal lønn fra{' '}
                {prettyPrintDato(plussDager(new Date(oppsigelseDato!), 1).toISOString())} frem til{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)}. Lenke til permitteringsregelverk?
            </p>
            <p>
                Du bør sende inn <Link href={dagpengerSoknadLenke}>ny søknad om ordinære dagpenger</Link> mellom{' '}
                {prettyPrintDato(plussDager(new Date(oppsigelseDato!), -7).toISOString())} og{' '}
                {prettyPrintDato(sisteArbeidsdagDato!)} – da du tidligst kan få dagpenger fra den dagen du sender inn
                søknaden.
            </p>
            <p>
                Du kan svare ‘nei’ på det femtespørsmålet på ‘det siste aktuelle meldekortet’ du skal sende inn (for
                perioden X til Y/lenke til?).
                <br />
                Da er det viktig at du registrere deg på nytt før du evnt. sender inn ny søknad om ordinære dagpenger.
            </p>
        </>
    );
};

const ENDRET = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const TILBAKE_TIL_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const NY_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const MIDLERTIDIG_JOBB = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
        </>
    );
};

const KONKURS = (props: VeiledningsProps) => {
    return (
        <>
            <BodyShort className={spacing.mb1}>Veiledning for {props.valgtSituasjon}</BodyShort>
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
        return <ENDRET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.ANNET) {
        return <ANNET {...props} />;
    } else if (valgtSituasjon === PermittertSvar.UAVKLART) {
        return <UAVKLART {...props} />;
    } else {
        return <ANNET {...props} />;
    }
};

export default Veiledning;
