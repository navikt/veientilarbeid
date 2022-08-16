import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';

interface DatoBody {
    dato: string;
}

const hentBrukerProfil = () => hentDemoState(DemoData.PROFIL) || null;
const settBrukerProfil = (value: string) => settDemoState(DemoData.PROFIL, value);

export const brukerProfilGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const profil = hentBrukerProfil();
    return profil ? res(ctx.json(profil)) : res(ctx.status(204));
};

export const brukerProfilPostResolver = (req: RestRequest<DatoBody>, res: ResponseComposition, ctx: RestContext) => {
    const { dato } = req.body;
    settBrukerProfil(dato);
    return res(ctx.status(201));
};
