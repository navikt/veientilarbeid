import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { DinSituasjonRequest, DinSituasjonTilleggsdata, BesvarelseResponse } from '../contexts/besvarelse';
import besvarelseMock from '../mocks/besvarelse-mock';

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

function oppdaterBesvarelse(
    verdi: string | null,
    gjelderFra: string | null | undefined,
    endret: string | null,
    endretAv: string | null,
    tilleggsData: DinSituasjonTilleggsdata
): BesvarelseResponse {
    const oppdatertBesvarelse = JSON.parse(JSON.stringify(besvarelseMock));
    if (verdi) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.verdi = verdi;
    }
    if (gjelderFra) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.gjelderFra = gjelderFra;
    }
    if (tilleggsData) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.tilleggsData = tilleggsData;
    }
    if (endret) {
        oppdatertBesvarelse.besvarelse.endret = endret;
    }
    if (endretAv) {
        oppdatertBesvarelse.besvarelse.endretAv = endretAv;
    }
    return oppdatertBesvarelse;
}

export const besvarelseGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const verdi = hentNySituasjon();
    const gjelderFra = hentNySituasjonFra();
    const endret = hentEndretSituasjonFra();
    const endretAv = hentEndretSituasjonAv();
    const tilleggsData = hentSituasjonTilleggsdata();
    const parsetData = tilleggsData ? JSON.parse(tilleggsData) : null;
    const oppdatertBesvarelse = oppdaterBesvarelse(verdi, gjelderFra, endret, endretAv, parsetData);
    return res(ctx.json(oppdatertBesvarelse));
};

export const besvarelsePostResolver = (
    req: RestRequest<DinSituasjonRequest>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    const { besvarelse } = req.body;
    const { dinSituasjon } = besvarelse;
    const { verdi, gjelderFra, tilleggsData } = dinSituasjon;
    const endret = new Date().toISOString().substring(0, 10);
    const endretAv = 'BRUKER';
    settNySituasjon(verdi);
    if (tilleggsData) {
        settSituasjonTilleggsdata(JSON.stringify(tilleggsData));
    }
    settEndretSituasjonFra(endret);
    settEndretSituasjonAv(endretAv);
    if (gjelderFra) {
        settNySituasjonFra(gjelderFra);
    }
    const oppdatertBesvarelse = oppdaterBesvarelse(verdi, gjelderFra, endret, endretAv, tilleggsData);
    return res(ctx.status(201), ctx.json(oppdatertBesvarelse));
};
