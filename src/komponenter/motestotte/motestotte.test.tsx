import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Motestotte from './motestotte';
import tekster from '../../tekster/tekster';
import { BrukerInfoContext, State as BrukerinfoState } from '../../ducks/bruker-info';
import { ReactChildren, ReactElement } from 'react';
import {
    BrukerregistreringContext,
    ForeslattInnsatsgruppe,
    initialState as brukerregistreringStarttilstand,
    State as BrukerregistreringState,
} from '../../ducks/brukerregistrering';
import {
    initialState as oppfolgingStarttilstand,
    OppfolgingContext,
    Servicegruppe,
    State as OppfolgingState,
} from '../../ducks/oppfolging';
import { MotestotteContext, State as MotestotteState } from '../../ducks/motestotte';
import { STATUS } from '../../ducks/api';

interface ProviderProps {
    brukerregistreringState: BrukerregistreringState;
    oppfolgingState: OppfolgingState;
    motestotteState: MotestotteState;
    brukerInfoState: BrukerinfoState;
}

function MotestotteProviders({
    brukerregistreringState,
    oppfolgingState,
    motestotteState,
    brukerInfoState,
}: ProviderProps): ({ children }: { children: ReactChildren }) => ReactElement {
    return ({ children }) => (
        <BrukerregistreringContext.Provider value={brukerregistreringState}>
            <OppfolgingContext.Provider value={oppfolgingState}>
                <MotestotteContext.Provider value={motestotteState}>
                    <BrukerInfoContext.Provider value={brukerInfoState}>{children}</BrukerInfoContext.Provider>
                </MotestotteContext.Provider>
            </OppfolgingContext.Provider>
        </BrukerregistreringContext.Provider>
    );
}

describe('Motestotte', () => {
    const brukerInfoState = {
        status: STATUS.OK,
        data: {
            erSykmeldtMedArbeidsgiver: true,
            alder: 40,
            rettighetsgruppe: '',
        },
    };
    const motestotteState = { status: STATUS.OK, data: null };
    const brukerregistreringState = {
        status: STATUS.OK,
        data: {
            registrering: {
                ...brukerregistreringStarttilstand.data.registrering,
                opprettetDato: '2020-11-02',
                besvarelse: {
                    ...brukerregistreringStarttilstand.data.registrering.besvarelse,
                    dinSituasjon: 'MISTET_JOBBEN',
                },
                profilering: {
                    innsatsgruppe: ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING,
                },
            },
        },
    };
    const oppfolgingState = {
        status: STATUS.OK,
        data: {
            ...oppfolgingStarttilstand.data,
            servicegruppe: Servicegruppe.BKART,
        },
    };

    it('rendres når alle betingelser er oppfylt', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState,
            motestotteState,
            oppfolgingState,
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.getByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeTruthy();
    });

    it('rendre med alternativ tekst dersom ikke sykmeldt', async () => {
        const providerProps = {
            brukerInfoState: {
                ...brukerInfoState,
                data: {
                    ...brukerInfoState.data,
                    erSykmeldtMedArbeidsgiver: false,
                },
            },
            brukerregistreringState,
            motestotteState,
            oppfolgingState,
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
        expect(await screen.queryByText(tekster['motestotte-ikkeSykmeldt-systemtittel'])).toBeTruthy();
    });

    it('rendres IKKE dersom annen servicegruppe en BKART', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState,
            motestotteState,
            oppfolgingState: {
                ...oppfolgingState,
                data: {
                    ...oppfolgingState.data,
                    servicegruppe: Servicegruppe.VARIG,
                },
            },
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom permittert', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState: {
                ...brukerregistreringState,
                data: {
                    ...brukerregistreringState.data,

                    registrering: {
                        ...brukerregistreringState.data.registrering,

                        besvarelse: {
                            ...brukerregistreringStarttilstand.data.registrering.besvarelse,
                            dinSituasjon: 'ER_PERMITTERT',
                        },
                    },
                },
            },
            motestotteState,
            oppfolgingState,
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom gyldig møtestøttebesvarelse', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState,
            motestotteState: {
                ...motestotteState,
                data: { dato: '2020-11-04' },
            },
            oppfolgingState,
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom reservasjonKrr', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState,
            motestotteState,
            oppfolgingState: {
                ...oppfolgingState,
                data: {
                    ...oppfolgingState.data,
                    reservasjonKRR: true,
                },
            },
        };
        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom annen foreslått innsatsgruppe', async () => {
        const providerProps = {
            brukerInfoState,
            brukerregistreringState: {
                ...brukerregistreringState,
                data: {
                    ...brukerregistreringState.data,

                    registrering: {
                        ...brukerregistreringState.data.registrering,

                        profilering: {
                            innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS,
                        },
                    },
                },
            },
            motestotteState,
            oppfolgingState,
        };

        render(<Motestotte />, { wrapper: MotestotteProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });
});
