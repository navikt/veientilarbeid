export type ArbeidssokerPeriode = 'aktiv' | 'ingen' | 'nylig-utløpt' | 'gammel';
const identity = (i: any) => i;

export default (underOppfolging: boolean, periode: ArbeidssokerPeriode | null) => {
    return {
        underoppfolging: {
            status: 200,
            underoppfolging: underOppfolging,
        },
        arbeidssokerperioder: {
            status: 200,
            arbeidssokerperioder: [
                (periode === 'aktiv' || periode === null) && { fraOgMedDato: '2022-09-11', tilOgMedDato: null },
                periode === 'nylig-utløpt' && {
                    fraOgMedDato: '2022-09-11',
                    tilOgMedDato: new Date().toISOString().substring(0, 10),
                },
                periode === 'gammel' && { fraOgMedDato: '2020-09-11', tilOgMedDato: '2022-01-01' },
                periode === 'ingen' && undefined,
            ].filter(identity),
        },
    };
};
