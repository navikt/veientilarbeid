import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { DinSituasjonRequest, BesvarelseResponse } from '../contexts/besvarelse';
import besvarelseMock from '../mocks/besvarelse-mock';

const hentNySituasjon = () => hentDemoState(DemoData.NY_SITUASJON) || null;
const settNySituasjon = (value: string) => settDemoState(DemoData.NY_SITUASJON, value);

const hentNySituasjonFra = () => hentDemoState(DemoData.NY_SITUASJON_FRA) || null;
const settNySituasjonFra = (value: string) => settDemoState(DemoData.NY_SITUASJON_FRA, value);

function oppdaterBesvarelse(verdi: string | null, gjelderFra: string | null | undefined): BesvarelseResponse {
    const oppdatertBesvarelse = JSON.parse(JSON.stringify(besvarelseMock));
    if (verdi) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.verdi = verdi;
    }
    if (gjelderFra) {
        oppdatertBesvarelse.besvarelse.dinSituasjon.gjelderFra = gjelderFra;
    }
    return oppdatertBesvarelse;
}

export const besvarelseGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const verdi = hentNySituasjon();
    const gjelderFra = hentNySituasjonFra();
    const oppdatertBesvarelse = oppdaterBesvarelse(verdi, gjelderFra);
    return res(ctx.json(oppdatertBesvarelse));
};

export const besvarelsePostResolver = (
    req: RestRequest<DinSituasjonRequest>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    const { besvarelse } = req.body;
    const { dinSituasjon } = besvarelse;
    const { verdi, gjelderFra } = dinSituasjon;
    settNySituasjon(verdi);
    if (gjelderFra) {
        settNySituasjonFra(gjelderFra);
    }
    const oppdatertBesvarelse = oppdaterBesvarelse(verdi, gjelderFra);
    return res(ctx.status(201), ctx.json(oppdatertBesvarelse));
};
