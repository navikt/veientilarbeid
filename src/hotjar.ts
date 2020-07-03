import { POAGruppe } from './utils/get-poa-group'

export const hotjarTrigger = (stateMicroFrontend: boolean, PoaGruppe: POAGruppe, isExperiment: boolean) => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      const underGruppe = isExperiment ? 'eksperiment' : PoaGruppe;
      const triggerType = stateMicroFrontend ? `vta-dittnav-${underGruppe}` : `vta-${underGruppe}`;
      window[hotjar]('trigger', triggerType);
  }
};
