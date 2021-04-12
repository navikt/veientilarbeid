export type EksperimentId = 'dummyEksperiment' | 'onboarding14a';

export type Eksperiment = {
    id: EksperimentId;
    registrertEtterDato?: Date;
};

type Samarbeidskontor = { navn: string; eksperimenter: Eksperiment[] };

export const Samarbeidskontorer: { [geografiskTilknytning: string]: Samarbeidskontor } = {
    '030112': {
        navn: 'Alna',
        eksperimenter: [],
    },
    '030105': {
        navn: 'Frogner',
        eksperimenter: [],
    },
    '3413': {
        navn: 'Stange',
        eksperimenter: [],
    },
    '3407': {
        navn: 'Gjøvik',
        eksperimenter: [],
    },
    '3401': {
        navn: 'Kongsvinger',
        eksperimenter: [],
    },
    '3808': {
        navn: 'Notodden',
        eksperimenter: [],
    },
    '3807': {
        navn: 'Skien',
        eksperimenter: [],
    },
    '3803': {
        navn: 'Tønsberg',
        eksperimenter: [],
    },
    '1120': {
        navn: 'Klepp',
        eksperimenter: [],
    },
    '1121': {
        navn: 'Time',
        eksperimenter: [],
    },
    '110302': {
        navn: 'Tasta',
        eksperimenter: [{ id: 'onboarding14a', registrertEtterDato: new Date('2021-04-12') }],
    },
    '110303': {
        navn: 'Eiganes og Våland',
        eksperimenter: [{ id: 'onboarding14a', registrertEtterDato: new Date('2021-04-12') }],
    },
    '110306': {
        navn: 'Hillevåg',
        eksperimenter: [],
    },
    '110307': {
        navn: 'Hinna',
        eksperimenter: [],
    },
    '030114': {
        navn: 'Nordstrand',
        eksperimenter: [],
    },
    '3418': {
        navn: 'Åsnes',
        eksperimenter: [],
    },
    '3411': {
        navn: 'Ringsaker',
        eksperimenter: [],
    },
    '030108': {
        navn: 'Nordre Aker',
        eksperimenter: [],
    },
    '030109': {
        navn: 'Bjerke',
        eksperimenter: [],
    },
    '1149': {
        navn: 'Karmøy',
        eksperimenter: [],
    },
    '110301': {
        navn: 'Hundvåg',
        eksperimenter: [],
    },
};
