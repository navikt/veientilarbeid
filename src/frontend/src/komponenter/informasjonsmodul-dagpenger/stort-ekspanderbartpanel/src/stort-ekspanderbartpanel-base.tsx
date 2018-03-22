import * as React from 'react';
import 'nav-frontend-ekspanderbartpanel-style'; // eslint-disable-line import/extensions
import StortEkspanderbartpanelBasePure from './stort-ekspanderbartpanel-base-pure';

export interface StortEkspanderbartpanelBaseProps {
    apen?: boolean;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    heading: React.ReactNode;
    ariaTittel: string;
}

export interface StortEkspanderbartpanelBaseState {
    apen: boolean;
}

class StortEkspanderbartpanelBase extends React.Component<StortEkspanderbartpanelBaseProps, StortEkspanderbartpanelBaseState> {
    static defaultProps: Partial<StortEkspanderbartpanelBaseProps> = {
        apen: false,
    };
    constructor(props: StortEkspanderbartpanelBaseProps) {
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
            <StortEkspanderbartpanelBasePure
                {...renderProps}
                apen={this.state.apen}
                onClick={this.handleClick}
            />
        );
    }
}

export default StortEkspanderbartpanelBase;
