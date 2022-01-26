import { Sprak } from '../contexts/sprak';

export type Tekster<T> = { nb: Record<string, T> } & Partial<{ [P in Exclude<Sprak, 'nb'>]: Record<string, T> }>;

const lagHentTekstForSprak = (tekster: Tekster<any>, sprak: Sprak) => (key: string) => {
    const tekst = tekster[sprak];

    if (tekst) {
        return tekst[key] || tekster.nb[key];
    }

    return tekster.nb[key];
};

export default lagHentTekstForSprak;
