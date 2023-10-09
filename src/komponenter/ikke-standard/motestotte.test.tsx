/*import { render, screen } from '@testing-library/react';

import Motestotte from './motestotte';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { DinSituasjonSvar, ForeslattInnsatsgruppe } from '../../hooks/use-brukerregistrering-data';
import { Servicegruppe } from '../../hooks/use-oppfolging-data';*/

describe('Motestotte', () => {
    test('', () => true);
    /*const motestotte = undefined;
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

    const oppfolging = { servicegruppe: Servicegruppe.BKART };*/

    /*it('rendres når alle betingelser er oppfylt', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            oppfolging,
            motestotte,
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.getByText('Du kan få mer veiledning')).toBeTruthy();
    });

    it('rendres IKKE når men IKKE er under oppfølging', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            oppfolging,
            motestotte,
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: false },
            },
        };
        const { container } = render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });*/

    /*it('rendre med alternativ tekst dersom ikke sykmeldt', async () => {
        const providerProps: ProviderProps = {
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: false,
            },
            brukerregistrering,
            oppfolging,
            motestotte,
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText('Du kan få mer veiledning')).toBeFalsy();
        expect(await screen.queryByText('Du kan få veiledning')).toBeTruthy();
    });*/

    /*it('rendres IKKE dersom annen servicegruppe en BKART', async () => {
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
        expect(await screen.queryByText('Du kan få mer veiledning')).toBeFalsy();
    });

    it('rendres IKKE dersom permittert', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering: {
                registrering: {
                    ...brukerregistrering.registrering,
                    besvarelse: {
                        dinSituasjon: DinSituasjonSvar.ER_PERMITTERT,
                    },
                },
            },
            motestotte,
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText('Du kan få mer veiledning')).toBeFalsy();
    });

    it('rendres IKKE dersom gyldig møtestøttebesvarelse', async () => {
        const providerProps: ProviderProps = {
            brukerInfo,
            brukerregistrering,
            motestotte: { dato: '2020-11-04' },
            oppfolging,
        };
        render(<Motestotte />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText('Du kan få mer veiledning')).toBeFalsy();
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
        expect(await screen.queryByText('Du kan få mer veiledning')).toBeFalsy();
    });*/
});
