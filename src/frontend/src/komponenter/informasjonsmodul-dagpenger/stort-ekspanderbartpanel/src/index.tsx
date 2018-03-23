import * as React from 'react';
import 'nav-frontend-ekspanderbartpanel-style';
import EkspanderbartpanelPure from './stort-ekspanderbartpanel-pure';

/**
 * Self-contained 'StortEkspanderbartpanel'.
 * Denne komponenten holder selv styr på om innholdet skal vises eller ikke.
 */

export type Figur = 'utklippstavle' | 'brev';

export interface StortEkspanderbartpanelProps {
    /**
     * Skal komponenten være 'default' åpen
     */
    apen?: boolean;
    /**
     * Callback funksjon for når knappen blir klikket på
     */
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    undertekst: string;
    figur?: Figur;
}

export interface StortEkspanderbartpanelState {
    apen: boolean;
}

class StortEkspanderbartpanel extends React.Component<StortEkspanderbartpanelProps, StortEkspanderbartpanelState> {
    static defaultProps: Partial<StortEkspanderbartpanelProps> = {
        apen: false,
    };
    constructor(props: StortEkspanderbartpanelProps) {
        super(props);

        this.state = {
            apen: this.props.apen!
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.SyntheticEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        if(this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        const {tittel, undertekst, figur, ...renderProps } = this.props;
        return (
            <EkspanderbartpanelPure
                {...renderProps}
                apen={this.state.apen}
                onClick={this.handleClick}
                tittel={tittel}
                undertekst={undertekst}
                figur={figur}
            />
        );
    }
}

export default StortEkspanderbartpanel;
export { default as StortEkspanderbartpanelPure } from './stort-ekspanderbartpanel-pure';
export { default as StortEkspanderbartpanelBase } from './stort-ekspanderbartpanel-base';
export { default as StortEkspanderbartpanelBasePure } from './stort-ekspanderbartpanel-base-pure';
