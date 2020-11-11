import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Motestotte from './motestotte';
import tekster from '../../tekster/tekster';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { ForeslattInnsatsgruppe } from '../../ducks/brukerregistrering';
import { Servicegruppe } from '../../ducks/oppfolging';

describe('Motestotte', () => {
    const brukerInfo = { erSykmeldtMedArbeidsgiver: true };
    const motestotte = undefined;
    const brukerregistrering = {
        registrering: {
            opprettetDato: '2020-11-02',
            besvarelse: {
                dinSituasjon: 'MISTET_JOBBEN',
            },
            profilering: {
                innsatsgruppe: ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING,
            },
        },
    };
    const oppfolging = { servicegruppe: Servicegruppe.BKART };

    it('rendres når alle betingelser er oppfylt', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            motestotte,
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.getByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeTruthy();
    });

    it('rendre med alternativ tekst dersom ikke sykmeldt', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            brukerregistrering,
            motestotte,
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
        expect(await screen.queryByText(tekster['motestotte-ikkeSykmeldt-systemtittel'])).toBeTruthy();
    });

    it('rendres IKKE dersom annen servicegruppe en BKART', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            motestotte,
            oppfolging: {
                ...oppfolging,
                servicegruppe: Servicegruppe.VARIG,
            },
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom permittert', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering: {
                registrering: {
                    ...brukerregistrering.registrering,
                    besvarelse: {
                        dinSituasjon: 'ER_PERMITTERT',
                    },
                },
            },
            motestotte,
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom gyldig møtestøttebesvarelse', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            motestotte: { dato: '2020-11-04' },
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom reservasjonKrr', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            motestotte,
            oppfolging: {
                ...oppfolging,
                reservasjonKRR: true,
            },
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });

    it('rendres IKKE dersom annen foreslått innsatsgruppe', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering: {
                registrering: {
                    ...brukerregistrering.registrering,

                    profilering: {
                        innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS,
                    },
                },
            },
            motestotte,
            oppfolging,
        };

        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(tekster['motestotte-sykmeldt-systemtittel'])).toBeFalsy();
    });
});
