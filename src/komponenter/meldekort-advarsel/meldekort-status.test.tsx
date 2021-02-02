import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Meldekortstatus from './meldekortstatus';
import React from 'react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';

const DAG_I_MS = 1000 * 60 * 60 * 24;
const meldeperiodeFra = new Date('2020-10-01');
const meldeperiodeTil = new Date(meldeperiodeFra.getTime() + DAG_I_MS * 14);
const kortKanSendesFra = new Date(meldeperiodeTil.getTime() - DAG_I_MS);
const dag0 = new Date(kortKanSendesFra.getTime() + DAG_I_MS * 2);

const meldekorthistorie = {
    maalformkode: 'NO',
    meldeform: 'EMELD',
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: meldeperiodeFra.toISOString(),
                til: meldeperiodeTil.toISOString(),
                kortKanSendesFra: kortKanSendesFra.toISOString(),
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

const providerProps: ProviderProps = {
    meldekort: meldekorthistorie,
};

describe('tester Meldekort komponenten', () => {
    test('Komponenten vises IKKE ved dag 0', () => {
        const { container } = render(<Meldekortstatus iDag={dag0} />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE på dag 8', () => {
        const dag8 = new Date(dag0.getTime() + DAG_I_MS * 8);

        const { container } = render(<Meldekortstatus iDag={dag8} />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });
});
