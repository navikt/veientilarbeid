import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledningData, BehovForVeiledningValg } from '../contexts/behov-for-veiledning';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
const settBehovForVeiledning = (value: BehovForVeiledningData) =>
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
    settBehovForVeiledning({ dato: new Date().toISOString(), ...behov });
    return res(ctx.status(201));
};
