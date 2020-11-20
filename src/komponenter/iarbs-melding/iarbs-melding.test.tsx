import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import IARBSMelding from './iarbs-melding';

describe('Test av komponent', () => {
    test('Rendrer ikke komponent om den ikke skal vises', () => {
        const { container } = render(<IARBSMelding />);
        expect(container).toBeEmptyDOMElement();
    });
});
