import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import BehovsvurderingKvittering from './behovsvurdering';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('tester komponenten for kvittering for behovsvurdering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når kvittering IKKE sendes med', () => {
        const { container } = render(<BehovsvurderingKvittering />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når kvittering SENDES med', () => {
        const { container } = render(<BehovsvurderingKvittering kvittering="behovsvurderingJa" />);
        expect(container).not.toBeEmptyDOMElement();
    });

    test('komponenten viser rett melding når kvittering er for ja', () => {
        render(<BehovsvurderingKvittering kvittering="behovsvurderingJa" />);
        expect(screen.getByText(/du får svar i løpet av noen dager/i)).toBeInTheDocument();
    });

    test('komponenten viser rett melding når kvittering er for nei', async () => {
        render(<BehovsvurderingKvittering kvittering="behovsvurderingNei" />);
        expect(await screen.queryByText(/du får svar i løpet av noen dager/i)).toBeFalsy();
    });
});
