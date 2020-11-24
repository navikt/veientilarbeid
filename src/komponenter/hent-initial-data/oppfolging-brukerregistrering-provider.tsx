import * as React from 'react';
import Innholdslaster from '../innholdslaster/innholdslaster';
import * as Oppfolging from '../../ducks/oppfolging';
import * as UnderOppfolging from '../../ducks/under-oppfolging';
import Feilmelding from '../feilmeldinger/feilmelding';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as FeatureToggle from '../../ducks/feature-toggles';
import { fetchData } from '../../ducks/api-utils';
import { BRUKERREGISTRERING_URL, VEILARBOPPFOLGING_URL, FEATURE_URL, UNDER_OPPFOLGING_URL } from '../../ducks/api';
import SjekkOppfolging from './sjekk-oppfolging';
import { AutentiseringContext, InnloggingsNiva } from '../../ducks/autentisering';

interface OwnProps {
    children: React.ReactElement<any>;
}

type OppfolgingProviderProps = OwnProps;

const OppfolgingBrukerregistreringProvider = ({ children }: OppfolgingProviderProps) => {
    const { securityLevel } = React.useContext(AutentiseringContext).data;

    const [brukerregistreringState, setBrukerregistreringState] = React.useState<Brukerregistrering.State>(
        Brukerregistrering.initialState
    );
    const [oppfolgingState, setOppfolgingState] = React.useState<Oppfolging.State>(Oppfolging.initialState);
    const [underOppfolgingState, setUnderOppfolgingState] = React.useState<UnderOppfolging.State>(
        UnderOppfolging.initialState
    );
    const [featureToggleState, setFeatureToggleState] = React.useState<FeatureToggle.State>(FeatureToggle.initialState);
    const parameters = FeatureToggle.alleFeatureToggles.map((element) => 'feature=' + element).join('&');
    const featureTogglesUrl = `${FEATURE_URL}/?${parameters}`;

    React.useEffect(() => {
        fetchData<UnderOppfolging.State, UnderOppfolging.Data>(
            underOppfolgingState,
            setUnderOppfolgingState,
            UNDER_OPPFOLGING_URL
        );
        fetchData<FeatureToggle.State, FeatureToggle.Data>(
            featureToggleState,
            setFeatureToggleState,
            featureTogglesUrl
        );
        if (securityLevel === InnloggingsNiva.LEVEL_4) {
            fetchData<Oppfolging.State, Oppfolging.Data>(oppfolgingState, setOppfolgingState, VEILARBOPPFOLGING_URL);
            fetchData<Brukerregistrering.State, Brukerregistrering.Data>(
                brukerregistreringState,
                setBrukerregistreringState,
                BRUKERREGISTRERING_URL
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [securityLevel]);

    const avhengigheter: any[] = [underOppfolgingState];
    if (securityLevel === InnloggingsNiva.LEVEL_4) {
        avhengigheter.push(oppfolgingState, brukerregistreringState);
    }

    return (
        <Innholdslaster
            feilmeldingKomponent={<Feilmelding tekstId="feil-i-systemene-beskrivelse" />}
            storrelse="XXL"
            avhengigheter={avhengigheter}
        >
            <Oppfolging.OppfolgingContext.Provider value={oppfolgingState}>
                <UnderOppfolging.UnderOppfolgingContext.Provider value={underOppfolgingState}>
                    <SjekkOppfolging underOppfolging={oppfolgingState.data.underOppfolging}>
                        <Brukerregistrering.BrukerregistreringContext.Provider value={brukerregistreringState}>
                            <FeatureToggle.FeaturetoggleContext.Provider value={featureToggleState}>
                                {children}
                            </FeatureToggle.FeaturetoggleContext.Provider>
                        </Brukerregistrering.BrukerregistreringContext.Provider>
                    </SjekkOppfolging>
                </UnderOppfolging.UnderOppfolgingContext.Provider>
            </Oppfolging.OppfolgingContext.Provider>
        </Innholdslaster>
    );
};

export default OppfolgingBrukerregistreringProvider;
