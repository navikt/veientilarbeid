import { render, screen } from '@testing-library/react';

import Motestotte, * as MotestotteData from './motestotte';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from '../../hooks/use-brukerregistrering-data';
import { Servicegruppe } from '../../hooks/use-oppfolging-data';
import { setupServer } from 'msw/node';
import { beforeAll } from 'vitest';
import msw_get from '../../mocks/msw-utils';
import { ARBEIDSOKER_INNHOLD, STATUS } from '../../ducks/api';
import { SWRConfig } from 'swr';

describe('Motestotte', () => {
    const brukerInfo = { erSykmeldtMedArbeidsgiver: true };
    const brukerregistrering = {
        registrering: {
            opprettetDato: '2020-11-02',
            besvarelse: {
                dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
            },
            profilering: {
                innsatsgruppe: ForeslattInnsatsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING,
            },
        },
    };
    const oppfolging = { servicegruppe: Servicegruppe.BKART };
    const arbeidssokerInnhold = {
        brukerInfo: { data: brukerInfo },
        brukerregistrering: { data: brukerregistrering },
        oppfolging: { data: oppfolging },
    };

    const server = setupServer();
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
        server.resetHandlers();
    });

    it('rendres når alle betingelser er oppfylt', async () => {
        server.use(msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnhold));
        const providerProps: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
            { wrapper: contextProviders(providerProps) },
        );
        expect(await screen.findByText('Du kan få mer veiledning')).toBeTruthy();
    });

    it('rendres IKKE når man IKKE er under oppfølging', async () => {
        server.use(msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnhold));
        const providerProps: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: false },
            },
        };
        const { container } = render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
            { wrapper: contextProviders(providerProps) },
        );
        expect(container).toBeEmptyDOMElement();
    });

    it('rendre med alternativ tekst dersom ikke sykmeldt', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, {
                ...arbeidssokerInnhold,
                brukerInfo: { data: { ...brukerInfo, erSykmeldtMedArbeidsgiver: false } },
            }),
        );
        const providerProps: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
            { wrapper: contextProviders(providerProps) },
        );
        expect(await screen.findByText('Du kan få veiledning')).toBeTruthy();
    });

    it('rendres IKKE dersom annen servicegruppe en BKART', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, {
                ...arbeidssokerInnhold,
                oppfolging: { data: { ...oppfolging, servicegruppe: Servicegruppe.VARIG } },
            }),
        );
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
        );
        let nonExist = false;
        try {
            await screen.findByText('Du kan få mer veiledning');
        } catch (error) {
            nonExist = true;
        }
        expect(nonExist).toEqual(true);
    });

    it('rendres IKKE dersom permittert', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, {
                ...arbeidssokerInnhold,
                brukerregistrering: {
                    data: {
                        registrering: {
                            ...arbeidssokerInnhold.brukerregistrering.data.registrering,
                            besvarelse: {
                                dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
                            },
                        },
                    },
                },
            }),
        );
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
        );
        let nonExist = false;
        try {
            await screen.findByText('Du kan få mer veiledning');
        } catch (error) {
            nonExist = true;
        }
        expect(nonExist).toEqual(true);
    });

    it('rendres IKKE dersom gyldig møtestøttebesvarelse', async () => {
        server.use(msw_get(ARBEIDSOKER_INNHOLD, arbeidssokerInnhold));
        const state: MotestotteData.State = {
            status: STATUS.OK,
            data: { dato: '2020-11-04' },
        };
        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte state={state} />
            </SWRConfig>,
        );
        let nonExist = false;
        try {
            await screen.findByText('Du kan få mer veiledning');
        } catch (error) {
            nonExist = true;
        }
        expect(nonExist).toEqual(true);
    });

    it('rendres IKKE dersom annen foreslått innsatsgruppe', async () => {
        server.use(
            msw_get(ARBEIDSOKER_INNHOLD, {
                ...arbeidssokerInnhold,
                brukerregistrering: {
                    data: {
                        ...brukerregistrering,
                        registrering: {
                            ...brukerregistrering.registrering,
                            profilering: {
                                innsatsgruppe: ForeslattInnsatsgruppe.STANDARD_INNSATS,
                            },
                        },
                    },
                },
            }),
        );

        render(
            <SWRConfig value={{ provider: () => new Map() }}>
                <Motestotte />
            </SWRConfig>,
        );
        let nonExist = false;
        try {
            await screen.findByText('Du kan få mer veiledning');
        } catch (error) {
            nonExist = true;
        }
        expect(nonExist).toEqual(true);
    });
});
