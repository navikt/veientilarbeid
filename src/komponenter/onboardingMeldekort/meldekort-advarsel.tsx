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
                <Heading size="medium">Siste frist for innsending av meldekortet er i kveld klokken 23.00</Heading>
            ) : (
                <>
                    <Heading size="medium" className={'blokk-xs'}>
                        Du har {dagerTilInaktivering}{' '}
                        {dagerTilInaktivering === 0 || dagerTilInaktivering > 1 ? 'dager' : 'dag'} på å sende inn
                        meldekort.
                    </Heading>
                    <BodyShort size="small">Fristen er {datoMedUkedag(inaktiveringsDato)}, klokken 23.00.</BodyShort>
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
    const dagpengerKonsekvensMelding = (() => {
        switch (dagpengeStatus) {
            case 'mottar':
                return 'utbetaling av dagpenger stoppes';
            case 'sokt':
            case 'paabegynt':
                return 'din søknad om dagpenger kan bli avslått';
            default:
                return 'en eventuell søknad om dagpenger kan bli avslått';
        }
    })();

    return (
        <div className={'strenger-varsel'}>
            <Label size="small">Dersom du ikke sender inn meldekort vil</Label>
            <ul className={'konsekvenser'}>
                <li>
                    <BodyShort size="small">du ikke lenger være registrert som arbeidssøker</BodyShort>
                </li>
                {['DAGP', 'IYT'].includes(rettighetsgruppe) && (
                    <li>
                        <BodyShort size="small">{dagpengerKonsekvensMelding}</BodyShort>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MeldekortAdvarsel;
