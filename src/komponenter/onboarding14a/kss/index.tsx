import Startkort from './Startkort';
import Kortliste from './Kortliste';
import Sluttkort from './Sluttkort';
import EngelskKortliste from './en/Kortliste';
import { Sprak } from '../../../contexts/sprak';

const lagKssKort = (sprak: Sprak): [() => JSX.Element, JSX.Element[], () => JSX.Element] => {
    if (sprak === 'en') {
        return [Startkort, EngelskKortliste, Sluttkort];
    }

    return [Startkort, Kortliste, Sluttkort];
};

export default lagKssKort;
