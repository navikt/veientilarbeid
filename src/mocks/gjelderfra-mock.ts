import { ResponseComposition, RestContext, RestRequest } from 'msw';
import { hentGjelderFraDato, settGjelderFraDato } from '../demo/demo-state';

interface DatoBody {
    dato: string;
}

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

const gjelderFraGetResponse = {
    dato: null,
};

export default gjelderFraGetResponse;
