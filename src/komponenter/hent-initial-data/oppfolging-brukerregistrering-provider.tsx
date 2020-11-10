import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import * as Oppfolging from '../../ducks/oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as FeatureToggle from '../../ducks/feature-toggles';
import { fetchData } from '../../ducks/api-utils';
import { BRUKERREGISTRERING_URL, VEILARBOPPFOLGING_URL, FEATURE_URL } from '../../ducks/api';
import SjekkOppfolging from './sjekk-oppfolging';

interface OwnProps {
    children: React.ReactElement<any>;
}

type OppfolgingProviderProps = OwnProps;

const OppfolgingBrukerregistreringProvider = ({ children }: OppfolgingProviderProps) => {
    const [brukerregistreringState, setBrukerregistreringState] = React.useState<Brukerregistrering.State>(
        Brukerregistrering.initialState
    );
    const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);
    const [featureToggleState, setFeatureToggleState] = React.useState<FeatureToggle.State>(FeatureToggle.initialState);
    const parameters = FeatureToggle.alleFeatureToggles.map((element) => 'feature=' + element).join('&');
    const featureTogglesUrl = `${FEATURE_URL}/?${parameters}`;

    React.useEffect(() => {
        fetchData<Oppfolging.State, Oppfolging.Data>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
        fetchData<Brukerregistrering.State, Brukerregistrering.Data>(
            brukerregistreringState,
            setBrukerregistreringState,
            BRUKERREGISTRERING_URL
        );
        fetchData<FeatureToggle.State, FeatureToggle.Data>(
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
            <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
                <SjekkOppfolging underOppfolging={oppfolgingState.data.underOppfolging}>
                    <Brukerregistrering.BrukerregistreringContext.Provider value={brukerregistreringState}>
                        <FeatureToggle.FeaturetoggleContext.Provider value={featureToggleState}>
                            {children}
                        </FeatureToggle.FeaturetoggleContext.Provider>
                    </Brukerregistrering.BrukerregistreringContext.Provider>
                </SjekkOppfolging>
            </Oppfolging.OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default OppfolgingBrukerregistreringProvider;
