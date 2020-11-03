import * as React from 'react';
import { render, screen } from '@testing-library/react';
import KrrMelding from './krr-melding';

describe('Test av komponent', () => {
  test('Rendrer komponent hvis reservasjon hos krr', () => {
    render(<KrrMelding />)
    expect(screen.getByText(/du er reservert mot digital kommunikasjon med det offentlige/i)).toBeTruthy()
  })
})
