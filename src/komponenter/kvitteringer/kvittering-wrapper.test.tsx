import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import KvitteringWrapper from './kvittering-wrapper';
import { mockIntersectionObserver } from '../../mocks/intersection-observer-mock';

describe('tester komponenten for kvittering for behovsvurdering', () => {
    beforeEach(() => {
        mockIntersectionObserver();
    });

    test('komponenten vises IKKE når kvittering IKKE sendes med', () => {
        const { container } = render(<KvitteringWrapper />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES når kvittering SENDES med', () => {
        const { container } = render(<KvitteringWrapper kvittering="behovsvurderingJa" />);
        expect(container).not.toBeEmptyDOMElement();
    });
});
