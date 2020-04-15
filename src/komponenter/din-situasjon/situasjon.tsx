import React, { useContext } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { BrukerregistreringContext } from '../../ducks/brukerregistrering';
import getSituasjon from './get-situasjon'
import prettyPrintDato from '../../utils/pretty-print-dato'
import './situasjon.less'

const Situasjon = () => {
  const brukerregistreringData = useContext(BrukerregistreringContext).data;
  const { registrering } = brukerregistreringData;
  const { besvarelse, opprettetDato } = registrering;
  const { dinSituasjon } = besvarelse;
  const dinSituasjonOrIngenVerdi = dinSituasjon ? dinSituasjon : 'INGEN_VERDI';
  const situasjonsbeskrivelse = getSituasjon(dinSituasjonOrIngenVerdi)
  const situasjonEndreUrl = dinSituasjonOrIngenVerdi === 'ER_PERMITTERT' ? '/arbeid/situasjon' : '/dialog'
  
  return (
    <Panel border className="ramme blokk-s">
      <Undertittel>
        Din situasjon
      </Undertittel>
      <Normaltekst>
        { situasjonsbeskrivelse }
      </Normaltekst>
      <Normaltekst>
        Oppdatert: { prettyPrintDato(opprettetDato) } <Lenke href={situasjonEndreUrl}>Oppdater din situasjon</Lenke>
      </Normaltekst>
    </Panel>
  );
};

export default Situasjon;
