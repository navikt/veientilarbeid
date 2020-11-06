import * as React from 'react'
import { render, screen } from '@testing-library/react';
import Dagpenger from './dagpenger'
import tekster from '../../tekster/tekster';

describe('Tester dagpengerkomponenten', () => {
  test('Dagpenger rendrer som den skal', () => {
    render(<Dagpenger />);
    expect(screen.getByText(tekster['dagpenger-tittel'])).toBeTruthy();
    expect(screen.getByText(tekster['dagpenger-tekst'])).toBeTruthy();
    expect(screen.getByText(tekster['dagpenger-lenke-tekst'])).toBeTruthy();
  });
});
