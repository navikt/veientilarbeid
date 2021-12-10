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

export type DagpengeStatus = 'paabegynt' | 'sokt' | 'mottar' | 'reaktivert' | 'ukjent' | 'avslag';
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
    /*
     *  [x] hvis påbegynt etter registreringsdato OG ingen innsendte =>  returner påbegynt
     *
     *  [x] hvis påbegynt etter registreringsdato OG ingen innsendte ETTER registreringsdato  => returner påbegynt
     *
     *  [x] hvis innsendt etter registreringsdato OG ikke vedtak => returner sokt
     *
     *  [x] hvis innsendt etter registreringsdato OG ingen vedtak etter registreringsdato => returner sokt
     *
     *  [x] hvis vedtak etter r-dato OG vedtaket er nyere enn sist innsendte søknad  OG vedtaket er avslått => avslag
     *
     * */

    const { rettighetsgruppe } = brukerInfoData;

    if (rettighetsgruppe === 'DAGP') {
        return 'mottar';
    }

    if (!registreringData?.registrering?.opprettetDato) {
        return 'ukjent';
    }

    const registreringsDato = new Date(registreringData?.registrering!.opprettetDato);

    const innsendteSoknaderEtterRegistreringsDato = innsendteSoknader.filter(
        (soknad) => new Date(soknad.datoInnsendt).getTime() > registreringsDato.getTime()
    );

    const sorterEtterNyesteDatoInnsendt = (a: DpInnsynSoknad, b: DpInnsynSoknad) =>
        new Date(b.datoInnsendt).getTime() - new Date(a.datoInnsendt).getTime();
    const sistInnsendteSoknad = innsendteSoknaderEtterRegistreringsDato.sort(sorterEtterNyesteDatoInnsendt)[0];

    const vedtakEtterSistInnsendteSoknad = dagpengeVedtak.filter(
        (vedtak) => new Date(vedtak.datoFattet).getTime() > new Date(sistInnsendteSoknad.datoInnsendt).getTime()
    );

    if (vedtakEtterSistInnsendteSoknad.some((vedtak) => vedtak.status === 'AVSLÅTT')) {
        return 'avslag';
    }

    if (innsendteSoknaderEtterRegistreringsDato.length > 0 && vedtakEtterSistInnsendteSoknad.length === 0) {
        return 'sokt';
    }

    const paabegynteSoknaderEtterRegistreringsDato = paabegynteSoknader.filter(
        (soknad) => new Date(soknad.dato).getTime() > registreringsDato.getTime()
    );

    if (paabegynteSoknaderEtterRegistreringsDato.length > 0) {
        return 'paabegynt';
    }

    return 'ukjent';
}

export default beregnDagpengeStatus;
