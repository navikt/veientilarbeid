const situasjoner = {
  MISTET_JOBBEN: 'Har mistet eller kommer til å miste jobben',
  ALDRI_HATT_JOBB: 'Har aldri vært i jobb',
  HAR_SAGT_OPP: 'Har sagt opp eller kommer til å si opp',
  VIL_BYTTE_JOBB: 'Har jobb, men vil bytte',
  ER_PERMITTERT: 'Er permittert eller kommer til å bli permittert',
  USIKKER_JOBBSITUASJON: 'Er usikker på jobbsituasjonen min',
  JOBB_OVER_2_AAR: 'Har ikke vært i jobb de siste 2 årene',
  VIL_FORTSETTE_I_JOBB: 'Har jobb og ønsker å fortsette i den jobben jeg er i',
  AKKURAT_FULLFORT_UTDANNING: 'Har akkurat fullført utdanning, militærtjeneste eller annet',
  DELTIDSJOBB_VIL_MER: 'Har deltidsjobb, men vil jobbe mer',
  INGEN_SVAR: 'Fant ikke data på situasjon',
  INGEN_VERDI: 'Fant ikke data på situasjon'
}

export default (situasjonsID: string) => {
  return situasjoner[situasjonsID]
}
