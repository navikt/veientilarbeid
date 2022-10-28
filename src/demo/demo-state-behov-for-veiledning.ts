import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledningResponse, BehovForVeiledningValg } from '../contexts/behov-for-veiledning';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
const settBehovForVeiledning = (value: BehovForVeiledningResponse) =>
    settDemoState(DemoData.BEHOV_FOR_VEILEDNING, JSON.stringify(value));

export const behovForVeiledningGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const behovForVeiledning = hentBehovForVeiledning();
    console.log('behovforveiledning', behovForVeiledning);
    return behovForVeiledning ? res(ctx.json(JSON.parse(behovForVeiledning))) : res(ctx.status(204));
};

export const behovForVeiledningPostResolver = (
    req: RestRequest<{ oppfolging: BehovForVeiledningValg }>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    const behov = req.body;
    settBehovForVeiledning({ dato: new Date().toISOString(), dialogId: undefined, ...behov });
    return res(ctx.status(201));
};

export const opprettDialogPostResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.json({ id: 'dialog-123' }));
};
