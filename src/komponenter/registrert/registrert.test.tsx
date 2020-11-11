import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { InnloggingsNiva } from '../../ducks/autentisering';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

import Registrert from './registrert';
import { Formidlingsgruppe } from '../../ducks/oppfolging';
import { ForeslattInnsatsgruppe, FremtidigSituasjonSvar } from '../../ducks/brukerregistrering';

describe('Test av registreringskomponenten', () => {
    test('Komponenten vises IKKE dersom man ikke har ARBS og nivå 4', () => {
        const providerProps: ProviderProps = {};
        const { container } = render(<Registrert />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten VISES dersom man har ARBS og er logget inn på nivå 4', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        render(<Registrert />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/du er registrert som arbeidssøker/i)).toBeInTheDocument();
    });

    test('Komponenten viser innsynskomponent dersom man har ARBS, er logget inn på nivå 4 og har besvarelse', () => {
        const providerProps: ProviderProps = {
            autentisering: {
                securityLevel: InnloggingsNiva.LEVEL_4,
            },
            brukerregistrering: {
                registrering: {
                    opprettetDato: '2020-01-03T11:53:05.486686+01:00',
                    besvarelse: {
                        utdanning: 'INGEN_UTDANNING',
                        utdanningBestatt: 'INGEN_SVAR',
                        utdanningGodkjent: 'INGEN_SVAR',
                        helseHinder: 'NEI',
                        andreForhold: 'NEI',
                        sisteStilling: 'Barne- og ungdomsarbeider i skolefritidsordning',
                        dinSituasjon: 'MISTET_JOBBEN',
                        fremtidigSituasjon: FremtidigSituasjonSvar.NY_ARBEIDSGIVER,
                        tilbakeIArbeid: 'USIKKER',
                    },
                    profilering: {
                        innsatsgruppe: ForeslattInnsatsgruppe.SITUASJONSBESTEMT_INNSATS,
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
                            svar: 'Ikke aktuelt',
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
                },
            },
            oppfolging: {
                formidlingsgruppe: Formidlingsgruppe.ARBS,
            },
        };
        render(<Registrert />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/du er registrert som arbeidssøker/i)).toBeInTheDocument();
        expect(screen.getByText(/se svarene fra registreringen/i)).toBeInTheDocument();
    });
});
