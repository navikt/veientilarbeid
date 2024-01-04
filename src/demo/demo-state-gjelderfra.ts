import { HttpResponse, ResponseResolver } from 'msw';
import { DemoData, hentDemoState, settDemoState } from './demo-state';

const hentGjelderFraDato = () => hentDemoState(DemoData.GJELDER_FRA_DATO) || null;
const settGjelderFraDato = (value: string) => settDemoState(DemoData.GJELDER_FRA_DATO, value);

type DatoBody = {
    dato: string;
};

export const gjelderFraGetResolver = () => {
    return HttpResponse.json({
        dato: hentGjelderFraDato(),
    });
};

export const gjelderFraPostResolver: ResponseResolver = async ({ request }) => {
    const body = await request.json();
    const { dato } = body as DatoBody;
    settGjelderFraDato(dato);
    return new HttpResponse(null, {
        status: 201,
    });
};
