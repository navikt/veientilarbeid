export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/');
}

export const erMikrofrontend = () => process.env.REACT_APP_MICRO === 'true';

const url = window && window.location && window.location.href ? window.location.href : '';

export const erProduksjon = () => {
    return url.indexOf('www.nav.no/minside') > -1;
};
