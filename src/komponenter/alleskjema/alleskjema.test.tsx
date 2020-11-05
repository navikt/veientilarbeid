import * as React from 'react';
import { render, screen } from '@testing-library/react';
import AlleSkjema from './alleskjema'
import tekster from '../../tekster/tekster';

describe('Tester alle skjema komponenten', () => {
  test('Komponenten rendres når den skal vises', () => {
    render(<AlleSkjema />)
    expect(screen.getByText(tekster['alleskjema-tittel'])).toBeTruthy()
    expect(screen.getByText(tekster['alleskjema-tekst'])).toBeTruthy()
    expect(screen.getByText(tekster['alleskjema-lenke-tekst'])).toBeTruthy()
  })
})
