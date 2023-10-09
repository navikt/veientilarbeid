/**
 * Gyldige kontorer gruppe 1 *****************
 * NAV Stange - 3413
 * NAV Gjøvik - 3407
 * NAV Kongsvinger - 3401
 * NAV Skien - 3807
 * NAV Tønsberg - 3803
 * NAV Alna - 030112
 * NAV Frogner - 030105
 * NAV Tasta -  110302
 * NAV Eiganes og Våland 110303
 *
 * Gyldige kontorer gruppe 2 *****************
 * NAV Hillevåg og Hinna - 110306, 110307
 * NAV Nordstrand - 030114
 * NAV Notodden - 3808
 * NAV Ringsaker - 3411
 * NAV Åsnes - 3418
 */
import { POAGruppe } from '../utils/get-poa-group';
import { DinSituasjonSvar } from '../hooks/use-brukerregistrering-data';

export const kssSituasjoner = [DinSituasjonSvar.HAR_SAGT_OPP, DinSituasjonSvar.MISTET_JOBBEN];

interface Data {
    POAGruppe: POAGruppe;
    dinSituasjon: DinSituasjonSvar;
    opprettetRegistreringDato: Date | null;
    geografiskTilknytning: string;
}

const isGyldigKontorForDato = (geografiskTilknytning: string, dato: Date): boolean => {
    if (
        ['030112', '030105', '3413', '3407', '3401', '3807', '3803', '1120', '1121', '110302', '110303'].includes(
            geografiskTilknytning,
        )
    ) {
        return dato >= new Date('2020-09-07') && dato < new Date('2020-11-30');
    } else if (['3808', '110306', '110307', '030114', '3418', '3411'].includes(geografiskTilknytning)) {
        return dato >= new Date('2020-10-26') && dato < new Date('2020-11-30');
    }

    return false;
};

const isKSSEksperiment = (data: Data): boolean => {
    const { POAGruppe, dinSituasjon, opprettetRegistreringDato, geografiskTilknytning } = data;
    const tilfeldigGyldigDato = new Date('2019-05-02');
    const beregningsDato = opprettetRegistreringDato !== null ? opprettetRegistreringDato : tilfeldigGyldigDato;

    return (
        POAGruppe === 'kss' &&
        kssSituasjoner.includes(dinSituasjon) &&
        isGyldigKontorForDato(geografiskTilknytning, beregningsDato)
    );
};

export default isKSSEksperiment;
