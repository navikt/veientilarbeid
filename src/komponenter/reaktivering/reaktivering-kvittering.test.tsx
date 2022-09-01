import { render, screen } from '@testing-library/react';

import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import ReaktiveringKvittering from './reaktivering-kvittering';

describe('tester komponenten for kvittering etter reaktivering', () => {
    beforeEach(() => {
        const location = window.location;
        delete (global as any).window.location;
        global.window.location = Object.assign({}, location);
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når kvittering IKKE sendes med', () => {
        const { container } = render(<ReaktiveringKvittering />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når kvittering SENDES med', () => {
        Object.defineProperty(window.location, 'search', {
            value: '?visKvittering=reaktivering',
        });
        const { container } = render(<ReaktiveringKvittering />);
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten viser rett overskrift', () => {
        Object.defineProperty(window.location, 'search', {
            value: '?visKvittering=reaktivering',
        });
        render(<ReaktiveringKvittering />);
        expect(screen.getByText(/du må søke om dagpenger på nytt/i)).toBeInTheDocument();
    });
});
