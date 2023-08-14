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
import { DpInnsynPaabegyntSoknad } from '../contexts/dp-innsyn-paabegynte-soknader';
import { BeregnedePerioder } from './beregn-arbeidssokerperioder';
import { DpInnsynSoknad, Vedtak } from '../models/dagpenger';

// import { plussDager } from '../utils/date-utils';

export const sorterEtterNyesteDatoInnsendt = (a: DpInnsynSoknad, b: DpInnsynSoknad) =>
    new Date(b.datoInnsendt).getTime() - new Date(a.datoInnsendt).getTime();

export const sorterEtterNyesteVedtak = (a: Vedtak, b: Vedtak) =>
    new Date(b.datoFattet).getTime() - new Date(a.datoFattet).getTime();
export type DagpengeStatus =
    | 'paabegynt'
    | 'sokt'
    | 'mottar'
    | 'reaktivert'
    | 'ukjent'
    | 'avslag'
    | 'innvilget'
    | 'soktogpaabegynt'
    | 'stanset'
    | 'tidligere-innvilget';

function beregnDagpengeStatus({
    brukerInfoData,
    registreringData,
    paabegynteSoknader,
    innsendteSoknader,
    dagpengeVedtak,
    arbeidssokerperioder,
}: {
    brukerInfoData: BrukerInfo.Data;
    registreringData: Brukerregistrering.Data | null;
    paabegynteSoknader: DpInnsynPaabegyntSoknad[];
    innsendteSoknader: DpInnsynSoknad[];
    dagpengeVedtak: Vedtak[];
    arbeidssokerperioder: BeregnedePerioder;
}): DagpengeStatus {
    const { rettighetsgruppe } = brukerInfoData;
    const { aktivPeriodeStart, harAktivArbeidssokerperiode } = arbeidssokerperioder;
    const erIaktivPeriode = harAktivArbeidssokerperiode === 'Ja';
    const harOpprettetDato = registreringData?.registrering?.opprettetDato;

    if (rettighetsgruppe === 'DAGP') {
        return 'mottar';
    }

    if (!harOpprettetDato && !erIaktivPeriode) {
        return 'ukjent';
    }

    const registreringsDato = harOpprettetDato
        ? new Date(registreringData?.registrering!.opprettetDato)
        : new Date(aktivPeriodeStart);
    const sistInnsendteSoknad = innsendteSoknader.sort(sorterEtterNyesteDatoInnsendt)[0];
    const sisteDagpengevedtak = dagpengeVedtak.sort(sorterEtterNyesteVedtak)[0];

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

        const erVedtakAvsluttet = sisteDagpengevedtak.tilDato
            ? new Date(sisteDagpengevedtak.tilDato).getTime() < new Date().getTime()
            : false;

        if (sisteDagpengevedtak && sisteDagpengevedtak.status === 'INNVILGET' && !erVedtakAvsluttet) {
            return vedtakErNyereEnnSisteRegistreringsdato ? 'innvilget' : 'tidligere-innvilget';
        }

        if (erVedtakAvsluttet) {
            return 'stanset';
        }
    }

    const sistPaabegynteSoknad = paabegynteSoknader.sort(
        (a: DpInnsynPaabegyntSoknad, b: DpInnsynPaabegyntSoknad) =>
            new Date(a.sistEndret).getTime() - new Date(b.sistEndret).getTime(),
    )[0];

    const harPaabegyntEtterInnsendt =
        sistPaabegynteSoknad &&
        sistInnsendteSoknad &&
        new Date(sistPaabegynteSoknad.sistEndret).getTime() > new Date(sistInnsendteSoknad?.datoInnsendt).getTime();

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
