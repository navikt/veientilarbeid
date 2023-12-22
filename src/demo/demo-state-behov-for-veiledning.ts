import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { BehovForVeiledningResponse } from '../contexts/behov-for-veiledning';
import { ForeslattInnsatsgruppe } from '../hooks/use-brukerregistrering-data';
import { HttpResponse, ResponseResolver } from 'msw';

const hentBehovForVeiledning = () => hentDemoState(DemoData.BEHOV_FOR_VEILEDNING) || null;
export const settBehovForVeiledning = (value: BehovForVeiledningResponse) =>
    settDemoState(DemoData.BEHOV_FOR_VEILEDNING, JSON.stringify(value));

export const behovForVeiledningGetResolver = () => {
    const behovForVeiledning = hentBehovForVeiledning();
    return behovForVeiledning
        ? HttpResponse.json(JSON.parse(behovForVeiledning))
        : new HttpResponse(null, {
              status: 204,
          });
};

export const behovForVeiledningPostResolver: ResponseResolver = async ({ request }) => {
    const body = await request.json();
    const behov = body as { oppfolging: ForeslattInnsatsgruppe };
    const response = { dato: new Date().toISOString(), dialogId: undefined, ...behov };
    settBehovForVeiledning(response);
    new Response(JSON.stringify(response), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const opprettDialogPostResolver = () => {
    return HttpResponse.json({ id: 'dialog-123' });
};
