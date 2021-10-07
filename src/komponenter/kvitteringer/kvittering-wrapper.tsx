import BehovsvurderingKvittering from './behovsvurdering';
import ReaktiveringKvittering from './reaktivering';

interface Props {
    kvittering?: string | null;
}

function finnKvitteringstype(kvittering: string | null | undefined) {
    let kvitteringstype = 'ukjent';
    if (kvittering === 'reaktivering') {
        kvitteringstype = 'reaktivering';
    }
    if (kvittering && /behovsvurdering/.test(kvittering)) {
        kvitteringstype = 'behovsvurdering';
    }
    return kvitteringstype;
}

function KvitteringWrapper(props: Props) {
    const { kvittering } = props;
    const kvitteringstype = finnKvitteringstype(kvittering);
    if (!kvittering || kvitteringstype === 'ukjent') return null;
    return (
        <>
            {kvitteringstype === 'behovsvurdering' && <BehovsvurderingKvittering kvittering={kvittering} />}
            {kvitteringstype === 'reaktivering' && <ReaktiveringKvittering kvittering={kvittering} />}
        </>
    );
}

export default KvitteringWrapper;
