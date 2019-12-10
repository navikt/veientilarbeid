import React from 'react';

function getMndNavn (mnd:number) {
  const navn = [
    'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli',
    'august', 'september', 'oktober', 'november', 'desember'
  ]

  return navn[mnd]
}

function formaterDato (datostreng: string) {
  const dato = new Date(datostreng)
  return `${dato.getDay()}. ${getMndNavn(dato.getMonth())} ${dato.getFullYear()}`
}

const opplysninger = (props: any) => {
  const { opprettetDato, manueltRegistrertAv, besvarelse } = props;
  return (
    <>
      <div className="blokk-s">
        Opplysningene {manueltRegistrertAv ? 'NAV': 'du'} registrerte {formaterDato(opprettetDato)}
      </div>
      <div className="blokk-s">  
        Hva er din høyeste fullførte utdanning?<br />
        <strong>{ besvarelse.utdanning && besvarelse.utdanning !== 'INGEN_UTDANNING' ?  besvarelse.utdanning : 'Ingen utdanning' }</strong>
      </div>
      <div className="blokk-s">
        Velg den situasjonen som passer deg best:<br />
        <strong>{ besvarelse.dinSituasjon ? besvarelse.dinSituasjon : 'Ingen svar' }</strong>
      </div>
      <div className="blokk-s">
        Har du helseproblemer som hindrer deg i å søke eller være i jobb?<br />
        <strong>{ besvarelse.helseHinder ? besvarelse.helseHinder : 'Ingen svar' }</strong>
      </div>
      <div className="blokk-s">
        Har du andre problemer med å søke eller være i jobb?<br/>
        <strong>{ besvarelse.tilbakeIArbeid ? besvarelse.tilbakeIArbeid : 'Ingen svar' }</strong>
      </div>
      <div className="blokk-s">
        Din siste stilling:<br />
        <strong>{ besvarelse.sisteStilling ? besvarelse.sisteStilling : 'Ingen svar' }</strong>
      </div>
    </>
  )
};

export default opplysninger;