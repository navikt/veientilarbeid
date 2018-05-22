import { Moment } from 'moment';

export function formaterResultatperiode(minDato: Moment, maxDato: Moment): string {
    if (minDato.year() !== maxDato.year()) {
        return `${minDato.format('LL')} - ${maxDato.format('LL')}.`;
    } else if (minDato.month() !== maxDato.month()) {
        const year = `${minDato.year()}`;
        const minDatoStreng = minDato.format('LL').replace(year, '').trim();
        const maxDatoStreng = maxDato.format('LL').replace(year, '').trim();
        return `${minDatoStreng} - ${maxDatoStreng} ${year}.`;
    } else {
        const year = minDato.year();
        const month = minDato.format('MMMM');

        return `${minDato.date()}. - ${maxDato.date()}. ${month} ${year}.`;
    }
}
