import { HttpResponse, ResponseResolver } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';

const hentBrukerProfil = () => hentDemoState(DemoData.PROFIL) || null;
const settBrukerProfil = (value: string) => settDemoState(DemoData.PROFIL, value);

export const brukerProfilGetResolver = () => {
    const profil = hentBrukerProfil();
    return profil
        ? HttpResponse.json(JSON.parse(profil))
        : new HttpResponse(null, {
              status: 204,
          });
};

export const brukerProfilPostResolver: ResponseResolver = async ({ request }) => {
    const body = await request.json();
    settBrukerProfil(JSON.stringify(body));
    return new HttpResponse(null, {
        status: 201,
    });
};
