import isKSSEksperiment from './is-kss-eksperiment';
import getPoaGroup from './get-poa-group';
import { POAGruppe } from './get-poa-group'

const generateKSS = (): POAGruppe => {
  const data = {
    dinSituasjon: 'MISTET_JOBBEN',
    innsatsgruppe: 'STANDARD_INNSATS',
    formidlingsgruppe: 'ARBS',
    alder: 32,
    servicegruppe: 'IVURD',
    opprettetRegistreringDato: new Date()
  };
  return getPoaGroup(data);
}

const generateBOO = (): POAGruppe => {
  const data = {
    dinSituasjon: 'MISTET_JOBBEN',
    innsatsgruppe: 'STANDARD_INNSATS',
    formidlingsgruppe: 'IARBS',
    alder: 32,
    servicegruppe: 'IVURD',
    opprettetRegistreringDato: new Date()
  };
  return getPoaGroup(data);
}

describe('isKSSEksperiment returnerer forventede verdier', () => {
  it('returnerer true for kss fra gyldig kontor registrert i dag med gyldig situasjon', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '3401'
    };
    expect(isKSSEksperiment(data)).toBe(true);
  });

  it('returnerer false for kss fra gyldig kontor registrert før eksperimentets start, men med gyldig situasjon', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date('2020-09-06'),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '3401'
    };
    expect(isKSSEksperiment(data)).toBe(false);
  });

  it('returnerer false for kss fra gyldig kontor med ugyldig dato med gyldig situasjon', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: null,
      POAGruppe: generateKSS(),
      geografiskTilknytning: '3401'
    };
    expect(isKSSEksperiment(data)).toBe(false);
  });

  it('returnerer false for boo fra gyldig kontor registrert i dag', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateBOO(),
      geografiskTilknytning: '3401'
    };
    expect(isKSSEksperiment(data)).toBe(false);
  });

  it('returnerer false for kss fra gyldig kontor registrert i dag med ugyldig situasjon', () => {
    const data = {
      dinSituasjon: 'PERMITTERT',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '3401'
    };
    expect(isKSSEksperiment(data)).toBe(false);
  });

  it('returnerer false for kss fra ugyldig kontor registrert i dag', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '0807'
    };
    expect(isKSSEksperiment(data)).toBe(false);
  });
});