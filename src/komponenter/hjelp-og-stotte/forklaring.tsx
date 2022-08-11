import { useSprakValg } from '../../contexts/sprak';
import { useBrukerinfoData } from '../../contexts/bruker-info';

import ForklaringEngelsk from './forklaring-engelsk';
import ForklaringEngelskUngdom from './forklaring-ungdom-engelsk';
import ForklaringNorsk from './forklaring-norsk';
import ForklaringNorskUngdom from './forklaring-ungdom-norsk';

function Forklaring() {
    const sprak = useSprakValg().sprak;
    const { alder } = useBrukerinfoData();
    const erUngdom = alder && alder < 30;

    if (sprak === 'en') {
        return erUngdom ? <ForklaringEngelskUngdom /> : <ForklaringEngelsk />;
    }
    return erUngdom ? <ForklaringNorskUngdom /> : <ForklaringNorsk />;
}

export default Forklaring;
