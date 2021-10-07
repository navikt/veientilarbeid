import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Permittert from './permittert';

describe('Test av permittert komponenen', () => {
    test('Komponenten vises dersom visRegistrertSomPermittert er true', () => {
        const { container } = render(<Permittert visRegistrertSomPermittert={true} />);
        expect(container).not.toBeEmptyDOMElement();
        expect(screen.getByText(/ha tett kontakt med arbeidsgiveren din om situasjonen fremover/i)).toBeInTheDocument();
    });

    test('Komponenten vises IKKE dersom visRegistrertSomPermittert er false', () => {
        const { container } = render(<Permittert visRegistrertSomPermittert={false} />);
        expect(container).toBeEmptyDOMElement();
    });
});
