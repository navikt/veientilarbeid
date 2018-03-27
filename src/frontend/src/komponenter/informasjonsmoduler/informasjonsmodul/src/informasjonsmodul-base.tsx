import * as React from 'react';
import 'nav-frontend-ekspanderbartpanel-style'; // eslint-disable-line import/extensions
import InformasjonsmodulBasePure from './informasjonsmodul-base-pure';

export interface InformasjonsmodulBaseProps {
    apen?: boolean;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    heading: React.ReactNode;
    ariaTittel: string;
}

export interface InformasjonsmodulBaseState {
    apen: boolean;
}

class InformasjonsmodulBase extends
    React.Component<InformasjonsmodulBaseProps, InformasjonsmodulBaseState> {
    static defaultProps: Partial<InformasjonsmodulBaseProps> = {
        apen: false,
    };
    constructor(props: InformasjonsmodulBaseProps) {
        super(props);

        this.state = {
            apen: this.props.apen!
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: React.SyntheticEvent<HTMLButtonElement>) {
        event.preventDefault();
        this.setState({ apen: !this.state.apen });
        this.props.onClick(event);
    }

    render() {
        const { ...renderProps } = this.props;
        return (
            <InformasjonsmodulBasePure
                {...renderProps}
                apen={this.state.apen}
                onClick={this.handleClick}
            />
        );
    }
}

export default InformasjonsmodulBase;
