import { Sprak } from '../contexts/sprak';

export interface Tekster<T> {
    nb: {
        [key: string]: T;
    };
    [sprak: string]: {
        [key: string]: T;
    };
}

const lagHentTekstForSprak = (tekster: Tekster<any>, sprak: Sprak) => (key: string) => {
    return (tekster[sprak] && tekster[sprak][key]) || tekster.nb[key];
};

export default lagHentTekstForSprak;
