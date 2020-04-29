interface Data {
  dinSituasjon: string;
  innsatsgruppe: string;
  formidlingsgruppe: string;
}

const getPoaGroup = (data: Data): string => {
  const { dinSituasjon, innsatsgruppe, formidlingsgruppe } = data;
  const kriterier = [];
  kriterier.push(dinSituasjon === 'MISTET_JOBBEN' ? 'kss' : 'boo');
  kriterier.push(innsatsgruppe === 'STANDARD_INNSATS' ? 'kss' : 'boo');
  kriterier.push(formidlingsgruppe === 'IARBS' ? 'kss' : 'boo');
  const isKSS = !kriterier.includes('boo');
  return isKSS ? 'kss' : 'boo';
};

export default getPoaGroup;