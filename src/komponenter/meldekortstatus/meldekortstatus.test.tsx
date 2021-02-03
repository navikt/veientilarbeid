import '@testing-library/jest-dom/extend-expect';
import { Matcher, Nullish, render, screen } from '@testing-library/react';
import Meldekortstatus from './meldekortstatus';
import React from 'react';
import { contextProviders, ProviderProps } from '../../test/test-context-providers';
import { datoUtenTid, plussDager } from '../../utils/date-utils';

const meldekort = {
    maalformkode: 'NO',
    meldeform: 'EMELD',
    meldekort: [
        {
            meldekortId: 1526772064,
            kortType: 'ELEKTRONISK',
            meldeperiode: {
                fra: '2021-01-18T12:00:00+01:00',
                til: '2021-01-31T12:00:00+01:00',
                kortKanSendesFra: '2021-01-30T12:00:00+01:00',
                kanKortSendes: false,
                periodeKode: '202103',
            },
            meldegruppe: 'ARBS',
            kortStatus: 'OPPRE',
            bruttoBelop: 0.0,
            erForskuddsPeriode: false,
            korrigerbart: true,
        },
    ],
    etterregistrerteMeldekort: [],
    id: '1',
    antallGjenstaaendeFeriedager: 0,
};

const dag0 = datoUtenTid(new Date('2021-02-01T12:00:00+01:00').toISOString());

const providerProps: ProviderProps = {
    meldekort: meldekort,
};

function regexMatcher(innhold: RegExp): Matcher {
    return (content: string, node: Nullish<Element>) => {
        if (!node) return false;

        const hasText = (innerNode: any) => innhold.test(innerNode.textContent);
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
        return nodeHasText && childrenDontHaveText;
    };
}

describe('tester Meldekort komponenten', () => {
    test('Komponenten vises på dag 1, og har rett varselestekst', () => {
        const dag1 = plussDager(dag0, 1);
        render(<Meldekortstatus iDag={dag1} />, { wrapper: contextProviders(providerProps) });
        expect(
            screen.queryByText(
                /Det er innsending av meldekortet som opprettholder din status som arbeidssøker hos NAV/i
            )
        ).toBeInTheDocument();
        expect(screen.getByText(regexMatcher(/Du har 6 dager/i))).toBeInTheDocument();
    });

    test('Komponenten vises på dag 3, og har rett varselestekst', () => {
        const dag1 = plussDager(dag0, 3);
        render(<Meldekortstatus iDag={dag1} />, { wrapper: contextProviders(providerProps) });
        expect(
            screen.queryByText(
                /Det er innsending av meldekortet som opprettholder din status som arbeidssøker hos NAV/i
            )
        ).toBeInTheDocument();
        expect(screen.queryByText(regexMatcher(/Du har 4 dager/i))).toBeInTheDocument();
        expect(screen.queryByText(regexMatcher(/Dersom du ikke sender inn meldekort/i))).toBeInTheDocument();
    });

    test('Komponenten vises på dag 7, og har rett varselestekst', () => {
        const dag7 = plussDager(dag0, 7);
        render(<Meldekortstatus iDag={dag7} />, { wrapper: contextProviders(providerProps) });
        expect(
            screen.queryByText(
                /Det er innsending av meldekortet som opprettholder din status som arbeidssøker hos NAV/i
            )
        ).toBeInTheDocument();
        expect(
            screen.queryByText(regexMatcher(/Siste frist for innsending av meldekortet er i kveld klokken 23:00/i))
        ).toBeInTheDocument();
    });

    test('Komponenten vises IKKE ved dag 0', () => {
        const { container } = render(<Meldekortstatus iDag={dag0} />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE på dag 8', () => {
        const dag8 = plussDager(dag0, 8);
        const { container } = render(<Meldekortstatus iDag={dag8} />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });

    test('Komponenten vises IKKE ved ingen meldekort', () => {
        const providerProps: ProviderProps = {
            meldekort: { ...meldekort, meldekort: [] },
        };
        const { container } = render(<Meldekortstatus iDag={dag0} />, { wrapper: contextProviders(providerProps) });
        expect(container).toBeEmptyDOMElement();
    });
});
