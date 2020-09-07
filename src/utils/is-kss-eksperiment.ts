import { POAGruppe } from './get-poa-group';

interface Data {
  POAGruppe: POAGruppe;
  dinSituasjon: string;
  opprettetRegistreringDato: Date|null;
  geografiskTilknytning: string;
}

const isGyldigDato = (dato: Date): boolean => {
  const startDate = new Date('2020-09-07');
  return dato > startDate;
}

const isKSSEksperiment = (data: Data): boolean => {
  const {
    POAGruppe,
    dinSituasjon,
    opprettetRegistreringDato,
    geografiskTilknytning
  } = data;
  const beregningsDato = opprettetRegistreringDato !== null ? opprettetRegistreringDato : new Date('2019-05-02');
  const gyldigeSituasjoner = ['HAR_SAGT_OPP', 'MISTET_JOBBEN'];
  const gyldigeKontorer = [
    '030112', '030105', '3413', '3407', '3401', '3807', '3803', '1120', '1121', '110302', '110303'
  ];

  return POAGruppe === 'kss'
    && gyldigeKontorer.includes(geografiskTilknytning)
    && gyldigeSituasjoner.includes(dinSituasjon)
    && isGyldigDato(beregningsDato)
  ;
}

export default isKSSEksperiment;