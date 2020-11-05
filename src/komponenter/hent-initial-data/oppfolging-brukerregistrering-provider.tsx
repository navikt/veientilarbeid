import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import {
    State as OppfolgingState,
    Data as OppfolgingData,
    initialState as oppfolgingInitialState,
    OppfolgingContext,
} from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import {
    State as BrukerregistreringState,
    Data as BrukerregistreringData,
    initialState as brukerregistreringInitialState,
    BrukerregistreringContext,
} from '../../ducks/brukerregistrering';
import {
    Data as FeatureTogglesData,
    initialState as featureTogglesInitialState,
    State as FeatureTogglesState,
    FeaturetoggleContext,
    alleFeatureToggles,
} from '../../ducks/feature-toggles';
import { fetchData } from '../../ducks/api-utils';
import { BRUKERREGISTRERING_URL, VEILARBOPPFOLGING_URL, FEATURE_URL } from '../../ducks/api';
import SjekkOppfolging from './sjekk-oppfolging';

interface OwnProps {
    children: React.ReactElement<any>;
}

type OppfolgingProviderProps = OwnProps;

const OppfolgingBrukerregistreringProvider = ({ children }: OppfolgingProviderProps) => {
    const [brukerregistreringState, setBrukerregistreringState] = React.useState<BrukerregistreringState>(
        brukerregistreringInitialState
    );
    const [oppfolgingState, setOppfolgingState] = React.useState<OppfolgingState>(oppfolgingInitialState);
    const [featureToggleState, setFeatureToggleState] = React.useState<FeatureTogglesState>(featureTogglesInitialState);
    const parameters = alleFeatureToggles.map((element) => 'feature=' + element).join('&');
    const featureTogglesUrl = `${FEATURE_URL}/?${parameters}`;

    React.useEffect(() => {
        fetchData<OppfolgingState, OppfolgingData>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
        fetchData<BrukerregistreringState, BrukerregistreringData>(
            brukerregistreringState,
            setBrukerregistreringState,
            BRUKERREGISTRERING_URL
        );
        fetchData<FeatureTogglesState, FeatureTogglesData>(
            featureToggleState,
            setFeatureToggleState,
            featureTogglesUrl
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse" />}
            storrelse="XXL"
            avhengigheter={[oppfolgingState, brukerregistreringState]}
        >
            <OppfolgingContext.Provider value={oppfolgingState}>
                <SjekkOppfolging underOppfolging={oppfolgingState.data.underOppfolging}>
                    <BrukerregistreringContext.Provider value={brukerregistreringState}>
                        <FeaturetoggleContext.Provider value={featureToggleState}>
                            {children}
                        </FeaturetoggleContext.Provider>
                    </BrukerregistreringContext.Provider>
                </SjekkOppfolging>
            </OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default OppfolgingBrukerregistreringProvider;
