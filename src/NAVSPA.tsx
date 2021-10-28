import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface NAVSPAScope {
    [name: string]: NAVSPAApp;
}

type NAVSPAApp = (element: HTMLElement, props: any) => void;

export default class NAVSPA {
    public static eksporter(name: string, component: React.ComponentType) {
        NAVSPA.scope[name] = (element: HTMLElement) => {
            ReactDOM.render(React.createElement(component), element);
        };
    }

    private static scope: NAVSPAScope = ((global as any)['NAVSPA'] = (global as any)['NAVSPA'] || {});
}
