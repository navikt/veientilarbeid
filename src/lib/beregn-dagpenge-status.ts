/*
  avhengigheter:
 - når registrert => dato "" fra registreringsData
 - har påbegynte søknader => []
 - har innsendte søknader => []
 - har dagpengevedtak => []
 - rettighetsgruppe => "" fra brukerInfo
 - meldegruppe => fra meldekort []
 */
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as BrukerInfo from '../contexts/bruker-info';
import { DpInnsynSoknad } from '../contexts/dp-innsyn-soknad';
import { Vedtak } from '../contexts/dp-innsyn-vedtak';
import { Soknad } from '../contexts/paabegynte-soknader';
import { Meldekort } from '../contexts/meldekort';

export type DagpengeStatus = 'paabegynt' | 'sokt' | 'mottar' | 'reaktivert' | 'ukjent';
function beregnDagpengeStatus({
    brukerInfoData,
    registreringData,
    paabegynteSoknader,
    innsendteSoknader,
    dagpengeVedtak,
    meldekort,
}: {
    brukerInfoData: BrukerInfo.Data;
    registreringData: Brukerregistrering.Data | null;
    paabegynteSoknader: Soknad[];
    innsendteSoknader: DpInnsynSoknad[];
    dagpengeVedtak: Vedtak[];
    meldekort: Meldekort[];
}): DagpengeStatus {
    const { rettighetsgruppe } = brukerInfoData;

    if (rettighetsgruppe === 'DAGP') {
        return 'mottar';
    }

    if (!registreringData?.registrering?.opprettetDato) {
        return 'ukjent';
    }

    const registreringsDato = new Date(registreringData?.registrering!.opprettetDato);

    const paabegynteSoknaderEtterRegistreringsDato = paabegynteSoknader.filter(
        (soknad) => new Date(soknad.datoInnsendt!).getTime() > registreringsDato.getTime()
    );

    if (paabegynteSoknaderEtterRegistreringsDato.length > 0) {
        return 'paabegynt';
    }

    /*
     *  hvis påbegynt etter registreringsdato OG ingen innsendte =>  returner påbegynt
     *
     *  hvis påbegynt etter registreringsdato OG ingen innsendte ETTER registreringsdato  => returner påbegynt
     *
     *  hvis innsendt etter registreringsdato OG ikke vedtak => returner sokt
     *
     *  hvis innsendt etter registreringsdato OG ingen vedtak etter registreringsdato => returner sokt
     *
     *  hvis vedtak etter r-dato OG vedtaket er nyere enn sist innsendte søknad =>
     * */
    return 'ukjent';
}

export default beregnDagpengeStatus;
