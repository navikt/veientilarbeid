import { render, screen } from '@testing-library/react';

import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import Reaktivering from './reaktivering';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import levertMeldekortMock from '../../mocks/meldeplikt-hendelser.mock';
import { Meldeplikt } from '../../contexts/meldeplikt';

describe('Tester at komponenten rendres slik den skal', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('Riktig tekst vises dersom brukeren ikke har tatt stilling til om de fortsatt vil være arbeidssøker', async () => {
        const providerProps: ProviderProps = { profil: {} };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(screen.getByText(/Har du mottatt dagpenger vil utbetalingene nå være stoppet/i)).toBeInTheDocument();
    });

    test('Viser reaktivering-kanskje-aktuelt dersom brukeren ikke har svart nei på spørsmål 5', async () => {
        const meldeplikt: Meldeplikt = levertMeldekortMock(false);
        const providerProps: ProviderProps = { profil: {}, meldeplikt };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/du sa at du ønsket/i)).toBeInTheDocument();
    });

    test('Riktig tekst vises dersom brukeren ikke har behov for å være arbeidssøker', async () => {
        const providerProps: ProviderProps = {
            profil: { aiaReaktiveringVisning: { valg: 'nei', oppdatert: new Date().toISOString() } },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(await screen.queryByText(/mottatt dagpenger vil utbetalingene nå være stoppet/)).not.toBeInTheDocument();
    });

    test('Riktig tekst vises dersom brukeren ikke har behov for å være arbeidssøker selv om meldekortet sier noe annet', async () => {
        const meldeplikt: Meldeplikt = levertMeldekortMock(true);
        const providerProps: ProviderProps = {
            profil: { aiaReaktiveringVisning: { valg: 'nei', oppdatert: new Date('2022-11-01').toISOString() } },
            meldeplikt: { ...meldeplikt, eventOpprettet: new Date('2022-10-01').toISOString() },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(screen.getByText(/registrer deg som arbeidssøker/i)).toBeInTheDocument();
        expect(await screen.queryByText(/mottatt dagpenger vil utbetalingene nå være stoppet/)).not.toBeInTheDocument();
    });

    test('Riktig tekst vises meldekortet er nyere enn profilsvar', async () => {
        const meldeplikt: Meldeplikt = levertMeldekortMock(false);
        const providerProps: ProviderProps = {
            profil: { aiaReaktiveringVisning: { valg: 'ja', oppdatert: new Date('2022-10-01').toISOString() } },
            meldeplikt: { ...meldeplikt, eventOpprettet: new Date('2022-11-01').toISOString() },
        };
        render(<Reaktivering />, { wrapper: contextProviders(providerProps) });
        expect(await screen.queryByText(/mottatt dagpenger vil utbetalingene nå være stoppet/)).not.toBeInTheDocument();
    });
});
