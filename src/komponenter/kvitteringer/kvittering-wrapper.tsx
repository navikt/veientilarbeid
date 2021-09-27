import React from 'react';
import BehovsvurderingKvittering from './behovsvurdering';

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
    return <BehovsvurderingKvittering kvittering={kvittering} />;
}

export default KvitteringWrapper;
