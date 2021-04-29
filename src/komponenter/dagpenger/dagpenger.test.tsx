import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dagpenger from './dagpenger';
import tekster from '../../tekster/tekster';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

describe('Tester dagpengerkomponenten', () => {
    const oldLocation = global.window.location;

    afterEach(() => {
        delete global.window.location;
        global.window.location = Object.assign({}, oldLocation);
    });

    test('Komponenten rendres når bruker er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        render(<Dagpenger />, { wrapper: contextProviders(props) });
        expect(screen.getByText(tekster['dagpenger-tittel'])).toBeTruthy();
        expect(screen.getByText(tekster['dagpenger-tekst'])).toBeTruthy();
        expect(screen.getByText(tekster['dagpenger-lenke-tekst'])).toBeTruthy();
    });

    test('Komponenten rendres IKKE når bruker er under oppfølging og sykmeldt med arbiedsgiver', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
            brukerInfo: {
                erSykmeldtMedArbeidsgiver: true,
            },
        };
        const { container } = render(<Dagpenger />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Knappen fungerer som den skal', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: true },
        };
        const onClick = jest.fn();
        const mockLocationAssign = jest.fn();

        delete global.window.location;
        global.window.location = ({ assign: mockLocationAssign } as unknown) as Location;

        render(<Dagpenger />, { wrapper: contextProviders(props) });

        const button = screen.getByRole('button', { name: tekster['dagpenger-lenke-tekst'] });
        button.onclick = onClick;
        userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(mockLocationAssign).toHaveBeenCalledTimes(1);
    });

    test('Komponenten rendres IKKE når bruker IKKE er under oppfølging', () => {
        const props: ProviderProps = {
            underOppfolging: { underOppfolging: false },
        };
        const { container } = render(<Dagpenger />, { wrapper: contextProviders(props) });
        expect(container).toBeEmptyDOMElement();
    });
});
