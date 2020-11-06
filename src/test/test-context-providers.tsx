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
import * as React from 'react';
import { DeepPartial } from 'redux';

export type ProviderProps = {
    brukerregistrering?: DeepPartial<BrukerRegistreringData>;
    situasjon?: DeepPartial<SituasjonData>;
    featureToggle?: DeepPartial<FeatureToggleData>;
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
                <FeaturetoggleContext.Provider
                    value={merge(featureToggleInitialState, props.featureToggle && { data: props.featureToggle })}
                >
                    {children}
                </FeaturetoggleContext.Provider>
            </SituasjonContext.Provider>
        </BrukerregistreringContext.Provider>
    );
};
