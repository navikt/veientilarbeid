export const hotjarTrigger = (stateMicroFrontend: boolean) => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      const triggerType = stateMicroFrontend ? 'vta-dittnav-generell' : 'vta-generell';
      window[hotjar]('trigger', triggerType);
  }
};
