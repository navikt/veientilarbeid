import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import ReaktiveringKvittering from './reaktivering';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('tester komponenten for kvittering etter reaktivering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når kvittering IKKE sendes med', () => {
        const { container } = render(<ReaktiveringKvittering />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når kvittering SENDES med', () => {
        const { container } = render(<ReaktiveringKvittering kvittering="reaktivering" />);
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten viser rett overskrift', () => {
        render(<ReaktiveringKvittering kvittering="reaktivering" />);
        expect(screen.getByText(/du må søke om dagpenger på nytt/i)).toBeInTheDocument();
    });
});
