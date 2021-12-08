import { useState, useEffect } from 'react';
import finnKvitteringstype from '../lib/finn-kvitteringstype';

const useVisKvittering = (kvitteringstype: string) => {
    const [kvittering, setKvittering] = useState('');
    const [visKvittering, setVisKvittering] = useState<boolean>(finnKvitteringstype(kvittering) === kvitteringstype);

    useEffect(() => {
        setKvittering(new URLSearchParams(window.location.search).get('visKvittering') || '');
    }, []);

    useEffect(() => {
        setVisKvittering(finnKvitteringstype(kvittering) === kvitteringstype);
    }, [kvittering, kvitteringstype]);

    return visKvittering;
};

export default useVisKvittering;
