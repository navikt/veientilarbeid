import Startkort from './Startkort';
import Kortliste from './Kortliste';
import EngelskKortliste from './en/Kortliste';
import Sluttkort from './Sluttkort';
import { Sprak } from '../../../contexts/sprak';

const lagUngdomsinnsatsKort = (sprak: Sprak): [() => JSX.Element, JSX.Element[], () => JSX.Element] => {
    const kortliste = sprak === 'en' ? EngelskKortliste : Kortliste;
    return [Startkort, kortliste, Sluttkort];
};

export default lagUngdomsinnsatsKort;
