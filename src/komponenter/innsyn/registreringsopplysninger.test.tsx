import { render, screen } from '@testing-library/react';

import Opplysninger from './registreringsopplysninger';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { DinSituasjonSvar } from '../../hooks/use-brukerregistrering-data';

const registreringsopplysninger = {
    manueltRegistrertAv: null,
    opprettetDato: '2020-01-03T11:53:05.486686+01:00',
    besvarelse: {
        utdanning: 'INGEN_UTDANNING',
        utdanningBestatt: 'INGEN_SVAR',
        utdanningGodkjent: 'INGEN_SVAR',
        helseHinder: 'NEI',
        andreForhold: 'NEI',
        sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
        dinSituasjon: DinSituasjonSvar.MISTET_JOBBEN,
        fremtidigSituasjon: 'NY_ARBEIDSGIVER',
        tilbakeIArbeid: 'USIKKER',
    },
    profilering: {
        innsatsgruppe: 'SITUASJONSBESTEMT_INNSATS',
    },
    teksterForBesvarelse: [
        {
            sporsmalId: 'fremtidigSituasjon',
            sporsmal: 'Hva tenker du om din fremtidige situasjon?',
            svar: 'Jeg trenger ny jobb',
        },
        {
            sporsmalId: 'utdanningBestatt',
            sporsmal: 'Er utdanningen din bestått?',
            svar: 'Ikke aktuelt svar',
        },
        {
            sporsmalId: 'utdanningGodkjent',
            sporsmal: 'Er utdanningen din godkjent i Norge?',
            svar: 'Ikke aktuelt',
        },
        {
            sporsmalId: 'utdanning',
            sporsmal: 'Hva er din høyeste fullførte utdanning?',
            svar: 'Ingen utdanning',
        },
        {
            sporsmalId: 'andreForhold',
            sporsmal: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
            svar: 'Nei',
        },
    ],
};

const registreringsopplysningerMellomperiodeMedJobb = {
    manueltRegistrertAv: null,
    id: 103,
    opprettetDato: new Date().toISOString(),
    besvarelse: {
        utdanning: 'HOYERE_UTDANNING_5_ELLER_MER',
        utdanningBestatt: 'JA',
        utdanningGodkjent: 'JA',
        helseHinder: 'NEI',
        andreForhold: 'NEI',
        sisteStilling: 'INGEN_SVAR',
        dinSituasjon: 'MISTET_JOBBEN',
    },
    profilering: {
        innsatsgruppe: 'STANDARD_INNSATS',
    },
    teksterForBesvarelse: [
        {
            sporsmalId: 'dinSituasjon',
            sporsmal: 'Velg den situasjonen som passer deg best',
            svar: 'Har mistet eller kommer til å miste jobben',
        },
        {
            sporsmalId: 'utdanning',
            sporsmal: 'Hva er din høyeste fullførte utdanning?',
            svar: 'Høyere utdanning (5 år eller mer)',
        },
        {
            sporsmalId: 'utdanningGodkjent',
            sporsmal: 'Er utdanningen din godkjent i Norge?',
            svar: 'Ja',
        },
        { sporsmalId: 'utdanningBestatt', sporsmal: 'Er utdanningen din bestått?', svar: 'Ja' },
        {
            sporsmalId: 'andreForhold',
            sporsmal: 'Har du andre problemer med å søke eller være i jobb?',
            svar: 'Nei',
        },
        {
            sporsmalId: 'sisteStilling',
            sporsmal: '',
            svar: 'Ikke besvart',
        },
        {
            sporsmalId: 'helseHinder',
            sporsmal: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
            svar: 'Nei',
        },
    ],
    sisteStilling: {
        label: 'Racerbilsjåfør',
        konseptId: -1,
        styrk08: 'X',
    },
};

const registreringsopplysningerMellomperiodeMedJobbUtenLabel = {
    manueltRegistrertAv: null,
    id: 103,
    opprettetDato: new Date().toISOString(),
    besvarelse: {
        utdanning: 'HOYERE_UTDANNING_5_ELLER_MER',
        utdanningBestatt: 'JA',
        utdanningGodkjent: 'JA',
        helseHinder: 'NEI',
        andreForhold: 'NEI',
        sisteStilling: 'INGEN_SVAR',
        dinSituasjon: 'MISTET_JOBBEN',
    },
    profilering: {
        innsatsgruppe: 'STANDARD_INNSATS',
    },
    teksterForBesvarelse: [
        {
            sporsmalId: 'dinSituasjon',
            sporsmal: 'Velg den situasjonen som passer deg best',
            svar: 'Har mistet eller kommer til å miste jobben',
        },
        {
            sporsmalId: 'utdanning',
            sporsmal: 'Hva er din høyeste fullførte utdanning?',
            svar: 'Høyere utdanning (5 år eller mer)',
        },
        {
            sporsmalId: 'utdanningGodkjent',
            sporsmal: 'Er utdanningen din godkjent i Norge?',
            svar: 'Ja',
        },
        { sporsmalId: 'utdanningBestatt', sporsmal: 'Er utdanningen din bestått?', svar: 'Ja' },
        {
            sporsmalId: 'andreForhold',
            sporsmal: 'Har du andre problemer med å søke eller være i jobb?',
            svar: 'Nei',
        },
        {
            sporsmalId: 'sisteStilling',
            sporsmal: '',
            svar: 'Ikke besvart',
        },
        {
            sporsmalId: 'helseHinder',
            sporsmal: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
            svar: 'Nei',
        },
    ],
    sisteStilling: {
        label: '',
        konseptId: -1,
        styrk08: 'X',
    },
};

