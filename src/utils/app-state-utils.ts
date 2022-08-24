export function erDemo(): boolean {
    const path: string = window.location.pathname;
    return path.includes('/demo/index.html');
}

export const erMikrofrontend = () => process.env.REACT_APP_MICRO === 'true';

export const erMock = () => process.env.REACT_APP_MOCK;

const url = window && window.location && window.location.href ? window.location.href : '';

export const erProduksjon = () => {
    return url.indexOf('www.nav.no/minside') > -1;
};

export const erStandalone = () => /[&?]standalone=true/.test(url);
