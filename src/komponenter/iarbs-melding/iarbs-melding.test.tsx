import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import IARBSMelding from './iarbs-melding';

describe('Test av komponent', () => {
  test('Rendrer komponent hvis skal vises', () => {
    render(<IARBSMelding visPlaster={true} />)
    expect(screen.getByText(/ønsker du å søke dagpenger?/i)).toBeTruthy()
    expect(screen.getByText(/hvis du har søkt eller ønsker å søke dagpenger må du ta kontakt med oss./i)).toBeTruthy()
    expect(screen.getByText(/ring 55 55 33 33 med tastevalg 2./i)).toBeTruthy()
    expect(screen.getByText(/hvis det ikke er aktuelt å søke dagpenger nå, eller du har aap kan du se bort fra denne meldingen./i)).toBeTruthy()
  })

  test('Rendrer ikke komponent om den ikke skal vises', () => {
    const { container } = render(<IARBSMelding visPlaster={false} />);
    const div = container.querySelector('div');
    expect(container).toBeEmptyDOMElement();
  })
})
