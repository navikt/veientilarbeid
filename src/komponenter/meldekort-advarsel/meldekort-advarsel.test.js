import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import MeldekortAdvarsel from './meldekort-advarsel';

/*
- Ikke vises før tiden
- Vises ved dag 1 (mandag), første dag
- Vises ved dag 7 (mandag), siste dag
- Vises ikke ved dag 8,
 */

describe('Tester komponenten MeldekortAdvarsel', () => {
    test('Komponenten vises IKKE om man ikke har meldekort', () => {
        const { container } = render(<MeldekortAdvarsel />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE om ', () => {
        const { container } = render(<MeldekortAdvarsel dagerEtterFastsattMeldedag={null} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE på dag 8', () => {
        const { container } = render(<MeldekortAdvarsel dagerEtterFastsattMeldedag={8} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises om dagerTilFrist er ok', () => {
        const frister = {
            dagerTilInaktivering: 2,
            meldekort: {
                meldekortId: 1526772064,
                kortType: 'ELEKTRONISK',
                meldeperiode: {
                    fra: '2021-01-10T12:00:00+01:00',
                    til: '2021-01-24T12:00:00+01:00',
                    kortKanSendesFra: '2021-01-23T12:00:00+01:00',
                    kanKortSendes: false,
                    periodeKode: '202103',
                },
                meldegruppe: 'DAGP',
                kortStatus: 'OPPRE',
                bruttoBelop: 0.0,
                erForskuddsPeriode: false,
                korrigerbart: true,
            },
        };
        const { container } = render(<MeldekortAdvarsel dagerEtterFastsattMeldedag={frister} />);
        expect(container).not.toBeEmptyDOMElement();
    });
});
