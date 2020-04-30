import { POAGruppe } from './utils/get-poa-group'

export const hotjarTrigger = (stateMicroFrontend: boolean, PoaGruppe: POAGruppe) => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      const triggerType = stateMicroFrontend ? `vta-dittnav-${PoaGruppe}` : `vta-${PoaGruppe}`;
      window[hotjar]('trigger', triggerType);
  }
};
