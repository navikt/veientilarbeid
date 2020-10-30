const url = window && window.location && window.location.href ? window.location.href : '';

export const erProduksjon = () => {
    return url.indexOf('www.nav.no/person/dittnav') > -1;
};
