import { ResponseComposition, RestContext, RestRequest } from 'msw';

import { DemoData, hentDemoState, settDemoState } from './demo-state';
import { ReaktiveringSvarAlternativer } from '../contexts/reaktivering';

type ReaktiveringSvar = {
    svar: ReaktiveringSvarAlternativer;
};

const hentReaktivering = () =>
    hentDemoState(DemoData.REAKTIVERING) ||
    JSON.stringify({ oppdatertDato: new Date().toISOString().substring(0, 10), svar: null });
const settReaktivering = (value: string) => settDemoState(DemoData.REAKTIVERING, value);

export const reaktiveringGetResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
    const reaktivering = hentReaktivering();
    return reaktivering ? res(ctx.json(JSON.parse(reaktivering))) : res(ctx.status(204));
};

export const reaktiveringPostResolver = (
    req: RestRequest<ReaktiveringSvar>,
    res: ResponseComposition,
    ctx: RestContext
) => {
    const reaktivering = hentReaktivering() || {};
    const { svar } = req.body;
    const oppdatertReaktivering = {
        ...reaktivering,
        svar: svar,
        oppdatertDato: new Date().toISOString().substring(0, 10),
    };
    settReaktivering(JSON.stringify(oppdatertReaktivering));
    return res(ctx.status(201));
};
