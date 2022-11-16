import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { Profil } from '../profil';

const hentBrukerProfil = () => hentDemoState(DemoData.PROFIL) || null;
const settBrukerProfil = (value: string) => settDemoState(DemoData.PROFIL, value);

export const brukerProfilGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const profil = hentBrukerProfil();
    return profil ? res(ctx.json(JSON.parse(profil))) : res(ctx.status(204));
};

export const brukerProfilPostResolver = (req: RestRequest<Profil>, res: ResponseComposition, ctx: RestContext) => {
    settBrukerProfil(JSON.stringify(req.body));
    return res(ctx.status(201));
};
