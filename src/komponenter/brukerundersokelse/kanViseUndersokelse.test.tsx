import { POAGruppe } from '../../utils/get-poa-group';
import { EksperimentId } from '../../eksperiment/eksperimenter';
import { kanViseUndersokelse } from './brukerundersokelse';

const gruppeKSS: POAGruppe = 'kss';
const eksperiment: EksperimentId = 'onboarding14a';

describe('tester funksjonen kanViseUndersokelse', () => {
    test('gir true om kriteriene matcher', () => {
        const data = {
            ukerRegistrert: 2,
            gruppe: gruppeKSS,
            eksperimenter: [eksperiment],
            featureToggleAktiv: true,
            sistSettUndersokelse: 0,
        };
        expect(kanViseUndersokelse(data)).toBe(true);
    });

    test('gir false om IKKE kriteriene matcher', () => {
        const data = {
            ukerRegistrert: 2,
            gruppe: gruppeKSS,
            eksperimenter: [eksperiment],
            featureToggleAktiv: false,
            sistSettUndersokelse: 0,
        };
        expect(kanViseUndersokelse(data)).toBe(false);
    });
});
