import merge from 'merge-deep';
import * as Amplitude from '../ducks/amplitude-context';
import { AmplitudeData } from '../metrics/amplitude-utils';
import * as Autentisering from '../ducks/autentisering';
import * as Brukerregistrering from '../ducks/brukerregistrering';
import * as FeatureToggle from '../ducks/feature-toggles';
import * as Egenvurdering from '../ducks/egenvurdering';
import * as Oppfolging from '../ducks/oppfolging';
import * as UlesteDialoger from '../ducks/ulestedialoger';
import * as Jobbsokerbesvarelse from '../ducks/jobbsokerbesvarelse';
import * as BrukerInfo from '../ducks/bruker-info';
import * as Meldekort from '../ducks/meldekort';
import * as Motestotte from '../ducks/motestotte';
import * as UnderOppfolging from '../ducks/under-oppfolging';
import * as PaabegynteSoknader from '../ducks/paabegynte-soknader';
import * as React from 'react';
import { STATUS } from '../ducks/api';
import { setFastTidspunktForIDag } from '../utils/chrono';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ProviderProps = {
    autentisering?: DeepPartial<Autentisering.Data>;
    amplitude?: DeepPartial<AmplitudeData>;
    brukerregistrering?: DeepPartial<Brukerregistrering.Data> | null;
    featureToggle?: DeepPartial<FeatureToggle.Data>;
    egenvurdering?: DeepPartial<Egenvurdering.Data>;
    oppfolging?: DeepPartial<Oppfolging.Data>;
    ulesteDialoger?: DeepPartial<UlesteDialoger.Data>;
    jobbsokerbesvarelse?: DeepPartial<Jobbsokerbesvarelse.Data>;
    brukerInfo?: DeepPartial<BrukerInfo.Data>;
    meldekort?: DeepPartial<Meldekort.Data>;
    motestotte?: DeepPartial<Motestotte.Data>;
    underOppfolging?: DeepPartial<UnderOppfolging.Data>;
    paabegynteSoknader?: DeepPartial<PaabegynteSoknader.Data>;
    iDag?: Date;
};

export const contextProviders = function (props: ProviderProps): React.FunctionComponent {
    return ({ children }) => {
        setFastTidspunktForIDag(props.iDag ?? null);
        return (
            <Autentisering.AutentiseringContext.Provider
                value={merge(Autentisering.initialState, props.autentisering && { data: props.autentisering })}
            >
                <Meldekort.MeldekortContext.Provider
                    value={merge(Meldekort.initialState, props.meldekort && { data: props.meldekort })}
                >
                    <BrukerInfo.BrukerInfoContext.Provider
                        value={merge(BrukerInfo.initialState, props.brukerInfo && { data: props.brukerInfo })}
                    >
                        <Brukerregistrering.BrukerregistreringContext.Provider
                            value={
                                props.brukerregistrering === null
                                    ? { data: null, status: STATUS.OK }
                                    : merge(
                                          Brukerregistrering.initialState,
                                          props.brukerregistrering && { data: props.brukerregistrering }
                                      )
                            }
                        >
                            <UlesteDialoger.UlesteDialogerContext.Provider
                                value={merge(
                                    UlesteDialoger.initialState,
                                    props.ulesteDialoger && { data: props.ulesteDialoger }
                                )}
                            >
                                <Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider
                                    value={merge(
                                        Jobbsokerbesvarelse.initialState,
                                        props.jobbsokerbesvarelse && { data: props.jobbsokerbesvarelse }
                                    )}
                                >
                                    <Egenvurdering.EgenvurderingContext.Provider
                                        value={merge(
                                            Egenvurdering.initialState,
                                            props.egenvurdering && { data: props.egenvurdering }
                                        )}
                                    >
                                        <UnderOppfolging.UnderOppfolgingContext.Provider
                                            value={merge(
                                                UnderOppfolging.initialState,
                                                props.underOppfolging && { data: props.underOppfolging }
                                            )}
                                        >
                                            <Oppfolging.OppfolgingContext.Provider
                                                value={merge(
                                                    Oppfolging.initialState,
                                                    props.oppfolging && { data: props.oppfolging }
                                                )}
                                            >
                                                <Motestotte.MotestotteContext.Provider
                                                    value={merge(
                                                        Motestotte.initialState,
                                                        props.motestotte && { data: props.motestotte }
                                                    )}
                                                >
                                                    <Amplitude.AmplitudeContext.Provider
                                                        value={merge(Amplitude.initialState, props.amplitude)}
                                                    >
                                                        <PaabegynteSoknader.PaabegynteSoknaderContext.Provider
                                                            value={merge(
                                                                PaabegynteSoknader.initialState,
                                                                props.paabegynteSoknader && {
                                                                    data: props.paabegynteSoknader,
                                                                }
                                                            )}
                                                        >
                                                            <FeatureToggle.FeaturetoggleContext.Provider
                                                                value={merge(
                                                                    FeatureToggle.initialState,
                                                                    props.featureToggle && { data: props.featureToggle }
                                                                )}
                                                            >
                                                                {children}
                                                            </FeatureToggle.FeaturetoggleContext.Provider>
                                                        </PaabegynteSoknader.PaabegynteSoknaderContext.Provider>
                                                    </Amplitude.AmplitudeContext.Provider>
                                                </Motestotte.MotestotteContext.Provider>
                                            </Oppfolging.OppfolgingContext.Provider>
                                        </UnderOppfolging.UnderOppfolgingContext.Provider>
                                    </Egenvurdering.EgenvurderingContext.Provider>
                                </Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider>
                            </UlesteDialoger.UlesteDialogerContext.Provider>
                        </Brukerregistrering.BrukerregistreringContext.Provider>
                    </BrukerInfo.BrukerInfoContext.Provider>
                </Meldekort.MeldekortContext.Provider>
            </Autentisering.AutentiseringContext.Provider>
        );
    };
};
