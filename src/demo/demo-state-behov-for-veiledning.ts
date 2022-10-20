import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledningData, BehovForVeiledningValg } from '../contexts/behov-for-veiledning';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
const settBehovForVeiledning = (value: BehovForVeiledningData) =>
    settDemoState(DemoData.BEHOV_FOR_VEILEDNING, JSON.stringify(value));

export const behovForVeiledningGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const behovForVeiledning = hentBehovForVeiledning();
    return behovForVeiledning ? res(ctx.json(JSON.parse(behovForVeiledning))) : res(ctx.status(204));
};

export const behovForVeiledningPostResolver = (
    req: RestRequest<BehovForVeiledningValg>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    settBehovForVeiledning({ dato: new Date().toISOString(), oppfolging: req.body as BehovForVeiledningValg });
    return res(ctx.status(201));
};
