import Startkort from './Startkort';
import Sluttkort from './Sluttkort';
import Kortliste from './Kortliste';
import EngelskKortliste from './en/Kortliste';
import { Sprak } from '../../../contexts/sprak';

const lagSituasjonsbestemtKortliste = (sprak: Sprak): [() => JSX.Element, JSX.Element[], () => JSX.Element] => {
    if (sprak === 'en') {
        return [Startkort, EngelskKortliste, Sluttkort];
    }

    return [Startkort, Kortliste, Sluttkort];
};

export default lagSituasjonsbestemtKortliste;
