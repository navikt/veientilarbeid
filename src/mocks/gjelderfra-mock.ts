function hentGjelderFraDato() {
    const fallbackDato = '2022-06-30';
    try {
        const gjelderFraDato = new URLSearchParams(window.location.search).get('gjelderFraDato');
        return gjelderFraDato || fallbackDato;
    } catch (error) {
        console.error(error);
        return fallbackDato;
    }
}

const gjelderFraGetResponse = {
    dato: hentGjelderFraDato(),
};

export default gjelderFraGetResponse;
