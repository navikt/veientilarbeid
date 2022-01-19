import { Sprak } from '../contexts/sprak';

export interface Tekster {
    nb: {
        [key: string]: string;
    };
    [sprak: string]: {
        [key: string]: string;
    };
}

const lagHentTekstForSprak = (tekster: Tekster, sprak: Sprak) => (key: string) => {
    return tekster[sprak][key] || tekster.nb[key];
};

export default lagHentTekstForSprak;
