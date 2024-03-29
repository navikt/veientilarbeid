import { HttpResponse, ResponseResolver } from 'msw';
import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BesvarelseResponse, DinSituasjonRequest, DinSituasjonTilleggsdata } from '../contexts/besvarelse';
import besvarelseMock from '../mocks/besvarelse-mock';
import { hentQueryParam } from '../utils/query-param-utils';

const hentNySituasjon = () => hentDemoState(DemoData.NY_SITUASJON) || null;
const settNySituasjon = (value: string) => settDemoState(DemoData.NY_SITUASJON, value);

const hentSituasjonTilleggsdata = () => hentDemoState(DemoData.SITUASJON_TILLEGGSDATA) || null;
const settSituasjonTilleggsdata = (value: string) => settDemoState(DemoData.SITUASJON_TILLEGGSDATA, value);

const hentNySituasjonFra = () => hentDemoState(DemoData.NY_SITUASJON_FRA) || null;
const settNySituasjonFra = (value: string) => settDemoState(DemoData.NY_SITUASJON_FRA, value);

const hentEndretSituasjonFra = () => hentDemoState(DemoData.ENDRET_SITUASJON) || null;
const settEndretSituasjonFra = (value: string) => settDemoState(DemoData.ENDRET_SITUASJON, value);

const hentEndretSituasjonAv = () => hentDemoState(DemoData.ENDRET_SITUASJON_AV) || null;
const settEndretSituasjonAv = (value: string) => settDemoState(DemoData.ENDRET_SITUASJON_AV, value);

const hentErBesvarelsenEndret = () => hentDemoState(DemoData.ER_BESVARELSEN_ENDRET) || null;
const settErBesvarelsenEndret = (value: boolean) => settDemoState(DemoData.ER_BESVARELSEN_ENDRET, value);

function oppdaterBesvarelse(
    verdi: string | null,
    gjelderFraDato: string | null | undefined,
    endretTidspunkt: string | null,
    endretAv: string | null,
    tilleggsData: DinSituasjonTilleggsdata,
    erBesvarelsenEndret: string | null | boolean,
): BesvarelseResponse {
    const oppdatertBesvarelse = JSON.parse(JSON.stringify(besvarelseMock));
    if (erBesvarelsenEndret) {
        oppdatertBesvarelse.erBesvarelsenEndret = true;
    }
    if (verdi) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.verdi = verdi;
    }
    if (gjelderFraDato) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.gjelderFraDato = gjelderFraDato;
    }
    if (tilleggsData) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.tilleggsData = tilleggsData;
        oppdatertBesvarelse.besvarelse.dinSituasjon.endretTidspunkt = endretTidspunkt || new Date().toISOString();
        oppdatertBesvarelse.besvarelse.dinSituasjon.endretAv = endretAv || 'BRUKER';
    }
    if (endretTidspunkt) {
        oppdatertBesvarelse.endretTidspunkt = endretTidspunkt;
    }
    if (endretAv) {
        oppdatertBesvarelse.endretAv = endretAv;
    }
    return oppdatertBesvarelse;
}

export const besvarelseGetResolver = () => {
    const verdi = hentNySituasjon();
    const gjelderFraDato = hentNySituasjonFra();
    const endretTidspunkt = hentEndretSituasjonFra();
    const endretAv = hentEndretSituasjonAv();
    const tilleggsData = hentSituasjonTilleggsdata();
    const erBesvarelsenEndret = hentErBesvarelsenEndret();
    const parsetData = tilleggsData ? JSON.parse(tilleggsData) : null;
    const oppdatertBesvarelse = oppdaterBesvarelse(
        verdi,
        gjelderFraDato,
        endretTidspunkt,
        endretAv,
        parsetData,
        erBesvarelsenEndret,
    );
    const manglerRegistrering = hentQueryParam('manglerRegistrering') === 'true';

    if (manglerRegistrering) {
        return new HttpResponse(null, {
            status: 204,
        });
    }

    return HttpResponse.json(oppdatertBesvarelse);
};

export const besvarelsePostResolver: ResponseResolver = async ({ request }) => {
    const body = await request.json();
    const { dinSituasjon } = body as DinSituasjonRequest;
    const { verdi, gjelderFraDato, tilleggsData } = dinSituasjon;
    const endretTidspunkt = new Date().toISOString();
    const endretAv = 'BRUKER';
    const erBesvarelsenEndret = true;
    settNySituasjon(verdi);
    settErBesvarelsenEndret(erBesvarelsenEndret);
    if (tilleggsData) {
        settSituasjonTilleggsdata(JSON.stringify(tilleggsData));
    }
    settEndretSituasjonFra(endretTidspunkt);
    settEndretSituasjonAv(endretAv);
    if (gjelderFraDato) {
        settNySituasjonFra(gjelderFraDato);
    }
    const oppdatertBesvarelse = oppdaterBesvarelse(
        verdi,
        gjelderFraDato,
        endretTidspunkt,
        endretAv,
        tilleggsData,
        erBesvarelsenEndret,
    );

    return new Response(JSON.stringify(oppdatertBesvarelse), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
