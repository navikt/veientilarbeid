import { BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';

import { useDpInnsynPaabegynteSoknaderData } from '../../contexts/dp-innsyn-paabegynte-soknader';
import { useSprakValg } from '../../contexts/sprak';

import { beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import { datoMedUkedag, plussDager } from '../../utils/date-utils';
import { hentIDag } from '../../utils/chrono';
import beregnDagpengeStatus, { DagpengeStatus } from '../../lib/beregn-dagpenge-status';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';
import { useSWRImmutable } from '../../hooks/useSWR';
import { DP_INNSYN_URL } from '../../ducks/api';
import { DpInnsynSoknad, Vedtak } from '../../models/dagpenger';
import { useBrukerInfoData } from '../../hooks/use-brukerinfo-data';
import { useBrukerregistreringData } from '../../hooks/use-brukerregistrering-data';
// TODO - oversette alle tekster til engelsk
const TEKSTER = {
    nb: {
        sisteFrist: 'Siste frist for innsending av meldekortet er i kveld klokken 23.00',
        duHar: 'Du har',
        dager: 'dager',
        dag: 'dag',
        sendeInn: 'på å sende inn meldekortet',
        fristenEr: 'Siste frist er',
        klokken23: 'klokken 23.00.',
        mottar: 'utbetaling av dagpenger stoppes',
        sokt: 'din søknad om dagpenger kan bli avslått',
        fortSomMulig: 'Du bør sende inn meldekortet så fort som mulig',
        default: 'en eventuell søknad om dagpenger kan bli avslått',
        advarselLabel: 'Dersom du ikke sender inn meldekort vil',
        advarselBeskrivelse: 'du ikke lenger være registrert som arbeidssøker',
        advarselTrekk:
            'Dersom du sender inn meldekortet etter fristen vil du få trekk i utbetalingen av dagpenger for neste meldekort',
        avregistrertEtter20Dager:
            'Venter du med å sende inn i mer enn 20 dager etter forrige innsendte meldekort, vil du ikke lenger være registrert som arbeidssøker',
        fristErForbiTittel: 'Fristen for innsending av meldekortet har gått ut',
        fristErForbiDagpenger: 'Sender du inn meldekortet nå vil du få trekk i utbetalinger for neste meldekort',
        fristForbiDagpengerFortsett:
            'Har du fortsatt ønske om å motta dagpenger må du likevel sende inn de neste meldekortene',
        fristForbiDagpengerIkkeRegistrert:
            'Når du ikke lenger er registrert som arbeidssøker vil dagpengene dine stoppes helt',
        fristForbiRegistrert: 'Sender du inn meldekortet nå vil du fortsatt være registrert som arbeidssøker',
        fristForbiSoktIkkeRegistrert:
            'Konsekvensen av å ikke være registrert som arbeidssøker vil være at du kan få avslag på søknaden om dagpenger',
    },
    en: {
        sisteFrist: 'The deadline for submitting the employment status form is tonight at 23:00',
        duHar: 'You have',
        dager: 'days',
        dag: 'day',
        sendeInn: 'to submit the employment status form.',
        fristenEr: 'The deadline is',
        klokken23: 'at 23:00.',
        mottar: 'payment of unemployment benefits stops',
        sokt: 'Your application of unemployment benefits may be declined',
        fortSomMulig: 'Du bør sende inn meldekortet så fort som mulig',
        default: 'Any application of unemployment benefits may be declined',
        advarselLabel: 'If you do not submit the employment status form',
        advarselTrekk:
            'Dersom du sender inn meldekortet etter fristen vil du få trekk i utbetalingen av dagpenger for neste meldekort',
        advarselBeskrivelse: 'you will no longer be registered as a job seeker',
        avregistrertEtter20Dager:
            'Venter du med å sende inn meldekortet i mer enn 20 dager etter forrige innsendte meldekort, vil du ikke lenger være registrert som arbeidssøker',
        fristErForbiTittel: 'Fristen for innsending av meldekortet har gått ut',
        fristErForbiDagpenger: 'Sender du inn meldekortet nå vil du få trekk i utbetalinger for neste meldekort',
        fristForbiDagpengerFortsett:
            'Har du fortsatt ønske om å motta dagpenger må du likevel sende inn de neste meldekortene',
        fristForbiDagpengerIkkeRegistrert:
            'Når du ikke lenger er registrert som arbeidssøker vil dagpengene dine stoppes helt',
        fristForbiRegistrert: 'Sender du inn meldekortet nå vil du fortsatt være registrert som arbeidssøker',
        fristForbiSoktIkkeRegistrert:
            'Konsekvensen av å ikke være registrert som arbeidssøker kan være at du får avslag på søknaden om dagpenger',
    },
};

function MeldekortAdvarsel({ dagerEtterFastsattMeldedag }: { dagerEtterFastsattMeldedag: number | null }) {
    const brukerInfoData = useBrukerInfoData();
    const { rettighetsgruppe } = brukerInfoData;
    const registreringData = useBrukerregistreringData();
    const { paabegynteSoknader = [] } = useDpInnsynPaabegynteSoknaderData();
    const { data: innsendteSoknader = [] } = useSWRImmutable<DpInnsynSoknad[]>(`${DP_INNSYN_URL}/soknad`);
    const { data: dagpengeVedtak = [] } = useSWRImmutable<Vedtak[]>(`${DP_INNSYN_URL}/vedtak`);
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData);

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
        arbeidssokerperioder,
    });

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    if (dagerEtterFastsattMeldedag === null) return null;

    const dagerTilTrekk = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);

    // Viser strenger melding fra dag 3 (torsdag)
    const tillegg =
        dagerEtterFastsattMeldedag > 2 ? (
            <LittStrengereVarsel
                rettighetsgruppe={rettighetsgruppe}
                dagpengeStatus={dagpengeStatus}
                dagerEtterFastsattMeldedag={dagerEtterFastsattMeldedag}
            />
        ) : null;
    const iDag = hentIDag();
    const trekkDato = plussDager(iDag, dagerTilTrekk);

    // Nå er vi på overtid, det er for sent å rekke fristen
    if (dagerTilTrekk < 0) {
        return <ForSentVarsel rettighetsgruppe={rettighetsgruppe} dagpengeStatus={dagpengeStatus} />;
    }

    return (
        <>
            {dagerTilTrekk === 0 ? (
                <Heading size="small" className={spacingStyles.blokkXs}>
                    {tekst('sisteFrist')}
                </Heading>
            ) : (
                <>
                    <Heading size="small" className={spacingStyles.blokkXs}>
                        {tekst('duHar')} {dagerTilTrekk}{' '}
                        {dagerTilTrekk === 0 || dagerTilTrekk > 1 ? tekst('dager') : tekst('dag')} {tekst('sendeInn')}
                    </Heading>
                    <BodyShort className={spacingStyles.blokkXs}>
                        {tekst('fristenEr')} {datoMedUkedag(trekkDato, sprak)}, {tekst('klokken23')}
                    </BodyShort>
                    {dagerEtterFastsattMeldedag && dagerEtterFastsattMeldedag < 3 && (
                        <BodyLong>{tekst('fortSomMulig')}</BodyLong>
                    )}
                </>
            )}
            {tillegg}
        </>
    );
}

