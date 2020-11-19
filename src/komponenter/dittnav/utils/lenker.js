const generateUrl = service => {
  let url = 'https://www.nav.no'
  switch (service) {
    case 'NAVNO_URL':
      url = 'https://www.nav.no'
      break
    case 'TJENESTER_URL':
      url = 'https://www.nav.no'
      break
    case 'VEILEDERARBEIDSSOKER_URL':
      url = 'https://www.nav.no'
      break
    default:
      url = 'https://www.nav.no'
  }
  return url
}

export const lenker = {
  skjemaer: {
    tittel: 'Skjemaer',
    url: `${generateUrl('NAVNO_URL')}/soknader`,
  },
  dinPensjon: {
    tittel: 'Din pensjon',
    url: `${generateUrl('TJENESTER_URL')}/pselv/publisering/dinpensjon.jsf`,
  },
  veilederArbeidssoker: {
    tittel: 'Veileder for arbeidssøker',
    url: `${generateUrl('VEILEDERARBEIDSSOKER_URL')}`,
  },
  dittSykefravaer: {
    tittel: 'Ditt sykefravær',
    url: `${generateUrl('TJENESTER_URL')}/sykefravaer`,
  },
};
