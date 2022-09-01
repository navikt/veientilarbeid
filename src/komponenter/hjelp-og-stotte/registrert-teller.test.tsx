import { render, screen } from '@testing-library/react';

import RegistrertTeller from './registrert-teller';

describe('Tester komponenten RegistrertTeller', () => {
    test('Komponenten rendres med første uke dersom man er i uke 0', () => {
        render(<RegistrertTeller ukerRegistrert={0} registrertDato={undefined} />);
        expect(screen.getByText(/første uke/)).toBeInTheDocument();
    });

    test('Komponenten rendres med tjuefjerde uke dersom man er i uke 23', () => {
        render(<RegistrertTeller ukerRegistrert={23} registrertDato={undefined} />);
        expect(screen.getByText(/tjuefjerde/)).toBeInTheDocument();
    });

    test('Komponenten rendres med dato dersom man er i uke 24', () => {
        render(<RegistrertTeller ukerRegistrert={24} registrertDato="2021-06-01" />);
        expect(screen.getByText(/1. juni/)).toBeInTheDocument();
    });

    test('Komponenten rendres IKKE med dato dersom man er i uke 24 og dato er undefined', () => {
        const { container } = render(<RegistrertTeller ukerRegistrert={24} registrertDato={undefined} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten rendres IKKE uker registrert er undefined', () => {
        const { container } = render(<RegistrertTeller ukerRegistrert={undefined} registrertDato={undefined} />);
        expect(container).toBeEmptyDOMElement();
    });
});
