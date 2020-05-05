export type POAGruppe = 'kss' | 'boo'

interface Data {
  dinSituasjon: string;
  innsatsgruppe: string;
  formidlingsgruppe: string;
  alder: number;
}

const getPoaGroup = (data: Data): POAGruppe => {
  const { dinSituasjon, innsatsgruppe, formidlingsgruppe, alder } = data;
  const kriterier = [];
  kriterier.push(dinSituasjon === 'MISTET_JOBBEN' ? 'kss' : 'boo');
  kriterier.push(innsatsgruppe === 'STANDARD_INNSATS' ? 'kss' : 'boo');
  kriterier.push(formidlingsgruppe === 'ARBS' ? 'kss' : 'boo');
  kriterier.push(alder > 30 && alder < 50 ? 'kss' : 'boo')
  const isKSS = !kriterier.includes('boo');
  return isKSS ? 'kss' : 'boo';
};

export default getPoaGroup;