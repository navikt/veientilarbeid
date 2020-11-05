import { POAGruppe } from './utils/get-poa-group';

export const createTriggerType = (stateMicroFrontend: boolean, PoaGruppe: POAGruppe, isExperiment: boolean) => {
    const underGruppe = isExperiment ? 'eksperiment' : PoaGruppe;
    return stateMicroFrontend ? `vta-dittnav-${underGruppe}` : `vta-${underGruppe}`;
};

export const hotjarTrigger = (stateMicroFrontend: boolean, PoaGruppe: POAGruppe, isExperiment: boolean) => {
    if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
        const hotjar = 'hj';
        const triggerType = createTriggerType(stateMicroFrontend, PoaGruppe, isExperiment);
        window[hotjar]('trigger', triggerType);
    }
};
