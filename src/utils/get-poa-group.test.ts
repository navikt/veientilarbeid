import { expect } from 'chai';
import getPoaGroup from './get-poa-group';

describe('getPoaGroup returnerer forventede verdier', () => {
  it('returnerer kss for standard, mistet jobben, arbs og rett alder', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 32
    };
    expect(getPoaGroup(data)).to.equal('kss');
  });

  it('returnerer boo for standard, mistet jobben, arbs og alder under 30', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 29
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, arbs og alder over 50', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS',
      alder: 51
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });

  it('returnerer boo for standard, mistet jobben, iarbs og rett alder', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'IARBS',
      alder: 32
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });
});