export const hotjarTrigger = (isMicrofrontend: boolean) => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      const triggerType = isMicrofrontend ? 'vta-dittnav-generell' : 'vta-generell';
      window[hotjar]('trigger', triggerType);
  }
};
