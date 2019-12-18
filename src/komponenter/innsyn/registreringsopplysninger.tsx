import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { klikkPaEndreDineOpplysninger } from '../../metrics/metrics';
import { dialogLenke } from '../../innhold/lenker';
import { Besvarelse, Svar } from '../../ducks/brukerregistrering';
import './registreringsopplysninger.less';

function getMndNavn (mnd:number) {
  const navn = [
    'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli',
    'august', 'september', 'oktober', 'november', 'desember'
  ];

  return navn[mnd];
};

function formaterDato (datostreng: string) {
  const dato = new Date(datostreng);
  return `${dato.getDay()}. ${getMndNavn(dato.getMonth())} ${dato.getFullYear()}`;
}

const Opplysning = (props: any) => {
  const { sporsmal, svar } = props;
  return (
    <div className="blokk-s">
        <Normaltekst>
          { sporsmal }<br />
          <strong>{ svar }</strong>
        </Normaltekst>
      </div>
  );
};

const repackBesvarelser = (besvarelse: Besvarelse, teksterForBesvarelse: Array<Svar>) => {
  const tekster = teksterForBesvarelse || [];
  const besvarelserMedInnhold = Object.keys(besvarelse).filter(item => besvarelse[item]);
  const alleSvar = besvarelserMedInnhold.map(item => tekster.find(svar => svar.sporsmalId === item));
  const svarMedInnhold = alleSvar.filter(svar => svar !== undefined);
  return svarMedInnhold;
};

const opplysninger = (props: any) => {
  const { opprettetDato, manueltRegistrertAv, besvarelse, metrikkData, teksterForBesvarelse } = props;
  const besvarelser = repackBesvarelser(besvarelse, teksterForBesvarelse);
  const handleDialogClick = () => {
    klikkPaEndreDineOpplysninger(metrikkData);
  };

  return (
    <>
      <div className="blokk-s">
          <Normaltekst>
            {manueltRegistrertAv ? 'NAV': 'Du'} registrerte deg som arbeidssøker {formaterDato(opprettetDato)}.<br/>
            Du kan endre opplysningene du ga ved å kontakte NAV.<br/>
            Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.<br/>
            <a href={dialogLenke} onClick={ handleDialogClick }>Gi beskjed til veilederen din</a> hvis situasjonen din endrer seg.
          </Normaltekst>         
      </div>
      { besvarelser.map((item, index ) => <Opplysning {...item} key={index} />) }
    </>
  )
};

export default opplysninger;