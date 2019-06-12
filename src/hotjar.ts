export const hotjarTrigger = () => {
  if (typeof window !== 'undefined' && window.hasOwnProperty('hj')) {
      const hotjar = 'hj';
      window[hotjar]('trigger', 'vta-dittnav-ny');
  }
};
