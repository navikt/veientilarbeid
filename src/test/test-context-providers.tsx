import * as React from 'react';
import merge from 'merge-deep';

import * as Amplitude from '../komponenter/hent-initial-data/amplitude-provider';
import { AmplitudeData } from '../metrics/amplitude-utils';
import * as Autentisering from '../contexts/autentisering';
import * as FeatureToggle from '../contexts/feature-toggles';
import * as Meldekort from '../hooks/use-meldekortdata';
import * as Arbeidssoker from '../contexts/arbeidssoker';
import { setFastTidspunktForIDag } from '../utils/chrono';
import { Profil } from '../profil';
import { ProfilContext } from '../contexts/profil';
import { MeldepliktContext, Meldeplikt } from '../contexts/meldeplikt';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ProviderProps = {
    autentisering?: DeepPartial<Autentisering.Data>;
    amplitude?: DeepPartial<AmplitudeData>;
    featureToggle?: DeepPartial<FeatureToggle.FeatureToggleData>;
    meldekort?: DeepPartial<Meldekort.Data>;
    iDag?: Date;
    profil?: Profil;
    arbeidssoker?: Arbeidssoker.Data;
    meldeplikt?: Meldeplikt | null;
};

export const contextProviders = function (props: ProviderProps): React.FunctionComponent {
    return ({ children }: { children?: React.ReactNode }) => {
        setFastTidspunktForIDag(props.iDag ?? null);
        return (
            <Autentisering.AutentiseringContext.Provider
                value={merge(Autentisering.initialState, props.autentisering && { data: props.autentisering })}
            >
                <Arbeidssoker.ArbeidssokerContext.Provider
                    value={merge(Arbeidssoker.initialState, props.arbeidssoker && { data: props.arbeidssoker })}
                >
                    <Amplitude.AmplitudeContext.Provider
                        value={{
                            amplitudeData: merge(Amplitude.initialAmplitudeData, props.amplitude),
                            oppdaterAmplitudeData: () => {},
                        }}
                    >
                        <FeatureToggle.FeaturetoggleContext.Provider
                            value={merge(
                                FeatureToggle.initialState,
                                props.featureToggle && {
                                    data: props.featureToggle,
                                },
                            )}
                        >
                            <ProfilContext.Provider
                                value={{
                                    profil: props.profil || null,
                                    lagreProfil: () => Promise.resolve(),
                                }}
                            >
                                <MeldepliktContext.Provider value={{ meldeplikt: props.meldeplikt || null }}>
                                    {children}
                                </MeldepliktContext.Provider>
                            </ProfilContext.Provider>
                        </FeatureToggle.FeaturetoggleContext.Provider>
                    </Amplitude.AmplitudeContext.Provider>
                </Arbeidssoker.ArbeidssokerContext.Provider>
            </Autentisering.AutentiseringContext.Provider>
        );
    };
};
