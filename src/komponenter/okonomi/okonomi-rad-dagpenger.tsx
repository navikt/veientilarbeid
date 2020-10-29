import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Rad from '../../innhold/rad';
import Dagpenger from '../dagpenger/dagpenger';
import AlleSkjema from '../alleskjema/alleskjema';
import SjekkKontonummer from '../paminnelser/sjekk-kontonummer'
import TrekkDagpengeSoknad from '../meldinger/trekk-dp-soknad'
import tekster from '../../tekster/tekster';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const okonomiRadDagpenger = (props: AmplitudeAktivitetsProps) => {
  const { amplitudeAktivitetsData } = props;

  return (
    <Rad>
      <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
        {tekster['dagpenger-heading-tekst']}
      </Systemtittel>
      <div className="tokol">
        <Dagpenger />
        <AlleSkjema amplitudeAktivitetsData={amplitudeAktivitetsData} />
      </div>
      <div className="tokol">
        <SjekkKontonummer amplitudeAktivitetsData={amplitudeAktivitetsData} />
        <TrekkDagpengeSoknad amplitudeAktivitetsData={amplitudeAktivitetsData} />
      </div>
    </Rad>
  )
}

export default okonomiRadDagpenger;