export function hentQueryParam(key: string): string | null {
    return new URLSearchParams(window.location.search).get(key);
}

export function harQueryParam(key: string): boolean {
    return new URLSearchParams(window.location.search).has(key);
}

export function settQueryParam(key: string, value: string, lastSidePaaNytt: boolean = false): void {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    oppdaterUrl(params, lastSidePaaNytt);
}

export function fjernQueryParam(key: string, lastSidePaaNytt: boolean = false) {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    oppdaterUrl(params, lastSidePaaNytt);
}

function oppdaterUrl(params: URLSearchParams, lastSidePaaNytt: boolean = false) {
    window.history.replaceState(null, document.title, window.location.pathname + '?' + params.toString());
    if (lastSidePaaNytt) {
        window.location.reload();
    }
}
