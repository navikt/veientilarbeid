import * as moment from 'moment';
import { Moment } from 'moment';

const DATOFORMAT_NORGE: string = 'DD.MM.YYYY';

export const momentAsISO = (dato: Date): Moment => {
    return moment(dato, DATOFORMAT_NORGE, true).startOf('day');
};

export const ISODateTilInputDatostring = (dato: Moment): string => {
    return dato && dato.isValid() ? dato.format(DATOFORMAT_NORGE) : '';
};

export const inputDatostringTilISODate = (dato: string): Moment => {
    return moment(dato, DATOFORMAT_NORGE, true);
};

export const erGyldigFormattertDato = (formattertDato: string): boolean => {
    return !!(
        formattertDato &&
        formattertDato.length === 10 &&
        moment(formattertDato, DATOFORMAT_NORGE, true).isValid()
    );
};

export const momentIDag = (): Moment => {
    return moment(new Date()).startOf('day');
};
