import * as React from 'react';
import merge from 'merge-deep';

import * as Amplitude from '../contexts/amplitude-context';
import { AmplitudeData } from '../metrics/amplitude-utils';
import * as Autentisering from '../contexts/autentisering';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as FeatureToggle from '../contexts/feature-toggles';
import * as Egenvurdering from '../contexts/egenvurdering';
import * as Oppfolging from '../contexts/oppfolging';
import * as UlesteDialoger from '../contexts/ulestedialoger';
import * as BrukerInfo from '../contexts/bruker-info';
import * as Meldekort from '../contexts/meldekort';
import * as Motestotte from '../contexts/motestotte';
import * as Sakstema from '../contexts/sakstema';
import * as Arbeidssoker from '../contexts/arbeidssoker';
import { STATUS } from '../ducks/api';
import { setFastTidspunktForIDag } from '../utils/chrono';
import { GlobaleInnstillingerProps, GlobaleInnstillingerProvider } from '../contexts/GlobaleInnstillinger';
import KanViseVTA from '../komponenter/kan-vise-vta/kan-vise-vta';
import { Profil } from '../profil';
import { ProfilContext } from '../contexts/profil';

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
    sakstema?: DeepPartial<Sakstema.Data>;
    iDag?: Date;
    profil?: Profil;
    globaleProps?: DeepPartial<GlobaleInnstillingerProps>;
    arbeidssoker?: Arbeidssoker.Data;
};

export const contextProviders = function (props: ProviderProps): React.FunctionComponent {
    return ({ children }) => {
        setFastTidspunktForIDag(props.iDag ?? null);
        return (
            <Autentisering.AutentiseringContext.Provider
                value={merge(Autentisering.initialState, props.autentisering && { data: props.autentisering })}
            >
                <Arbeidssoker.ArbeidssokerContext.Provider
                    value={merge(Arbeidssoker.initialState, props.arbeidssoker && { data: props.arbeidssoker })}
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
                                                                <ProfilContext.Provider
                                                                    value={{
                                                                        profil: props.profil || null,
                                                                        lagreProfil: () => Promise.resolve(),
                                                                    }}
                                                                >
                                                                    <KanViseVTA>{children}</KanViseVTA>
                                                                </ProfilContext.Provider>
                                                            </FeatureToggle.FeaturetoggleContext.Provider>
                                                        </Sakstema.SakstemaContext.Provider>
                                                    </Amplitude.AmplitudeContext.Provider>
                                                </Motestotte.MotestotteContext.Provider>
                                            </Oppfolging.OppfolgingContext.Provider>
                                        </Egenvurdering.EgenvurderingContext.Provider>
                                    </UlesteDialoger.UlesteDialogerContext.Provider>
                                </Brukerregistrering.BrukerregistreringContext.Provider>
                            </BrukerInfo.BrukerInfoContext.Provider>
                        </Meldekort.MeldekortContext.Provider>
                    </GlobaleInnstillingerProvider>
                </Arbeidssoker.ArbeidssokerContext.Provider>
            </Autentisering.AutentiseringContext.Provider>
        );
    };
};
