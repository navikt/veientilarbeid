import { Sprak } from '../contexts/sprak';

const monthNames = [
    'januar',
    'februar',
    'mars',
    'april',
    'mai',
    'juni',
    'juli',
    'august',
    'september',
    'oktober',
    'november',
    'desember',
];

const prettyPrintDato = (dato: string, locale?: Sprak) => {
    if (locale === 'en') {
        return new Date(dato).toLocaleDateString('en');
    }

    const now = new Date();
    const date = new Date(dato);
    const thisYear = now.getFullYear();
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    return `${date.getDate()}. ${month}${thisYear !== year ? ' ' + year : ''}`;
};

export default prettyPrintDato;
