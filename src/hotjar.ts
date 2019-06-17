export const hotjarTrigger = (stateMicroFrontend: string | undefined) => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      const triggerType = stateMicroFrontend !== undefined ? 'vta-dittnav-generell' : 'vta-generell';
      window[hotjar]('trigger', triggerType);
  }
};
