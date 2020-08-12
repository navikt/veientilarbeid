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
    geografiskTilknytning: string;
}

const okonomiRadDagpenger = (props: OwnProps) => {
  const { poaGruppe, geografiskTilknytning } = props;

  return (
    <Rad>
      <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
        {tekster['dagpenger-heading-tekst']}
      </Systemtittel>
      <div className="tokol">
        <Dagpenger poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} />
        <AlleSkjema poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} />
      </div>
      <div className="tokol">
        <SjekkKontonummer poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} />
        <TrekkDagpengeSoknad poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} />
      </div>
    </Rad>
  )
}

export default okonomiRadDagpenger;