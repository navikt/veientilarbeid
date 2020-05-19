import { expect } from 'chai';
import getPoaGroup from './get-poa-group';

describe('getPoaGroup returnerer forventede verdier', () => {
  it('returnerer kss for standard, mistet jobben, arbs, rett alder og under 16 uker', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 32,
      opprettetRegistreringDato: new Date()
    };
    expect(getPoaGroup(data)).to.equal('kss');
  });

  it('returnerer kss for standard, har sagt opp, arbs, rett alder og under 16 uker', () => {
    const data = {
      dinSituasjon: 'HAR_SAGT_OPP',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 32,
      opprettetRegistreringDato: new Date()
    };
    expect(getPoaGroup(data)).to.equal('kss');
  });

  it('returnerer boo for standard, mistet jobben, arbs, rett alder og over 16 uker', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 32,
      opprettetRegistreringDato: new Date('2020-01-13')
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, arbs, rett alder og dato null', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 32,
      opprettetRegistreringDato: null
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, arbs, alder under 30 og under 16 uker', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 29,
      opprettetRegistreringDato: new Date()
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, arbs, alder over 50 og under 16 uker', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 56,
      opprettetRegistreringDato: new Date()
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, iarbs, rett alder og under 16 uker', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'IARBS',
      alder: 32,
      opprettetRegistreringDato: new Date()
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });
});