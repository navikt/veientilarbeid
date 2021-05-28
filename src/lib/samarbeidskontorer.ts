import { EksperimentId } from './eksperimenter';
import { DinSituasjonSvar } from '../ducks/brukerregistrering';
import { kssSituasjoner } from '../utils/is-kss-eksperiment';

export type KontorEksperiment = {
    id: EksperimentId;
    registrertEtterDato?: Date;
    situasjoner?: DinSituasjonSvar[];
};

type Samarbeidskontor = { navn: string; eksperimenter: KontorEksperiment[] };

export const Samarbeidskontorer: { [geografiskTilknytning: string]: Samarbeidskontor } = {
    '030112': {
        navn: 'Alna',
        eksperimenter: [],
    },
    '030105': {
        navn: 'Frogner',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-28'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
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
    '4202': {
        navn: 'Grimstad',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-18'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
    },
    '3803': {
        navn: 'Tønsberg',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-19'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
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
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-13'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '110303': {
        navn: 'Eiganes og Våland',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-04-13'),
                situasjoner: kssSituasjoner,
            },
        ],
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
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-26'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '3418': {
        navn: 'Åsnes',
        eksperimenter: [],
    },
    '3411': {
        navn: 'Ringsaker',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-20'),
                situasjoner: kssSituasjoner,
            },
        ],
    },
    '3422': {
        navn: 'Åmot',
        eksperimenter: [
            {
                id: 'onboarding14a',
                registrertEtterDato: new Date('2021-05-20'),
                situasjoner: [...kssSituasjoner, DinSituasjonSvar.ER_PERMITTERT],
            },
        ],
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
