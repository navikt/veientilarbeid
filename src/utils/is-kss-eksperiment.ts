import { POAGruppe } from './get-poa-group';

interface Data {
  POAGruppe: POAGruppe;
  dinSituasjon: string;
  opprettetRegistreringDato: Date|null;
  geografiskTilknytning: string;
}

const isGyldigKontorForDato = (geografiskTilknytning: string, dato: Date): boolean => {
  if ([
    '030112', '030105', '3413', '3407', '3401', '3807', '3803', '1120', '1121', '110302', '110303'
  ].includes(geografiskTilknytning)) {
    return dato >= new Date('2020-09-07');

  } else if (['3808', '110306', '110307', '030114', '3418', '3411'].includes(geografiskTilknytning)) {
    return dato >= new Date('2020-10-26');
  }

  return false;
}

const isKSSEksperiment = (data: Data): boolean => {
  const {
    POAGruppe,
    dinSituasjon,
    opprettetRegistreringDato,
    geografiskTilknytning
  } = data;
  const tilfeldigGyldigDato = new Date('2019-05-02');
  const beregningsDato = opprettetRegistreringDato !== null ? opprettetRegistreringDato : tilfeldigGyldigDato;
  const gyldigeSituasjoner = ['HAR_SAGT_OPP', 'MISTET_JOBBEN'];

  return POAGruppe === 'kss'
      && gyldigeSituasjoner.includes(dinSituasjon)
      && isGyldigKontorForDato(geografiskTilknytning, beregningsDato)
  ;
}

export default isKSSEksperiment;
