export type Eksperiment = 'onboardingMeldekort' | 'dummyEksperiment';
type Samarbeidskontor = { navn: string; eksperimenter: Eksperiment[] };

export const Samarbeidskontorer: { [geografiskTilknytning: string]: Samarbeidskontor } = {
    '030112': {
        navn: 'Alna',
        eksperimenter: ['onboardingMeldekort'],
    },
    '030105': {
        navn: 'Frogner',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3413': {
        navn: 'Stange',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3407': {
        navn: 'Gjøvik',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3401': {
        navn: 'Kongsvinger',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3808': {
        navn: 'Notodden',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3807': {
        navn: 'Skien',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3803': {
        navn: 'Tønsberg',
        eksperimenter: ['onboardingMeldekort'],
    },
    '1120': {
        navn: 'Klepp',
        eksperimenter: ['onboardingMeldekort'],
    },
    '1121': {
        navn: 'Time',
        eksperimenter: ['onboardingMeldekort'],
    },
    '110302': {
        navn: 'Tasta',
        eksperimenter: ['onboardingMeldekort'],
    },
    '110303': {
        navn: 'Eiganes og Våland',
        eksperimenter: ['onboardingMeldekort'],
    },
    '110306': {
        navn: 'Hillevåg',
        eksperimenter: ['onboardingMeldekort'],
    },
    '110307': {
        navn: 'Hinna',
        eksperimenter: ['onboardingMeldekort'],
    },
    '030114': {
        navn: 'Nordstrand',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3418': {
        navn: 'Åsnes',
        eksperimenter: ['onboardingMeldekort'],
    },
    '3411': {
        navn: 'Ringsaker',
        eksperimenter: ['onboardingMeldekort'],
    },
    '030108': {
        navn: 'Nordre Aker',
        eksperimenter: ['onboardingMeldekort'],
    },
    '030109': {
        navn: 'Bjerke',
        eksperimenter: ['onboardingMeldekort'],
    },
    '1149': {
        navn: 'Karmøy',
        eksperimenter: ['onboardingMeldekort'],
    },
    '110301': {
        navn: 'Hundvåg',
        eksperimenter: ['onboardingMeldekort'],
    },
};
