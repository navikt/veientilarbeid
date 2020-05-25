import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import Rad from '../../innhold/rad';
import Dagpenger from '../dagpenger/dagpenger';
import AlleSkjema from '../alleskjema/alleskjema';
import SjekkKontonummer from '../paminnelser/sjekk-kontonummer'
import TrekkDagpengeSoknad from '../meldinger/trekk-dp-soknad'
import tekster from '../../tekster/tekster';
import { POAGruppe } from '../../utils/get-poa-group';

interface OwnProps {
    poaGruppe: POAGruppe;
}

const okonomiRadDagpenger = (props: OwnProps) => {
  const { poaGruppe } = props;

  return (
    <Rad>
      <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
        {tekster['dagpenger-heading-tekst']}
      </Systemtittel>
      <div className="tokol">
        <Dagpenger poaGruppe={poaGruppe} />
        <AlleSkjema poaGruppe={poaGruppe} />
      </div>
      <div className="tokol">
        <SjekkKontonummer poaGruppe={poaGruppe} />
        <TrekkDagpengeSoknad />
      </div>
    </Rad>
  )
}

export default okonomiRadDagpenger