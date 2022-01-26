import { Heading, BodyShort, Label } from '@navikt/ds-react';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import { datoMedUkedag, plussDager } from '../../utils/date-utils';
import { hentIDag } from '../../utils/chrono';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import beregnDagpengeStatus, { DagpengeStatus } from '../../lib/beregn-dagpenge-status';
import { usePaabegynteSoknaderData } from '../../contexts/paabegynte-soknader';
import { useDpInnsynSoknadData } from '../../contexts/dp-innsyn-soknad';
import { useDpInnsynVedtakData } from '../../contexts/dp-innsyn-vedtak';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        sisteFrist: 'Siste frist for innsending av meldekortet er i kveld klokken 23.00',
        duHar: 'Du har',
        dager: 'dager',
        dag: 'dag',
        sendeInn: 'på å sende inn meldekort.',
        fristenEr: 'Fristen er',
        klokken23: 'klokken 23.00.',
        mottar: 'utbetaling av dagpenger stoppes',
        sokt: 'din søknad om dagpenger kan bli avslått',
        default: 'en eventuell søknad om dagpenger kan bli avslått',
        advarselLabel: 'Dersom du ikke sender inn meldekort vil',
        advarselBeskrivelse: 'du ikke lenger være registrert som arbeidssøker',
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
        default: 'Any application of unemployment benefits may be declined',
        advarselLabel: 'If you do not submit the employment status form',
        advarselBeskrivelse: 'you will no longer be registered as a job seeker',
    },
};

function MeldekortAdvarsel({ dagerEtterFastsattMeldedag }: { dagerEtterFastsattMeldedag: number | null }) {
    const { rettighetsgruppe } = useBrukerinfoData();

    const brukerInfoData = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const paabegynteSoknader = usePaabegynteSoknaderData().soknader;
    const innsendteSoknader = useDpInnsynSoknadData();
    const dagpengeVedtak = useDpInnsynVedtakData();

    const dagpengeStatus = beregnDagpengeStatus({
        brukerInfoData,
        registreringData,
        paabegynteSoknader,
        innsendteSoknader,
        dagpengeVedtak,
    });

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);
    if (dagerEtterFastsattMeldedag === null) return null;

    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);
    // Viser strenger melding fra dag 3 (torsdag)
    const tillegg =
        dagerEtterFastsattMeldedag > 2 ? (
            <LittStrengereVarsel rettighetsgruppe={rettighetsgruppe} dagpengeStatus={dagpengeStatus} />
        ) : null;
    const iDag = hentIDag();
    const inaktiveringsDato = plussDager(iDag, dagerTilInaktivering);

    return (
        <>
            {dagerTilInaktivering <= 0 ? (
                <Heading size="medium">{tekst('sisteFrist')}</Heading>
            ) : (
                <>
                    <Heading size="medium" className={'blokk-xs'}>
                        {tekst('duHar')} {dagerTilInaktivering}{' '}
                        {dagerTilInaktivering === 0 || dagerTilInaktivering > 1 ? tekst('dager') : tekst('dag')}{' '}
                        {tekst('sendeInn')}
                    </Heading>
                    <BodyShort>
                        {tekst('fristenEr')} {datoMedUkedag(inaktiveringsDato, sprak)}, {tekst('klokken23')}
                    </BodyShort>
                </>
            )}
            {tillegg}
        </>
    );
}

const LittStrengereVarsel = ({
    rettighetsgruppe,
    dagpengeStatus,
}: {
    rettighetsgruppe: string;
    dagpengeStatus: DagpengeStatus;
}) => {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const dagpengerKonsekvensMelding = (() => {
        switch (dagpengeStatus) {
            case 'mottar':
                return tekst('mottar');
            case 'sokt':
            case 'paabegynt':
                return tekst('sokt');
            default:
                return tekst('default');
        }
    })();

    return (
        <div className={'strenger-varsel'}>
            <Label>{tekst('advarselLabel')}</Label>
            <ul className={'konsekvenser'}>
                <li>
                    <BodyShort>{tekst('advarselBeskrivelse')}</BodyShort>
                </li>
                {['DAGP', 'IYT'].includes(rettighetsgruppe) && (
                    <li>
                        <BodyShort>{dagpengerKonsekvensMelding}</BodyShort>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MeldekortAdvarsel;
