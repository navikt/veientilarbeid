import React from 'react';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { beregnDagerTilInaktivering } from '../../utils/meldekort-utils';
import { datoMedUkedag, plussDager } from '../../utils/date-utils';
import { hentIDag } from '../../utils/chrono';
import * as PaabegynteSoknader from '../../ducks/paabegynte-soknader';
import beregnDagpengerStatus, { DagpengerSokestatuser } from '../dagpenger-status/beregn-dagpenger-status';
import * as Sakstema from '../../ducks/sakstema';
import * as Brukerregistrering from '../../ducks/brukerregistrering';

function MeldekortAdvarsel({ dagerEtterFastsattMeldedag }: { dagerEtterFastsattMeldedag: number | null }) {
    const { rettighetsgruppe } = React.useContext(BrukerInfoContext).data;
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: paabegynteSoknaderData } = React.useContext(PaabegynteSoknader.PaabegynteSoknaderContext);
    const { data: sakstemaData } = React.useContext(Sakstema.SakstemaContext);

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
                <Systemtittel>Siste frist for innsending av meldekortet er i kveld klokken 23.00</Systemtittel>
            ) : (
                <>
                    <Systemtittel className={'blokk-xs'}>
                        Du har{' '}
                        <b>
                            {dagerTilInaktivering}{' '}
                            {dagerTilInaktivering === 0 || dagerTilInaktivering > 1 ? 'dager' : 'dag'}{' '}
                        </b>
                        på å sende inn meldekort.
                    </Systemtittel>
                    <Normaltekst>Fristen er {datoMedUkedag(inaktiveringsDato)}, klokken 23.00.</Normaltekst>
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
            <Element>Dersom du ikke sender inn meldekort vil</Element>
            <ul className={'konsekvenser'}>
                <li>
                    <Normaltekst>du ikke lenger være registrert som arbeidssøker</Normaltekst>
                </li>
                {['DAGP', 'IYT'].includes(rettighetsgruppe) && (
                    <li>
                        <Normaltekst>{dagpengerKonsekvensMelding}</Normaltekst>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default MeldekortAdvarsel;
