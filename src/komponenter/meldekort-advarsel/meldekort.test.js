import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Meldekortstatus from './meldekortstatus';

describe('tester Meldekort komponenten', () => {
    test('komponenten rendres IKKE uten innhold', () => {
        const { container } = render(<Meldekortstatus />);
        expect(container).toBeEmptyDOMElement();
    });

    test('komponenten VISES med meldekortbruker true', () => {
        const data = {
            meldekortbruker: true,
        };
        const meldekorthistorie = {
            maalformkode: 'NO',
            meldeform: 'EMELD',
            meldekort: [
                {
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
            ],
        };
        render(<Meldekortstatus meldekortInfo={data} meldekortHistorie={meldekorthistorie} />);
        expect(
            screen.getByText(
                /Det er innsending av meldekortet som opprettholder både statusen som arbeidssøker, samt brukes til å beregne/
            )
        ).toBeInTheDocument();
    });
});
