import beregnDagpengerStatus from './beregn-dagpenger-status';

describe('tester funksjonen beregnDagpengerStatus', () => {
    test('returnerer ukjentStatus uten input', () => {
        const status = beregnDagpengerStatus({});
        expect(status).toBe('ukjentStatus');
    });

    test('returnerer mottarDagpenger når rettighetsgruppe er DAGP', () => {
        const status = beregnDagpengerStatus({
            rettighetsgruppe: 'DAGP',
        });
        expect(status).toBe('mottarDagpenger');
    });
});
