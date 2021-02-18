import { Data as BrukerregistreringsData, selectForeslattInnsatsgruppe } from '../ducks/brukerregistrering'
import { Data as OppfolgingsData } from '../ducks/oppfolging'

interface DataGrunnlag {
  registrering: BrukerregistreringsData;
  oppfolging: OppfolgingsData
}

function erStandardInnsatsgruppe ( data: DataGrunnlag): boolean {
  const { registrering, oppfolging } = data
  const foreslattInnsatsgruppe = selectForeslattInnsatsgruppe(registrering)
  const { servicegruppe, formidlingsgruppe } = oppfolging 
  let erStandard = false
  if (servicegruppe === 'IVURD' && formidlingsgruppe === 'ARBS' && foreslattInnsatsgruppe === 'STANDARD_INNSATS') {
    erStandard = true
  }
  if (servicegruppe === 'IKVAL' && formidlingsgruppe === 'ARBS') {
    erStandard = true
  }
  return erStandard
}

export default erStandardInnsatsgruppe
