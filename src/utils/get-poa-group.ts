export type POAGruppe = 'kss' | 'boo'

interface Data {
  dinSituasjon: string;
  innsatsgruppe: string;
  formidlingsgruppe: string;
  alder: number;
  opprettetRegistreringDato: Date|null;
}

const erInnenfor16uker = (dato: Date|null) => {
  const beregningsDato = dato !== null ? dato : new Date('2019-05-02')
  const maksTid = 16 * 7 * 24 * 60 * 60000;
  const iDag = new Date().getTime();
  return (iDag - beregningsDato.getTime()) < maksTid;
};

const getPoaGroup = (data: Data): POAGruppe => {
  const { dinSituasjon, innsatsgruppe, formidlingsgruppe, alder, opprettetRegistreringDato } = data;
  const lavesteAlder = 30;
  const hoyesteAlder = 55;
  const kssSituasjoner = ['MISTET_JOBBEN']
  const kriterier = [];
  kriterier.push(kssSituasjoner.includes(dinSituasjon) ? 'kss' : 'boo');
  kriterier.push(innsatsgruppe === 'STANDARD_INNSATS' ? 'kss' : 'boo');
  kriterier.push(formidlingsgruppe === 'ARBS' ? 'kss' : 'boo');
  kriterier.push(alder > lavesteAlder && alder < hoyesteAlder ? 'kss' : 'boo')
  kriterier.push(erInnenfor16uker(opprettetRegistreringDato) ? 'kss': 'boo')
  const isKSS = !kriterier.includes('boo');
  return isKSS ? 'kss' : 'boo';
};

export default getPoaGroup;