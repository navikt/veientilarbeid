import React from 'react';
import { AmplitudeAktivitetsData } from '../metrics/amplitude-utils';

export const initialState: AmplitudeAktivitetsData = {
  gruppe: 'boo',
  geografiskTilknytning:'INGEN_VERDI',
  isKSSX: 'nei',
  isKSSK: 'nei',
  ukerRegistrert: 0
}

export const AmplitudeAktivitetContext = React.createContext<AmplitudeAktivitetsData>(initialState);
