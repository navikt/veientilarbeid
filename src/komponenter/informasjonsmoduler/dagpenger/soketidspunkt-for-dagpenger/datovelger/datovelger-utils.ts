import * as moment from 'moment';

const DATOFORMAT = 'DD.MM.YYYY';

export const ISODateToDatePicker = (dato: string | Date): string => {
    const parsetDato = moment(dato);
    return dato && parsetDato.isValid() ? parsetDato.format(DATOFORMAT) : '';
};

export const erGyldigISODato = (isoDato: string): boolean => {
    return !!(isoDato && moment(isoDato, moment.ISO_8601).isValid());
};

export const erGyldigFormattertDato = (formattertDato: string): boolean => {
    return !!(
        formattertDato &&
        formattertDato.length === 10 &&
        moment(formattertDato, 'DD.MM.YYYY', true).isValid()
    );
};