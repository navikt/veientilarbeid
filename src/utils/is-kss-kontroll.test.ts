import { expect } from 'chai';
import isKSSKontroll from './is-kss-kontroll';
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

describe('isKSSKontroll returnerer forventede verdier', () => {
  it('returnerer true for kss fra gyldig kontor registrert i dag med gyldig situasjon', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '1149'
    };
    expect(isKSSKontroll(data)).to.equal(true);
  });

  it('returnerer false for kss fra gyldig kontor med ugyldig dato med gyldig situasjon', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: null,
      POAGruppe: generateKSS(),
      geografiskTilknytning: '1149'
    };
    expect(isKSSKontroll(data)).to.equal(false);
  });

  it('returnerer false for boo fra gyldig kontor registrert i dag', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateBOO(),
      geografiskTilknytning: '1149'
    };
    expect(isKSSKontroll(data)).to.equal(false);
  });

  it('returnerer false for kss fra gyldig kontor registrert i dag med ugyldig situasjon', () => {
    const data = {
      dinSituasjon: 'PERMITTERT',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '1149'
    };
    expect(isKSSKontroll(data)).to.equal(false);
  });

  it('returnerer false for kss fra ugyldig kontor registrert i dag', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      opprettetRegistreringDato: new Date(),
      POAGruppe: generateKSS(),
      geografiskTilknytning: '0807'
    };
    expect(isKSSKontroll(data)).to.equal(false);
  });
});