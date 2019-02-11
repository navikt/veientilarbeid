declare module 'nav-frontend-lenkepanel' {
    import * as React from 'react';

    export interface ElementProps {
        tittelProps?: string;
        href: string;
        children?: {};
        className?: string;
    }

    export default class Lenkepanel extends React.Component<ElementProps, {}> {}
}