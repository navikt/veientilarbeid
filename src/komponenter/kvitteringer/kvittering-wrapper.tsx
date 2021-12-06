import ReaktiveringKvittering from './reaktivering';
import finnKvitteringstype from '../../lib/finn-kvitteringstype';

interface Props {
    kvittering: string;
}

function KvitteringWrapper(props: Props) {
    const { kvittering } = props;
    const kvitteringstype = finnKvitteringstype(kvittering);

    return !kvittering || kvitteringstype !== 'reaktivering' ? null : (
        <ReaktiveringKvittering kvittering={kvittering} />
    );
}

export default KvitteringWrapper;
