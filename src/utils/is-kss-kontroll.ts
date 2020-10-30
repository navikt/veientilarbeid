import { POAGruppe } from './get-poa-group';

interface Data {
    POAGruppe: POAGruppe;
    dinSituasjon: string;
    opprettetRegistreringDato: Date | null;
    geografiskTilknytning: string;
}

const isGyldigDato = (dato: Date): boolean => {
    const startDate = new Date('2020-09-07');
    return dato > startDate;
};

const isKSSKontroll = (data: Data): boolean => {
    const { POAGruppe, dinSituasjon, opprettetRegistreringDato, geografiskTilknytning } = data;
    const beregningsDato = opprettetRegistreringDato !== null ? opprettetRegistreringDato : new Date('2019-05-02');
    const gyldigeSituasjoner = ['HAR_SAGT_OPP', 'MISTET_JOBBEN'];
    const gyldigeKontorer = ['030108', '030109', '1149', '110301'];

    return (
        POAGruppe === 'kss' &&
        gyldigeKontorer.includes(geografiskTilknytning) &&
        gyldigeSituasjoner.includes(dinSituasjon) &&
        isGyldigDato(beregningsDato)
    );
};

export default isKSSKontroll;
