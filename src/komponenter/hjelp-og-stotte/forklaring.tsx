import { useSprakValg } from '../../contexts/sprak';
import ForklaringEngelsk from './forklaring-engelsk';
import ForklaringNorsk from './forklaring-norsk';

function Forklaring() {
    const sprak = useSprakValg().sprak;

    if (sprak === 'en') {
        return <ForklaringEngelsk />;
    }
    return <ForklaringNorsk />;
}

export default Forklaring;
