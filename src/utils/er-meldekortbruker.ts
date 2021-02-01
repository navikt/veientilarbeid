const isMeldekortbruker = ({
    nesteMeldekort,
    nesteInnsendingAvMeldekort,
    antallGjenstaaendeFeriedager,
    etterregistrerteMeldekort,
    meldekort,
}: any) => {
    if (nesteMeldekort || nesteInnsendingAvMeldekort) return true;
    if (antallGjenstaaendeFeriedager > 0 || etterregistrerteMeldekort > 0) return true;
    if (meldekort > 0) return true;
    return false;
};

export default isMeldekortbruker;
