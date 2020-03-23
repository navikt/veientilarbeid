import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Rad from '../../innhold/rad';
import Dagpenger from '../dagpenger/dagpenger';
import AlleSkjema from '../alleskjema/alleskjema';
import SjekkKontonummer from '../paminnelser/sjekk-kontonummer'
import tekster from '../../tekster/tekster';

const okonomiRadDagpenger = () => {
  return (
    <Rad>
      <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
        {tekster['dagpenger-heading-tekst']}
      </Systemtittel>
      <div className="tokol">
        <Dagpenger/>
        <AlleSkjema/>
      </div>
      <div className="tokol">
        <SjekkKontonummer />
      </div>
    </Rad>
  )
}

export default okonomiRadDagpenger