import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import MeldekortIntroWrapper from './meldekort-intro';
import { Formidlingsgruppe, Servicegruppe } from '../../ducks/oppfolging';
import { regexMatcher } from '../../utils/test-utils';
import { plussDager } from '../../utils/date-utils';

const meldekort = {
    maalformkode: 'NO',
    meldeform: 'EMELD',
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: '2021-01-18T12:00:00+01:00',
                til: '2021-01-31T12:00:00+01:00',
                kortKanSendesFra: '2021-01-30T12:00:00+01:00',
                kanKortSendes: true,
                periodeKode: '202103',
            },
            meldegruppe: 'ARBS',
            kortStatus: 'OPPRE',
            bruttoBelop: 0.0,
            erForskuddsPeriode: false,
            korrigerbart: true,
        },
    ],
    etterregistrerteMeldekort: [],
    id: '1',
    antallGjenstaaendeFeriedager: 0,
};

const providerProps: ProviderProps = {
    meldekort: meldekort,
    brukerInfo: {
        rettighetsgruppe: 'DAGP',
    },
    amplitude: {
        ukerRegistrert: 2,
    },
    oppfolging: {
        formidlingsgruppe: Formidlingsgruppe.ARBS,
        servicegruppe: Servicegruppe.IKVAL,
    },
};

function propsForRelativDag(dag: number): any {
    const sendedag = '2021-01-30T12:00:00+01:00';
    const dagerRelativtTilSendedag = dag + 2;

    return {
        meldekort: {
            meldekort: [
                {
                    ...meldekort.meldekort[0],
                    meldeperiode: {
                        fra: '2021-01-18T12:00:00+01:00',
                        til: '2021-01-31T12:00:00+01:00',
                        kortKanSendesFra: sendedag,
                        kanKortSendes: dag >= -2,
                        periodeKode: '202103',
                    },
                },
            ],
        },
        iDag: plussDager(new Date(sendedag), dagerRelativtTilSendedag),
    };
}

