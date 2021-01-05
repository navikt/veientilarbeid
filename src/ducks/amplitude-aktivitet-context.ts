import React from 'react';
import { AmplitudeAktivitetsData } from '../metrics/amplitude-utils';
import { InnloggingsNiva } from '../ducks/autentisering';

export const initialState: AmplitudeAktivitetsData = {
    gruppe: 'boo',
    geografiskTilknytning: 'INGEN_VERDI',
    isKSSX: 'nei',
    isKSSK: 'nei',
    ukerRegistrert: 0,
    nivaa: InnloggingsNiva.LEVEL_3,
    kanReaktiveres: 'nei',
    formidlingsgruppe: 'INGEN_VERDI',
    servicegruppe: 'IVURD'
};

export const AmplitudeAktivitetContext = React.createContext<AmplitudeAktivitetsData>(initialState);
