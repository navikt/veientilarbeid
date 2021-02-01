import { render } from '@testing-library/react';
import MeldekortAdvarsel from './meldekort-advarsel';

describe('Tester komponenten MeldekortAdvarsel', () => {
    test('Komponenten vises IKKE om man ikke har meldekort', () => {
        const { container } = render(<MeldekortAdvarsel />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE om dager til frist ikke finnes', () => {
        const frister = null;
        const { container } = render(<MeldekortAdvarsel frister={frister} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE om dagerTilFrist er under 0', () => {
        const frister = {
            dagerTilInaktivering: -1,
        };
        const { container } = render(<MeldekortAdvarsel frister={frister} />);
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
        const { container } = render(<MeldekortAdvarsel frister={frister} />);
        expect(container).not.toBeEmptyDOMElement();
    });
});
