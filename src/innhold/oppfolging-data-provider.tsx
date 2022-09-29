import * as React from 'react';
import { useEffect } from 'react';

import * as Oppfolging from '../contexts/oppfolging';
import { fetchData } from '../ducks/api-utils';
import { VEILARBOPPFOLGING_URL } from '../ducks/api';
import Innholdslaster from '../komponenter/innholdslaster/innholdslaster';
import Feilmelding from '../komponenter/feilmeldinger/feilmelding';

interface Props {
    children: React.ReactElement<any>;
}

const OppfolgingDataProvider = (props: Props) => {
    const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);

    useEffect(() => {
        fetchData<Oppfolging.State, Oppfolging.Data>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const avhengigheter = [oppfolgingState];

    return (
        <Innholdslaster feilmeldingKomponent={<Feilmelding />} storrelse="XXL" avhengigheter={avhengigheter}>
            <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
                {props.children}
            </Oppfolging.OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default OppfolgingDataProvider;
