
const isMeldekortbruker = (nesteMeldekort: any,
                          nesteInnsendingAvMeldekort: any,
                          antallGjenstaaendeFeriedager: any,
                          etterregistrerteMeldekort: any,
                          meldekort: any) => {
    if (nesteMeldekort || nesteInnsendingAvMeldekort) return true
    if (antallGjenstaaendeFeriedager > 0 || etterregistrerteMeldekort > 0) return true
    if (meldekort > 0) return true
    return false
}

export default isMeldekortbruker
