import * as React from 'react';
import 'nav-frontend-ekspanderbartpanel-style';
import InformasjonsmodulPure from './informasjonsmodul-pure';

/**
 * Self-contained 'Informasjonsmodul'.
 * Denne komponenten holder selv styr på om innholdet skal vises eller ikke.
 */

export type Figur = 'utklippstavle' | 'brev';

export interface InformasjonsmodulProps {
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

export interface InformasjonsmodulState {
    apen: boolean;
}

class Informasjonsmodul extends React.Component<InformasjonsmodulProps, InformasjonsmodulState> {
    static defaultProps: Partial<InformasjonsmodulProps> = {
        apen: false,
    };
    constructor(props: InformasjonsmodulProps) {
        super(props);

        this.state = {
            apen: this.props.apen!
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.SyntheticEvent<HTMLButtonElement>): void {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        const {tittel, undertekst, figur, ...renderProps } = this.props;
        return (
            <InformasjonsmodulPure
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

export default Informasjonsmodul;
export { default as StortEkspanderbartpanelPure } from './informasjonsmodul-pure';
export { default as StortEkspanderbartpanelBase } from './informasjonsmodul-base';
export { default as StortEkspanderbartpanelBasePure } from './informasjonsmodul-base-pure';
