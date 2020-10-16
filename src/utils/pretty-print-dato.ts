const monthNames = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];

export default (dato: string) => {
  const now = new Date();
  const date = new Date(dato);
  const thisYear = now.getFullYear();
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  return `${date.getDate()}. ${month}${thisYear !== year ? ' ' + year : ''}`;
};