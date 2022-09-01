import { render, screen } from '@testing-library/react';

import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';
import KvitteringEgenvurdering from './kvittering-egenvurdering';

describe('tester komponenten for kvittering for egenvurdering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten viser rett melding når kvittering er for ja', () => {
        delete (global as any).window.location;
        global.window.location = { search: '?visKvittering=behovsvurderingJa' } as Location;
        render(<KvitteringEgenvurdering />);

        expect(screen.getByText(/du får svar i løpet av noen dager/i)).toBeInTheDocument();
    });

    test('komponenten viser rett melding når kvittering er for nei', async () => {
        delete (global as any).window.location;
        global.window.location = { search: '?visKvittering=behovsvurderingNei' } as Location;
        render(<KvitteringEgenvurdering />);
        expect(await screen.queryByText(/du får svar i løpet av noen dager/i)).toBeFalsy();
        expect(screen.getByText(/svaret ditt er delt med din veileder/i)).toBeInTheDocument();
    });
});
