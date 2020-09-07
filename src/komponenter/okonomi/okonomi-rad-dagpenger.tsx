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
    isKSSX: string;
}

const okonomiRadDagpenger = (props: OwnProps) => {
  const { poaGruppe, geografiskTilknytning, isKSSX } = props;

  return (
    <Rad>
      <Systemtittel tag="h2" className="dagpenger__heading blokk-s">
        {tekster['dagpenger-heading-tekst']}
      </Systemtittel>
      <div className="tokol">
        <Dagpenger poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
        <AlleSkjema poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
      </div>
      <div className="tokol">
        <SjekkKontonummer poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
        <TrekkDagpengeSoknad poaGruppe={poaGruppe} geografiskTilknytning={geografiskTilknytning} isKSSX={isKSSX} />
      </div>
    </Rad>
  )
}

export default okonomiRadDagpenger;