describe('tester onboarding komponenten for meldekort', () => {
    test('funksjonen for neste og forrige kort fungerer for nyregistrerte', () => {
        const props: ProviderProps = { ...providerProps, amplitude: { ukerRegistrert: 0 } };
        render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        const startKnapp = screen.getByText(/Gå i gang/i);
        expect(screen.getByText(/2 minutter lesetid/i)).toBeInTheDocument();
        userEvent.click(startKnapp);
        const nesteknapp = screen.getByText(/neste/i);
        const forrigeknapp = screen.getByText(/forrige/i);

        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        expect(nesteknapp).toBeEnabled();
        expect(forrigeknapp).toBeDisabled();

        // Navigerer seg gjennom kortene - fremover
        userEvent.click(nesteknapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(nesteknapp);
        expect(screen.getByText(/3 av 3/i)).toBeInTheDocument();
        expect(screen.getByText(/avslutt introduksjon/i)).toBeEnabled();

        // Kan gå tilbake til side 1
        userEvent.click(forrigeknapp);
        expect(screen.getByText(/2 av 3/i)).toBeInTheDocument();
        userEvent.click(forrigeknapp);
        expect(screen.getByText(/1 av 3/i)).toBeInTheDocument();
        expect(forrigeknapp).toBeDisabled();

        // Gå helt til siste side
        userEvent.click(nesteknapp);
        userEvent.click(nesteknapp);
        userEvent.click(screen.getByText(/avslutt introduksjon/i));
        expect(screen.getByText(/Innsending av meldekort/i)).toBeInTheDocument();
        expect(nesteknapp).not.toBeInTheDocument();
        expect(forrigeknapp).not.toBeInTheDocument();
    });

    test('man starter på endstate uten navigeringsvalg om man har vært registrert i minst én uke', () => {
        const props: ProviderProps = { ...providerProps, amplitude: { ukerRegistrert: 1 } };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.queryByText(/neste/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/forrige/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/av 4/i)).not.toBeInTheDocument();
    });

    test('Viser ingen meldekort-boks for brukere uten meldekort', () => {
        const props: ProviderProps = { ...providerProps, meldekort: { meldekort: [] } };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Viser info om førstkommende tilgjengelige meldekort', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(-3),
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(
            screen.getByText(/Meldekort for uke 3 og 4 blir tilgjengelig for innsending fra lørdag 30. januar/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Les om meldekort/i)).toBeInTheDocument();
    });

    test('Ett meldekort klart til innsending vises på dag -2 ', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(-2),
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/Du kan nå sende inn meldekort/i)).toBeInTheDocument();
        expect(screen.getByText(/Send inn for uke 3 og 4/i)).toBeInTheDocument();
        expect(screen.getByText(/Fristen er mandag 8. februar, klokken 23.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Vis introduksjon til meldekort/i)).toBeInTheDocument();
    });

    test('På vei til å bli for sent på dag 1 (null stress)', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(1),
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(regexMatcher(/Du har 6 dager på å sende inn meldekort/i))).toBeInTheDocument();
        expect(screen.getByText(/Send inn for uke 3 og 4/i)).toBeInTheDocument();
        expect(screen.getByText(/Fristen er mandag 8. februar, klokken 23.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Vis introduksjon til meldekort/i)).toBeInTheDocument();
        expect(screen.queryByText(/Dersom du ikke sender inn meldekort/i)).not.toBeInTheDocument();
    });

    test('På vei til å bli for sent på dag 5 (litt strengere)', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(5),
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(regexMatcher(/Du har 2 dager på å sende inn meldekort/i))).toBeInTheDocument();
        expect(screen.getByText(/Send inn for uke 3 og 4/i)).toBeInTheDocument();
        expect(screen.getByText(/Fristen er mandag 8. februar, klokken 23.00/i)).toBeInTheDocument();
        expect(screen.getByText(/Dersom du ikke sender inn meldekort/i)).toBeInTheDocument();
    });

    test('Siste frist for sending av meldekort (dag 7)', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(7),
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/Send inn for uke 3 og 4/i)).toBeInTheDocument();
        expect(
            screen.getByText(/Siste frist for innsending av meldekortet er i kveld klokken 23.00/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/Dersom du ikke sender inn meldekort/i)).toBeInTheDocument();
    });

    test('Vises ikke når fristen for å sende inn meldekortet er passert, og bruker har blitt inaktivert', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(8),
            oppfolging: { ...providerProps.oppfolging, kanReaktiveres: true },
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Fristen for å sende inn meldekortet er passert, men bruker har ikke blitt inaktivert ennå', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(8),
            oppfolging: { ...providerProps.oppfolging, kanReaktiveres: false },
        };
        const { container } = render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/Send inn for uke 3 og 4/i)).toBeInTheDocument();
        expect(screen.getByText(/Siste frist for innsending av meldekortet er i kveld/i)).toBeInTheDocument();
        expect(screen.getByText(/Dersom du ikke sender inn meldekort/i)).toBeInTheDocument();
    });

    test('Viser dagpenge-advarsel for brukere med rettighetsgruppe DAGP', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(7),
            brukerInfo: { rettighetsgruppe: 'DAGP' },
        };
        render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/utbetaling av dagpenger stoppes/i)).toBeInTheDocument();
        expect(screen.queryByText(/en eventuell søknad om dagpenger kan bli avslått/i)).not.toBeInTheDocument();
    });

    test('Viser en annen tekst for brukere med rettighetsgruppe IYT', () => {
        const props: ProviderProps = {
            ...providerProps,
            ...propsForRelativDag(7),
            brukerInfo: { rettighetsgruppe: 'IYT' },
        };
        render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(screen.queryByText(/utbetaling av dagpenger stoppes/i)).not.toBeInTheDocument();
        expect(screen.getByText(/en eventuell søknad om dagpenger kan bli avslått/i)).toBeInTheDocument();
    });

    test('Mer enn ett meldekort tilgjengelig for innsending', () => {
        const props: ProviderProps = {
            ...providerProps,
            meldekort: {
                meldekort: [
                    {
                        ...meldekort.meldekort[0],
                        meldeperiode: {
                            fra: '2021-01-18T12:00:00+01:00',
                            til: '2021-01-31T12:00:00+01:00',
                            kortKanSendesFra: '2021-01-30T12:00:00+01:00',
                            kanKortSendes: true,
                            periodeKode: '202103',
                        },
                    },
                    {
                        ...meldekort.meldekort[0],
                        meldeperiode: {
                            fra: '2021-02-01T12:00:00+01:00',
                            til: '2021-02-14T12:00:00+01:00',
                            kortKanSendesFra: '2021-02-12T12:00:00+01:00',
                            kanKortSendes: true,
                            periodeKode: '202103',
                        },
                    },
                ],
            },
            iDag: new Date('2021-02-12T12:00:00+01:00'),
        };
        render(<MeldekortIntroWrapper />, { wrapper: contextProviders(props) });
        expect(screen.getByText(/Du har 2 meldekort/i)).toBeInTheDocument();
    });
});
