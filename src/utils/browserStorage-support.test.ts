import { lagFallbackBrowserStorage } from './browserStorage-support';

describe('tester fallback-browserStorage', () => {
    const testKey = 'TestKey';
    test('lagFallbackBrowserStorage skal gi en ny og tom browserStorage hver gang', () => {
        const storage = lagFallbackBrowserStorage();
        expect(storage.getItem(testKey)).toBeNull();
        storage.setItem(testKey, 'ikke null');
        expect(storage.getItem(testKey)).not.toBeNull();

        const nyStorage = lagFallbackBrowserStorage();
        expect(nyStorage.getItem(testKey)).toBeNull();
    });

    test('skal kunne lagre og hente opp JSON i browserStorage', () => {
        const storage = lagFallbackBrowserStorage();
        const testValue = { value: 'Test' };
        storage.setItem(testKey, JSON.stringify(testValue));
        const storedValue = storage.getItem(testKey);
        expect(JSON.parse(storedValue!!)).toEqual(testValue);
    });

    test('skal kunne fjerne verdier fra browserStorage', () => {
        const storage = lagFallbackBrowserStorage();
        storage.removeItem(testKey);
        expect(storage.getItem(testKey)).toBeNull();
        storage.setItem(testKey, JSON.stringify('en helt annen verdi'));
        storage.removeItem(testKey);
        expect(storage.getItem(testKey)).toBeNull();
    });
});
