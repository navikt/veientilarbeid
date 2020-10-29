import React from 'react';
import { AmplitudeAktivitetsData } from '../metrics/amplitude-utils';

export const initialState: AmplitudeAktivitetsData = {
  gruppe: 'boo',
  geografiskTilknytning:'',
  isKSSX: '',
  isKSSK: '',
  ukerRegistrert: 0
}

export const AmplitudeAktivitetContext = React.createContext<AmplitudeAktivitetsData>(initialState);
