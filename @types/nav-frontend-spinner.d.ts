declare module 'nav-frontend-spinner' {

    export type storrelseType = 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

    interface Spinner {
        negativ?: boolean;
        stroke?: boolean;
        type?: storrelseType;
        className?: string;
        ariaLabel?: string;
    }
    const t: new (props: Spinner) => React.Component<Spinner, {}>;
    export default t;
}
