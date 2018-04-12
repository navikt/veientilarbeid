declare module 'nav-frontend-paneler' {
    import * as React from 'react';

    export interface ElementProps {
        children?: {};
        className?: string;
    }

    export class Panel extends React.Component<ElementProps, {}> {}
}