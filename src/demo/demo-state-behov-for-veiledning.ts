import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledning } from '../contexts/behov-for-veiledning';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
const settBehovForVeiledning = (value: string) => settDemoState(DemoData.BEHOV_FOR_VEILEDNING, value);

export const behovForVeiledningGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const behovForVeiledning = hentBehovForVeiledning();
    return behovForVeiledning ? res(ctx.json(JSON.parse(behovForVeiledning))) : res(ctx.status(204));
};

export const behovForVeiledningPostResolver = (
    req: RestRequest<BehovForVeiledning>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    settBehovForVeiledning(JSON.stringify(req.body));
    return res(ctx.status(201));
};
