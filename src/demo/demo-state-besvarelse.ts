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

const hentErBesvarelseEndret = () => hentDemoState(DemoData.ER_BESVARELSE_ENDRET) || null;
const settErBesvarelseEndret = (value: boolean) => settDemoState(DemoData.ER_BESVARELSE_ENDRET, value);

function oppdaterBesvarelse(
    verdi: string | null,
    gjelderFraDato: string | null | undefined,
    endretTidspunkt: string | null,
    endretAv: string | null,
    tilleggsData: DinSituasjonTilleggsdata,
    erBesvarelseEndret: string | null | boolean
): BesvarelseResponse {
    const oppdatertBesvarelse = JSON.parse(JSON.stringify(besvarelseMock));
    if (erBesvarelseEndret) {
        oppdatertBesvarelse.erBesvarelseEndret = true;
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

export const besvarelseGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const verdi = hentNySituasjon();
    const gjelderFraDato = hentNySituasjonFra();
    const endretTidspunkt = hentEndretSituasjonFra();
    const endretAv = hentEndretSituasjonAv();
    const tilleggsData = hentSituasjonTilleggsdata();
    const erBesvarelseEndret = hentErBesvarelseEndret();
    const parsetData = tilleggsData ? JSON.parse(tilleggsData) : null;
    const oppdatertBesvarelse = oppdaterBesvarelse(
        verdi,
        gjelderFraDato,
        endretTidspunkt,
        endretAv,
        parsetData,
        erBesvarelseEndret
    );
    return res(ctx.json(oppdatertBesvarelse));
};

export const besvarelsePostResolver = (
    req: RestRequest<DinSituasjonRequest>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    const { dinSituasjon } = req.body;
    const { verdi, gjelderFraDato, tilleggsData } = dinSituasjon;
    const endretTidspunkt = new Date().toISOString();
    const endretAv = 'BRUKER';
    const erBesvarelseEndret = true;
    settNySituasjon(verdi);
    settErBesvarelseEndret(erBesvarelseEndret);
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
        erBesvarelseEndret
    );
    return res(ctx.status(201), ctx.json(oppdatertBesvarelse));
};
