/*
  avhengigheter:
 - når registrert => dato "" fra registreringsData
 - har påbegynte søknader => []
 - har innsendte søknader => []
 - har dagpengevedtak => []
 - rettighetsgruppe => "" fra brukerInfo
 */
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as BrukerInfo from '../contexts/bruker-info';
import { DpInnsynSoknad } from '../contexts/dp-innsyn-soknad';
import { Vedtak } from '../contexts/dp-innsyn-vedtak';
import { Soknad } from '../contexts/paabegynte-soknader';
// import { plussDager } from '../utils/date-utils';

export const sorterEtterNyesteDatoInnsendt = (a: DpInnsynSoknad, b: DpInnsynSoknad) =>
    new Date(b.datoInnsendt).getTime() - new Date(a.datoInnsendt).getTime();

export type DagpengeStatus =
    | 'paabegynt'
    | 'sokt'
    | 'mottar'
    | 'reaktivert'
    | 'ukjent'
    | 'avslag'
    | 'innvilget'
    | 'soktogpaabegynt';
function beregnDagpengeStatus({
    brukerInfoData,
    registreringData,
    paabegynteSoknader,
    innsendteSoknader,
    dagpengeVedtak,
}: {
    brukerInfoData: BrukerInfo.Data;
    registreringData: Brukerregistrering.Data | null;
    paabegynteSoknader: Soknad[];
    innsendteSoknader: DpInnsynSoknad[];
    dagpengeVedtak: Vedtak[];
}): DagpengeStatus {
    const { rettighetsgruppe } = brukerInfoData;

    if (rettighetsgruppe === 'DAGP') {
        return 'mottar';
    }

    if (!registreringData?.registrering?.opprettetDato) {
        return 'ukjent';
    }

    const registreringsDato = new Date(registreringData?.registrering!.opprettetDato);
    const sistInnsendteSoknad = innsendteSoknader.sort(sorterEtterNyesteDatoInnsendt)[0];
    const sisteDagpengevedtak = dagpengeVedtak.sort(
        (a: Vedtak, b: Vedtak) => new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime()
    )[0];

    const erVedtakNyereEnnSoknad =
        sisteDagpengevedtak &&
        sistInnsendteSoknad &&
        new Date(sisteDagpengevedtak.datoFattet).getTime() > new Date(sistInnsendteSoknad.datoInnsendt).getTime();

    if (erVedtakNyereEnnSoknad) {
        const vedtakErNyereEnnSisteRegistreringsdato =
            new Date(sisteDagpengevedtak.datoFattet).getTime() > registreringsDato.getTime();
        if (sisteDagpengevedtak && sisteDagpengevedtak.status === 'AVSLÅTT' && vedtakErNyereEnnSisteRegistreringsdato) {
            return 'avslag';
        }

        const erVedtakAvsluttet = sisteDagpengevedtak.tilDato;

        if (sisteDagpengevedtak && sisteDagpengevedtak.status === 'INNVILGET' && !erVedtakAvsluttet) {
            return 'innvilget';
        }
    }

    const sistPaabegynteSoknad = paabegynteSoknader.sort(
        (a: Soknad, b: Soknad) => new Date(a.dato).getTime() - new Date(b.dato).getTime()
    )[0];

    const harPaabegyntEtterInnsendt =
        sistPaabegynteSoknad &&
        sistInnsendteSoknad &&
        new Date(sistPaabegynteSoknad.dato).getTime() > new Date(sistInnsendteSoknad?.datoInnsendt).getTime();

    if (harPaabegyntEtterInnsendt) {
        return 'soktogpaabegynt';
    }

    if (sistInnsendteSoknad) {
        return 'sokt';
    }

    if (sistPaabegynteSoknad) {
        return 'paabegynt';
    }

    return 'ukjent';
}

export default beregnDagpengeStatus;
