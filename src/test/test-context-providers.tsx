import { ReactChildren, ReactElement } from 'react';
import merge from 'merge-deep';
import * as Brukerregistrering from '../ducks/brukerregistrering';
import * as Situasjon from '../ducks/situasjon';
import * as FeatureToggle from '../ducks/feature-toggles';
import * as Egenvurdering from '../ducks/egenvurdering';
import * as Oppfolging from '../ducks/oppfolging';
import * as React from 'react';
import { DeepPartial } from 'redux';

export type ProviderProps = {
    brukerregistrering?: DeepPartial<Brukerregistrering.Data>;
    situasjon?: DeepPartial<Situasjon.Data>;
    featureToggle?: DeepPartial<FeatureToggle.Data>;
    egenvurdering?: DeepPartial<Egenvurdering.Data>;
    oppfolging?: DeepPartial<Oppfolging.Data>;
};

export const contextProviders = function (
    props: ProviderProps
): ({ children }: { children: ReactChildren }) => ReactElement {
    return ({ children }) => (
        <Brukerregistrering.BrukerregistreringContext.Provider
            value={merge(
                Brukerregistrering.initialState,
                props.brukerregistrering && { data: props.brukerregistrering }
            )}
        >
            <Situasjon.SituasjonContext.Provider
                value={merge(Situasjon.initialState, props.situasjon && { data: props.situasjon })}
            >
                <Egenvurdering.EgenvurderingContext.Provider
                    value={merge(Egenvurdering.initialState, props.egenvurdering && { data: props.egenvurdering })}
                >
                    <Oppfolging.OppfolgingContext.Provider
                        value={merge(Oppfolging.initialState, props.oppfolging && { data: props.oppfolging })}
                    >
                        <FeatureToggle.FeaturetoggleContext.Provider
                            value={merge(
                                FeatureToggle.initialState,
                                props.featureToggle && { data: props.featureToggle }
                            )}
                        >
                            {children}
                        </FeatureToggle.FeaturetoggleContext.Provider>
                    </Oppfolging.OppfolgingContext.Provider>
                </Egenvurdering.EgenvurderingContext.Provider>
            </Situasjon.SituasjonContext.Provider>
        </Brukerregistrering.BrukerregistreringContext.Provider>
    );
};