const registreringsopplysningerMellomperiodeUtenJobb = {
    manueltRegistrertAv: null,
    id: 103,
    opprettetDato: new Date().toISOString(),
    besvarelse: {
        utdanning: 'HOYERE_UTDANNING_5_ELLER_MER',
        utdanningBestatt: 'JA',
        utdanningGodkjent: 'JA',
        helseHinder: 'NEI',
        andreForhold: 'NEI',
        sisteStilling: 'HAR_IKKE_HATT_JOBB',
        dinSituasjon: 'MISTET_JOBBEN',
    },
    profilering: {
        innsatsgruppe: 'STANDARD_INNSATS',
    },
    teksterForBesvarelse: [
        {
            sporsmalId: 'dinSituasjon',
            sporsmal: 'Velg den situasjonen som passer deg best',
            svar: 'Har mistet eller kommer til å miste jobben',
        },
        {
            sporsmalId: 'utdanning',
            sporsmal: 'Hva er din høyeste fullførte utdanning?',
            svar: 'Høyere utdanning (5 år eller mer)',
        },
        {
            sporsmalId: 'utdanningGodkjent',
            sporsmal: 'Er utdanningen din godkjent i Norge?',
            svar: 'Ja',
        },
        { sporsmalId: 'utdanningBestatt', sporsmal: 'Er utdanningen din bestått?', svar: 'Ja' },
        {
            sporsmalId: 'andreForhold',
            sporsmal: 'Har du andre problemer med å søke eller være i jobb?',
            svar: 'Nei',
        },
        {
            sporsmalId: 'sisteStilling',
            sporsmal: '',
            svar: 'Har ikke vært i jobb',
        },
        {
            sporsmalId: 'helseHinder',
            sporsmal: 'Har du helseproblemer som hindrer deg i å søke eller være i jobb?',
            svar: 'Nei',
        },
    ],
    sisteStilling: {
        label: 'Racerbilsjåfør',
        konseptId: -1,
        styrk08: 'X',
    },
};

describe('Tester registreringsopplysninger komponenten', () => {
    test('Rendrer komponenten og tekstene', () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Opplysninger {...registreringsopplysninger} />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/du kan endre opplysningene du ga ved å kontakte nav./i)).toBeTruthy();
        const { teksterForBesvarelse } = registreringsopplysninger;
        teksterForBesvarelse.forEach(({ sporsmal, svar }) => {
            expect(screen.getByText(sporsmal)).toBeTruthy();
            expect(screen.getAllByText(svar)).toBeTruthy();
        });
        expect(screen.queryAllByAltText(/denne teksten skal ikke være her/i).length).toBe(0);
    });

    test('Tester at fiks for visning av data fra mellomperioden fungerer - med jobb', () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Opplysninger {...registreringsopplysningerMellomperiodeMedJobb} />, {
            wrapper: contextProviders(props),
        });
        expect(screen.getByText(/racerbilsjåfør/i)).toBeTruthy();
    });

    test('Tester at fiks for visning av data fra mellomperioden fungerer - med jobb uten label', () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Opplysninger {...registreringsopplysningerMellomperiodeMedJobbUtenLabel} />, {
            wrapper: contextProviders(props),
        });
        expect(screen.getByText(/ikke oppgitt/i)).toBeTruthy();
    });

    test('Tester at fiks for visning av data fra mellomperioden fungerer - uten jobb', () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: true },
            },
        };
        render(<Opplysninger {...registreringsopplysningerMellomperiodeUtenJobb} />, {
            wrapper: contextProviders(props),
        });
        expect(screen.getByText(/ingen yrkeserfaring/i)).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            arbeidssoker: {
                arbeidssokerperioder: { status: 200, arbeidssokerperioder: [] },
                underoppfolging: { status: 200, underoppfolging: false },
            },
        };
        const { container } = render(<Opplysninger {...registreringsopplysninger} />, {
            wrapper: contextProviders(props),
        });
        expect(container).toBeEmptyDOMElement();
    });
});
