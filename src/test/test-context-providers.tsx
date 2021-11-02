import merge from 'merge-deep';
import * as Amplitude from '../ducks/amplitude-context';
import { AmplitudeData } from '../metrics/amplitude-utils';
import * as Autentisering from '../ducks/autentisering';
import * as Brukerregistrering from '../context/brukerregistrering';
import * as FeatureToggle from '../context/feature-toggles';
import * as Egenvurdering from '../ducks/egenvurdering';
import * as Oppfolging from '../context/oppfolging';
import * as UlesteDialoger from '../ducks/ulestedialoger';
import * as BrukerInfo from '../context/bruker-info';
import * as Meldekort from '../ducks/meldekort';
import * as Motestotte from '../ducks/motestotte';
import * as UnderOppfolging from '../ducks/under-oppfolging';
import * as PaabegynteSoknader from '../ducks/paabegynte-soknader';
import * as Sakstema from '../ducks/sakstema';
import * as React from 'react';
import { STATUS } from '../ducks/api';
import { setFastTidspunktForIDag } from '../utils/chrono';
import { GlobaleInnstillingerProps, GlobaleInnstillingerProvider } from '../context/GlobaleInnstillinger';
import KanViseVTA from '../komponenter/kan-vise-vta/kan-vise-vta';

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
    brukerInfo?: DeepPartial<BrukerInfo.Data>;
    meldekort?: DeepPartial<Meldekort.Data>;
    motestotte?: DeepPartial<Motestotte.Data>;
    underOppfolging?: DeepPartial<UnderOppfolging.Data>;
    paabegynteSoknader?: DeepPartial<PaabegynteSoknader.Data>;
    sakstema?: DeepPartial<Sakstema.Data>;
    iDag?: Date;
    globaleProps?: DeepPartial<GlobaleInnstillingerProps>;
};

export const contextProviders = function (props: ProviderProps): React.FunctionComponent {
    return ({ children }) => {
        setFastTidspunktForIDag(props.iDag ?? null);
        return (
            <Autentisering.AutentiseringContext.Provider
                value={merge(Autentisering.initialState, props.autentisering && { data: props.autentisering })}
            >
                <GlobaleInnstillingerProvider
                    kreverStandardInnsatsgruppe={props.globaleProps?.kreverStandardInnsatsgruppe}
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
                                                            <Sakstema.SakstemaContext.Provider
                                                                value={merge(
                                                                    Sakstema.initialState,
                                                                    props.sakstema && {
                                                                        data: props.sakstema,
                                                                    }
                                                                )}
                                                            >
                                                                <FeatureToggle.FeaturetoggleContext.Provider
                                                                    value={merge(
                                                                        FeatureToggle.initialState,
                                                                        props.featureToggle && {
                                                                            data: props.featureToggle,
                                                                        }
                                                                    )}
                                                                >
                                                                    <KanViseVTA>{children}</KanViseVTA>
                                                                </FeatureToggle.FeaturetoggleContext.Provider>
                                                            </Sakstema.SakstemaContext.Provider>
                                                        </PaabegynteSoknader.PaabegynteSoknaderContext.Provider>
                                                    </Amplitude.AmplitudeContext.Provider>
                                                </Motestotte.MotestotteContext.Provider>
                                            </Oppfolging.OppfolgingContext.Provider>
                                        </UnderOppfolging.UnderOppfolgingContext.Provider>
                                    </Egenvurdering.EgenvurderingContext.Provider>
                                </UlesteDialoger.UlesteDialogerContext.Provider>
                            </Brukerregistrering.BrukerregistreringContext.Provider>
                        </BrukerInfo.BrukerInfoContext.Provider>
                    </Meldekort.MeldekortContext.Provider>
                </GlobaleInnstillingerProvider>
            </Autentisering.AutentiseringContext.Provider>
        );
    };
};
