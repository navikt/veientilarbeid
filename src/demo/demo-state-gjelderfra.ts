import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { DemoData, hentDemoState, settDemoState } from './demo-state';

interface DatoBody {
    dato: string;
}

const hentGjelderFraDato = () => hentDemoState(DemoData.GJELDER_FRA_DATO) || null;
const settGjelderFraDato = (value: string) => settDemoState(DemoData.GJELDER_FRA_DATO, value);

export const gjelderFraGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(
        ctx.json({
            dato: hentGjelderFraDato(),
        })
    );
};

export const gjelderFraPostResolver = (req: RestRequest<DatoBody>, res: ResponseComposition, ctx: RestContext) => {
    const { dato } = req.body;
    settGjelderFraDato(dato);
    return res(ctx.status(201));
};
