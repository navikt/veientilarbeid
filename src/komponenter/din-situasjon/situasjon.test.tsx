import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Situasjon from './situasjon';
import { ComponentType } from 'react';

import userEvent from '@testing-library/user-event';
import { ProviderProps, contextProviders } from '../../test/test-context-providers';

describe('Tester situasjon-komponenten', () => {
    const vanligTekstIKomponent = 'Her kan du oppdatere situasjonen din';
    const permittertBrukerRegistrering = {
        registrering: { besvarelse: { dinSituasjon: 'ER_PERMITTERT' } },
    };
    const pakrevdeFeatureToggles = {
        'veientilarbeid.permittert.situasjon.endre': true,
        'veientilarbeid.permittert.ny-dialog': true,
    };

    it('rendres når bruker er permittert og feature toggles aktivert', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
            featureToggle: pakrevdeFeatureToggles,
        };
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(screen.getByText(vanligTekstIKomponent)).toBeTruthy();
    });

    it('rendres IKKE når default-state er brukt', async () => {
        const providerProps: ProviderProps = {};
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendres IKKE uten feature toggles aktivert', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
        };
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendres IKKE når default-state er brukt, men med feature toggles', async () => {
        const providerProps: ProviderProps = {
            featureToggle: pakrevdeFeatureToggles,
        };
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(await screen.queryByText(vanligTekstIKomponent)).toBeFalsy();
    });

    it('rendrer dato på menneskelig lesbart format', async () => {
        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
            featureToggle: pakrevdeFeatureToggles,
            situasjon: { opprettet: '2019-04-07T11:53:05.486686+01:00' },
        };
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });
        expect(screen.getByText('Sist endret 7. april 2019', { exact: false })).toBeTruthy();
    });

    it('komponenten fungerer som en lenke', async () => {
        const mockLocationAssign = jest.fn();
        window.location.assign = mockLocationAssign;

        const providerProps: ProviderProps = {
            brukerregistrering: permittertBrukerRegistrering,
            featureToggle: pakrevdeFeatureToggles,
        };
        render(<Situasjon />, { wrapper: contextProviders(providerProps) as ComponentType });

        const situasjonKomponent = screen.getByText(vanligTekstIKomponent);
        userEvent.click(situasjonKomponent);

        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });
});