const LittStrengereVarsel = ({
    rettighetsgruppe,
    dagpengeStatus,
    dagerEtterFastsattMeldedag,
}: {
    rettighetsgruppe: string;
    dagpengeStatus: DagpengeStatus;
    dagerEtterFastsattMeldedag: number | null;
}) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const mottarDagpenger = rettighetsgruppe === 'DAGP';
    const harSoktDagpenger = dagpengeStatus === 'sokt';

    return (
        <>
            {mottarDagpenger && <BodyLong>{tekst('advarselTrekk')}</BodyLong>}
            {dagerEtterFastsattMeldedag && dagerEtterFastsattMeldedag === 3 && (
                <BodyLong>{tekst('fortSomMulig')}</BodyLong>
            )}
            {dagerEtterFastsattMeldedag && dagerEtterFastsattMeldedag > 3 && (
                <BodyLong>{tekst('avregistrertEtter20Dager')}</BodyLong>
            )}
            {dagerEtterFastsattMeldedag && dagerEtterFastsattMeldedag > 3 && harSoktDagpenger && (
                <BodyLong>{tekst('fristForbiSoktIkkeRegistrert')}</BodyLong>
            )}
        </>
    );
};

const ForSentVarsel = ({
    rettighetsgruppe,
    dagpengeStatus,
}: {
    rettighetsgruppe: string;
    dagpengeStatus: DagpengeStatus;
}) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const mottarDagpenger = rettighetsgruppe === 'DAGP';
    const soktDagpenger = dagpengeStatus === 'sokt';

    return (
        <>
            <Heading size="small" className={spacingStyles.blokkXs}>
                {tekst('fristErForbiTittel')}
            </Heading>
            {mottarDagpenger && (
                <>
                    <BodyLong className={spacingStyles.blokkXs}>{tekst('fristErForbiDagpenger')}</BodyLong>
                    <BodyLong className={spacingStyles.blokkXs}>{tekst('fristForbiDagpengerFortsett')}</BodyLong>
                </>
            )}
            {!mottarDagpenger && <BodyLong>{tekst('fristForbiRegistrert')}</BodyLong>}
            <BodyLong>{tekst('avregistrertEtter20Dager')}</BodyLong>
            {mottarDagpenger && (
                <BodyLong className={spacingStyles.mt1}>{tekst('fristForbiDagpengerIkkeRegistrert')}</BodyLong>
            )}
            {soktDagpenger && <BodyLong>{tekst('fristForbiSoktIkkeRegistrert')}</BodyLong>}
        </>
    );
};

export default MeldekortAdvarsel;
