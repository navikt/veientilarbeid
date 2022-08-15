import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import BehovsvurderingKvittering from './behovsvurdering-legacy';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('tester komponenten for kvittering for behovsvurdering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });
    const tomFunksjon = () => {};

    test('komponenten viser rett melding når kvittering er for ja', () => {
        render(<BehovsvurderingKvittering kvittering="behovsvurderingJa" onClose={tomFunksjon} />);
        expect(screen.getByText(/du får svar i løpet av noen dager/i)).toBeInTheDocument();
    });

    test('komponenten viser rett melding når kvittering er for nei', async () => {
        render(<BehovsvurderingKvittering kvittering="behovsvurderingNei" onClose={tomFunksjon} />);
        expect(await screen.queryByText(/du får svar i løpet av noen dager/i)).toBeFalsy();
    });
});
