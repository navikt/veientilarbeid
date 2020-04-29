import { expect } from 'chai';
import getPoaGroup from './get-poa-group';

describe('getPoaGroup returnerer forventede verdier', () => {
  it('returnerer kss for standard, mistet jobben og arbs', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'ARBS'
    };
    expect(getPoaGroup(data)).to.equal('kss');
  });
  it('returnerer boo for standard, mistet jobben og iarbs', () => {
    const data = {
      dinSituasjon: 'MISTET_JOBBEN',
      innsatsgruppe: 'STANDARD_INNSATS',
      formidlingsgruppe: 'IARBS'
    };
    expect(getPoaGroup(data)).to.equal('boo');
  });
});