export type POAGruppe = 'kss' | 'boo'

interface Data {
  dinSituasjon: string;
  innsatsgruppe: string;
  formidlingsgruppe: string;
  alder: number;
  opprettetRegistreringDato: Date|null;
  servicegruppe: string;
}

const erInnenfor16uker = (dato: Date|null) => {
  const beregningsDato = dato !== null ? dato : new Date('2019-05-02')
  const maksTid = 16 * 7 * 24 * 60 * 60000;
  const iDag = new Date().getTime();
  return (iDag - beregningsDato.getTime()) < maksTid;
};

const isStandard = (innsatsgruppe: string, servicegruppe: string) => {
  return servicegruppe === 'IKVAL' || (servicegruppe === 'IVURD' && innsatsgruppe === 'STANDARD_INNSATS')
};

const getPoaGroup = (data: Data): POAGruppe => {
  const { 
    dinSituasjon,
    innsatsgruppe,
    formidlingsgruppe,
    alder,
    opprettetRegistreringDato,
    servicegruppe } = data;
  const lavesteAlder = 30;
  const hoyesteAlder = 55;
  const kssSituasjoner = ['ER_PERMITTERT', 'HAR_SAGT_OPP', 'MISTET_JOBBEN'];
  const kriterier = [];
  kriterier.push(kssSituasjoner.includes(dinSituasjon) ? 'kss' : 'boo');
  kriterier.push(isStandard(innsatsgruppe, servicegruppe) ? 'kss' : 'boo');
  kriterier.push(formidlingsgruppe === 'ARBS' ? 'kss' : 'boo');
  kriterier.push(alder > lavesteAlder && alder < hoyesteAlder ? 'kss' : 'boo')
  kriterier.push(erInnenfor16uker(opprettetRegistreringDato) ? 'kss': 'boo')
  const isKSS = !kriterier.includes('boo');
  return isKSS ? 'kss' : 'boo';
};

export default getPoaGroup;