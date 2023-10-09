import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledningResponse } from '../contexts/behov-for-veiledning';
import { ForeslattInnsatsgruppe } from '../hooks/use-brukerregistrering-data';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
export const settBehovForVeiledning = (value: BehovForVeiledningResponse) =>
    settDemoState(DemoData.BEHOV_FOR_VEILEDNING, JSON.stringify(value));

export const behovForVeiledningGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const behovForVeiledning = hentBehovForVeiledning();
    return behovForVeiledning ? res(ctx.json(JSON.parse(behovForVeiledning))) : res(ctx.status(204));
};

export const behovForVeiledningPostResolver = (
    req: RestRequest<{ oppfolging: ForeslattInnsatsgruppe }>,
    res: ResponseComposition,
    ctx: RestContext,
) => {
    const behov = req.body;
    const response = { dato: new Date().toISOString(), dialogId: undefined, ...behov };
    settBehovForVeiledning(response);
    return res(ctx.status(201), ctx.json(response));
};

export const opprettDialogPostResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    return res(ctx.json({ id: 'dialog-123' }));
};
