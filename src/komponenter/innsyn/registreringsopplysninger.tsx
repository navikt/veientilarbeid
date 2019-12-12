import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { klikkPaDineOpplysninger } from '../../metrics/metrics'
import { dialogLenke } from '../../innhold/lenker';
import './registreringsopplysninger.less'

function getMndNavn (mnd:number) {
  const navn = [
    'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli',
    'august', 'september', 'oktober', 'november', 'desember'
  ]

  return navn[mnd]
}

function getUtdannelse (valg: string) {
  const utdannelse = {
    'INGEN_UTDANNING': 'Ingen utdanning',
    'GRUNNSKOLE': 'Grunnskole',
    'VIDEREGAENDE_GRUNNUTDANNING': 'Videregående grunnutdanning (1 til 2 år)',
    'VIDEREGAENDE_FAGBREV_SVENNEBREV': 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
    'HOYERE_UTDANNING_1_TIL_4': 'Høyere utdanning (1 til 4 år)',
    'HOYERE_UTDANNING_5_ELLER_MER': 'Høyere utdanning (5 år eller mer)',
    'INGEN_SVAR': 'Ingen svar',
  }
  return utdannelse[valg] || 'Ukjent svar'
}

function getSituasjon (valg: string) {
  const situasjoner = {
    'MISTET_JOBBEN': 'Har mistet eller kommer til å miste jobben',
    'ALDRI_HATT_JOBB': 'Har aldri vært i jobb',
    'HAR_SAGT_OPP': 'Har sagt opp eller kommer til å si opp',
    'VIL_BYTTE_JOBB': 'Har jobb, men vil bytte',
    'ER_PERMITTERT': 'Er permittert eller kommer til å bli permittert',
    'USIKKER_JOBBSITUASJON': 'Er usikker på jobbsituasjonen min',
    'JOBB_OVER_2_AAR': 'Har ikke vært i jobb de siste 2 årene',
    'VIL_FORTSETTE_I_JOBB': 'Har jobb og ønsker å fortsette i den jobben jeg er i',
    'AKKURAT_FULLFORT_UTDANNING': 'Har akkurat fullført utdanning, militærtjeneste eller annet',
    'DELTIDSJOBB_VIL_MER': 'Har deltidsjobb, men vil jobbe mer',
    'INGEN_SVAR': 'Ingen svar',
  }
  return situasjoner[valg] || 'Ukjent svar'
}

function getFremtidigSituasjon (valg: string) {
  const situasjoner = {
    'SAMME_ARBEIDSGIVER': 'Jeg skal tilbake til jobben jeg har',
    'SAMME_ARBEIDSGIVER_NY_STILLING': 'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
    'USIKKER': 'Jeg er usikker',
    'NY_ARBEIDSGIVER': 'Jeg trenger ny jobb',
    'INGEN_PASSER': 'Ingen av disse alternativene passer',
    'INGEN_SVAR': 'Ingen svar'
  }
  return situasjoner[valg] || 'Ukjent svar'
}

function getTilbakeIArbeid (valg: string) {
  const alternativer = {
    'JA_FULL_STILLING': 'Ja, i full stilling',
    'JA_REDUSERT_STILLING': 'Ja, i redusert stilling',
    'NEI': 'Nei',
    'USIKKER': 'Usikker'
  }
  return alternativer[valg] || 'Ukjent svar'
}

function formaterDato (datostreng: string) {
  const dato = new Date(datostreng)
  return `${dato.getDay()}. ${getMndNavn(dato.getMonth())} ${dato.getFullYear()}`
}

function formaterSvar (svar: string) {
  svar = svar.toLowerCase().split('_').join(' ')
  return `${svar.substring(0,1).toUpperCase()}${svar.substring(1)}`
}

const opplysninger = (props: any) => {
  const { opprettetDato, manueltRegistrertAv, besvarelse, metrikkData } = props;
  const { utdanning, dinSituasjon, helseHinder,
          andreForhold, sisteStilling, fremtidigSituasjon, tilbakeIArbeid } = besvarelse;
  const handleDialogClick = () => {
    klikkPaDineOpplysninger(metrikkData)
  }

  return (
    <>
      <div className="blokk-s">
          <Normaltekst>
            {manueltRegistrertAv ? 'NAV': 'Du'} registrerte deg som arbeidssøker {formaterDato(opprettetDato)}.<br/>
            Du kan endre opplysningene du ga (se under) ved å kontakte NAV.<br/>
            Veilederen din bruker opplysningene for å vurdere hvor mye veiledning du trenger.<br/>
            <a href={dialogLenke} onClick={ handleDialogClick }>Gi beskjed til veilederen din</a> hvis situasjonen din endrer seg.
          </Normaltekst>         
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Hva er din høyeste fullførte utdanning?<br />
          <strong>{ utdanning ? getUtdannelse(utdanning) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Velg den situasjonen som passer deg best:<br />
          <strong>{ dinSituasjon ? getSituasjon(dinSituasjon) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Har du helseproblemer som hindrer deg i å søke eller være i jobb?<br />
          <strong>{ helseHinder ? formaterSvar(helseHinder) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Har du andre problemer med å søke eller være i jobb?<br/>
          <strong>{ andreForhold ? formaterSvar(andreForhold) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Din siste stilling:<br />
          <strong>{ sisteStilling ? sisteStilling : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Hva tenker du om din fremtidige situasjon?<br />
          <strong>{ fremtidigSituasjon ? getFremtidigSituasjon(fremtidigSituasjon) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
      <div className="blokk-s">
        <Normaltekst>
          Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?<br />
          <strong>{ tilbakeIArbeid ? getTilbakeIArbeid(tilbakeIArbeid) : 'Ingen svar' }</strong>
        </Normaltekst>
      </div>
    </>
  )
};

export default opplysninger;