import { ReactChildren, ReactElement } from 'react';
import {
    BrukerregistreringContext,
    Data as BrukerRegistreringData,
    initialState as brukerRegistreringInitialState,
} from '../ducks/brukerregistrering';
import merge from 'merge-deep';
import { Data as SituasjonData, initialState as situasjonInitialState, SituasjonContext } from '../ducks/situasjon';
import {
    Data as FeatureToggleData,
    FeaturetoggleContext,
    initialState as featureToggleInitialState,
} from '../ducks/feature-toggles';
import {
    Data as EgenvurderingData,
    EgenvurderingContext,
    initialState as egenvurderingInitialState,
} from '../ducks/egenvurdering';
import { Data as OppfolgingData, OppfolgingContext, initialState as oppfolgingInitialState } from '../ducks/oppfolging';
import * as React from 'react';
import { DeepPartial } from 'redux';

export type ProviderProps = {
    brukerregistrering?: DeepPartial<BrukerRegistreringData>;
    situasjon?: DeepPartial<SituasjonData>;
    featureToggle?: DeepPartial<FeatureToggleData>;
    egenvurdering?: DeepPartial<EgenvurderingData>;
    oppfolging?: DeepPartial<OppfolgingData>;
};

export const contextProviders = function (
    props: ProviderProps
): ({ children }: { children: ReactChildren }) => ReactElement {
    return ({ children }) => (
        <BrukerregistreringContext.Provider
            value={merge(
                brukerRegistreringInitialState,
                props.brukerregistrering && { data: props.brukerregistrering }
            )}
        >
            <SituasjonContext.Provider
                value={merge(situasjonInitialState, props.situasjon && { data: props.situasjon })}
            >
                <EgenvurderingContext.Provider
                    value={merge(egenvurderingInitialState, props.egenvurdering && { data: props.egenvurdering })}
                >
                    <OppfolgingContext.Provider
                        value={merge(oppfolgingInitialState, props.oppfolging && { data: props.oppfolging })}
                    >
                        <FeaturetoggleContext.Provider
                            value={merge(
                                featureToggleInitialState,
                                props.featureToggle && { data: props.featureToggle }
                            )}
                        >
                            {children}
                        </FeaturetoggleContext.Provider>
                    </OppfolgingContext.Provider>
                </EgenvurderingContext.Provider>
            </SituasjonContext.Provider>
        </BrukerregistreringContext.Provider>
    );
};
