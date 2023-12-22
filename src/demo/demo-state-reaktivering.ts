import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { ReaktiveringSvarAlternativer } from '../contexts/reaktivering';
import { HttpResponse, ResponseResolver } from 'msw';

type ReaktiveringSvar = {
    svar: ReaktiveringSvarAlternativer;
};

const hentReaktivering = () =>
    hentDemoState(DemoData.REAKTIVERING) ||
    JSON.stringify({ oppdatertDato: new Date().toISOString().substring(0, 10), svar: null });
const settReaktivering = (value: string) => settDemoState(DemoData.REAKTIVERING, value);

export const reaktiveringGetResolver = () => {
    const reaktivering = hentReaktivering();
    return reaktivering
        ? HttpResponse.json(JSON.parse(reaktivering))
        : new HttpResponse(null, {
              status: 204,
          });
};

// req: RestRequest<ReaktiveringSvar>,
export const reaktiveringPostResolver: ResponseResolver = async ({ request }) => {
    const reaktivering = hentReaktivering() || {};
    const { svar } = (await request.json()) as ReaktiveringSvar;
    const oppdatertReaktivering = {
        ...reaktivering,
        svar: svar,
        oppdatertDato: new Date().toISOString().substring(0, 10),
    };
    settReaktivering(JSON.stringify(oppdatertReaktivering));
    return new HttpResponse(null, {
        status: 201,
    });
};
