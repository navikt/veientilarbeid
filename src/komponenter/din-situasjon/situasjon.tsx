import React, { useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import { SituasjonContext } from '../../ducks/situasjon';
import getSituasjon from './get-situasjon'
import prettyPrintDato from '../../utils/pretty-print-dato'
import './situasjon.less'

const Situasjon = () => {
  const brukerregistreringData = useContext(BrukerregistreringContext).data;
  const situasjonData = useContext(SituasjonContext).data;
  const { registrering } = brukerregistreringData;
  const { besvarelse, opprettetDato } = registrering;
  const { dinSituasjon } = besvarelse;
  const dinSituasjonOrIngenVerdi = dinSituasjon ? dinSituasjon : 'INGEN_VERDI';
  const situasjonsbeskrivelse = situasjonData !== null ? situasjonData.svarTekst : getSituasjon(dinSituasjonOrIngenVerdi)
  const endretDato = situasjonData !== null ? situasjonData.oprettet : opprettetDato
  const situasjonEndreUrl = '/arbeid/situasjon'
  
  return (
    <Panel border className="ramme blokk-s">
      <Undertittel>
        Din situasjon
      </Undertittel>
      <Normaltekst>
        { situasjonsbeskrivelse }
      </Normaltekst>
      <Normaltekst>
        Oppdatert: { prettyPrintDato(endretDato) } <Lenke href={situasjonEndreUrl}>Oppdater din situasjon</Lenke>
      </Normaltekst>
    </Panel>
  );
};

export default Situasjon;
