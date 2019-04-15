import { parse } from 'query-string';

export function visRettTilDagPenger(search: string) {
    return parse(search).visdagpenger === 'true';
}
