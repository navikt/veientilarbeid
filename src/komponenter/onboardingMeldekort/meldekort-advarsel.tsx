import { useContext } from 'react';
import { Heading, BodyShort, Label } from '@navikt/ds-react';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import { datoMedUkedag, plussDager } from '../../utils/date-utils';
import { hentIDag } from '../../utils/chrono';
import * as PaabegynteSoknader from '../../contexts/paabegynte-soknader';
import beregnDagpengerStatus, { DagpengerSokestatuser } from '../dagpenger-status/beregn-dagpenger-status';
import * as Sakstema from '../../contexts/sakstema';
import { useBrukerregistreringData } from '../../contexts/brukerregistrering';

function MeldekortAdvarsel({ dagerEtterFastsattMeldedag }: { dagerEtterFastsattMeldedag: number | null }) {
    const { rettighetsgruppe } = useBrukerinfoData();
    const registreringData = useBrukerregistreringData();
    const { data: paabegynteSoknaderData } = useContext(PaabegynteSoknader.PaabegynteSoknaderContext);
    const { data: sakstemaData } = useContext(Sakstema.SakstemaContext);

    const opprettetRegistreringDatoString = registreringData?.registrering?.opprettetDato;
    const opprettetRegistreringDato = opprettetRegistreringDatoString
        ? new Date(opprettetRegistreringDatoString)
        : null;

    const dagpengerSaksTema = sakstemaData.sakstema.find((tema) => tema.temakode === 'DAG');
    const behandlingskjeder = dagpengerSaksTema ? dagpengerSaksTema.behandlingskjeder : null;

    const dagpengerStatus = beregnDagpengerStatus({
        behandlingskjeder,
        opprettetRegistreringDato,
        paabegynteSoknader: paabegynteSoknaderData.soknader,
        rettighetsgruppe,
    });

    if (dagerEtterFastsattMeldedag === null) return null;

    const dagerTilInaktivering = beregnDagerTilInaktivering(dagerEtterFastsattMeldedag);
    // Viser strenger melding fra dag 3 (torsdag)
    const tillegg =
        dagerEtterFastsattMeldedag > 2 ? (
            <LittStrengereVarsel rettighetsgruppe={rettighetsgruppe} dagpengerStatus={dagpengerStatus} />
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
    dagpengerStatus,
}: {
    rettighetsgruppe: string;
    dagpengerStatus: DagpengerSokestatuser;
}) => {
    const dagpengerKonsekvensMelding = (() => {
        switch (dagpengerStatus) {
            case DagpengerSokestatuser.mottarDagpenger:
                return 'utbetaling av dagpenger stoppes';
            case DagpengerSokestatuser.soknadUnderBehandling:
            case DagpengerSokestatuser.harPaabegynteSoknader:
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
