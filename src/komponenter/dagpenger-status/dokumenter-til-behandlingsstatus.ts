enum Statuser {
    'FERDIG_BEHANDLET' = 'FERDIG_BEHANDLET',
    'UNDER_BEHANDLING' = 'UNDER_BEHANDLING',
    'UKJENT_STATUS' = 'UKJENT_STATUS',
}

type Status = Statuser;
type RegistreringsDato = Date | null;

interface DokumentMetadata {
    retning: string;
    dato: string;
    hoveddokument: {
        tittel: string;
    };
    avsender: string;
    mottaker: string;
    temakode: string;
}

function datoSortering(a: DokumentMetadata, b: DokumentMetadata) {
    return new Date(b.dato).getTime() - new Date(a.dato).getTime();
}

function erGyldigDokument(dokument: DokumentMetadata, registreringsDato: RegistreringsDato): boolean {
    const gyldigRetning = dokument.retning === 'INN' || dokument.retning === 'UT';
    const gyldigDato = registreringsDato ? new Date(dokument.dato) > registreringsDato : false;
    const gyldigTittel = /[dD]agpenger/.test(dokument.hoveddokument.tittel);
    const gyldigAvsender = dokument.avsender === 'NAV' || dokument.avsender === 'SLUTTBRUKER';
    const gyldigMottaker = dokument.mottaker === 'NAV' || dokument.mottaker === 'SLUTTBRUKER';
    const gyldigTemakode = dokument.temakode === 'DAG';

    return gyldigRetning && gyldigDato && gyldigTittel && gyldigAvsender && gyldigMottaker && gyldigTemakode;
}

function finnDokumentStatus(dokument: DokumentMetadata): Status {
    let status = Statuser.UKJENT_STATUS;
    const erSoknad = /[sS]øknad/.test(dokument.hoveddokument.tittel);
    const erVedtak = /[vV]edtak/.test(dokument.hoveddokument.tittel);
    if (erVedtak) {
        status = Statuser.FERDIG_BEHANDLET;
    }
    if (erSoknad) {
        status = Statuser.UNDER_BEHANDLING;
    }
    return status;
}

function dokumenterTilBehandlingsstatus(
    dokumentMetadata: DokumentMetadata[],
    registreringsDato: RegistreringsDato
): Status {
    let status = Statuser.UKJENT_STATUS;
    const gyldigeDokumenter = dokumentMetadata.filter((dokument) => erGyldigDokument(dokument, registreringsDato));
    gyldigeDokumenter.sort(datoSortering);
    if (gyldigeDokumenter.length > 0) {
        status = finnDokumentStatus(gyldigeDokumenter[0]);
    }
    return status;
}

export default dokumenterTilBehandlingsstatus;
