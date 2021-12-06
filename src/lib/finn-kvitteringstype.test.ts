import finnKvitteringstype from './finn-kvitteringstype';

describe('Tester funksjonen finnKvitteringstype', () => {
    test('Gir "ukjent" ved ingen kvittering', () => {
        expect(finnKvitteringstype('')).toBe('ukjent');
    });

    test('Gir "reaktivering" ved reaktivering', () => {
        expect(finnKvitteringstype('reaktivering')).toBe('reaktivering');
    });

    test('Gir "behovesvurdering" for behovsvurderingJa', () => {
        expect(finnKvitteringstype('behovsvurderingJa')).toBe('behovsvurdering');
    });

    test('Gir "behovesvurdering" for behovsvurderingNei', () => {
        expect(finnKvitteringstype('behovsvurderingNei')).toBe('behovsvurdering');
    });
});
