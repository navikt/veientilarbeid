declare module 'nav-frontend-alertstriper' {
    import * as React from 'react';

    export type AlertstripeType = 'suksess' | 'info' | 'advarsel' | 'nav-ansatt';

    export interface ElementProps {
        children: React.ReactNode;
        size?: number | string;
        className?: string;
    }

    export class AlertStripeAdvarselSolid  extends React.Component<ElementProps, {}> {}
    export class AlertStripeAdvarsel  extends React.Component<ElementProps, {}> {}
    export class AlertStripeSuksessSolid  extends React.Component<ElementProps, {}> {}
    export class AlertStripeSuksess  extends React.Component<ElementProps, {}> {}
    export class AlertStripeInfoSolid  extends React.Component<ElementProps, {}> {}
    export class AlertStripeInfo  extends React.Component<ElementProps, {}> {}
    export class AlertStripeNavAnsatt  extends React.Component<ElementProps, {}> {}
}