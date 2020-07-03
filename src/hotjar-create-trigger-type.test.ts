import { expect } from 'chai';
import { createTriggerType } from './hotjar';

describe('createTriggerType returnerer forventede verdier', () => {
  it('returnerer vta-eksperiment for standalone, kss og eksperiment', () => {
    const stateMicroFrontend = false;
    const PoaGruppe = 'kss'
    const isExperiment = true
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-eksperiment');
  });

  it('returnerer vta-eksperiment for standalone, boo og eksperiment', () => {
    const stateMicroFrontend = false;
    const PoaGruppe = 'boo'
    const isExperiment = true
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-eksperiment');
  });
  
  it('returnerer vta-dittnav-eksperiment for dittNav, kss og eksperiment', () => {
    const stateMicroFrontend = true;
    const PoaGruppe = 'kss'
    const isExperiment = true
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-dittnav-eksperiment');
  });

  it('returnerer vta-dittnav-eksperiment for dittNav, boo og eksperiment', () => {
    const stateMicroFrontend = true;
    const PoaGruppe = 'boo'
    const isExperiment = true
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-dittnav-eksperiment');
  });

  it('returnerer vta-dittnav-kss for dittNav, kss og ikke eksperiment', () => {
    const stateMicroFrontend = true;
    const PoaGruppe = 'kss'
    const isExperiment = false
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-dittnav-kss');
  });

  it('returnerer vta-dittnav-boo for dittNav, boo og ikke eksperiment', () => {
    const stateMicroFrontend = true;
    const PoaGruppe = 'boo'
    const isExperiment = false
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-dittnav-boo');
  });

  it('returnerer vta-boo for standalone, boo og ikke eksperiment', () => {
    const stateMicroFrontend = false;
    const PoaGruppe = 'boo'
    const isExperiment = false
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-boo');
  });

  it('returnerer vta-kss for standalone, kss og ikke eksperiment', () => {
    const stateMicroFrontend = false;
    const PoaGruppe = 'kss'
    const isExperiment = false
    expect(createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment)).to.equal('vta-kss');
  });
});
