import * as React from 'react';

interface Props {
    indexOfOpenEkspanderbartpanel?: number;
}

interface State {
    indexOfOpenEkspanderbartpanel: number;
}

const NO_PANEL = -1;

export default class EkspanderbartpanelGruppe extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const indexFromProps = props.indexOfOpenEkspanderbartpanel;
        this.state = {
            indexOfOpenEkspanderbartpanel: (indexFromProps !== undefined) ? indexFromProps : NO_PANEL
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.indexOfOpenEkspanderbartpanel !== undefined) {
            this.setState({
                indexOfOpenEkspanderbartpanel: nextProps.indexOfOpenEkspanderbartpanel
            });
        }
    }

    render() {
        const childrenWithModifiedOnClickAndApenProps = React.Children.map(this.props.children, (child, index) => {
            const childAsElement = child as React.ReactElement<any>;
            return React.cloneElement(childAsElement, {
                onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => {
                    childAsElement.props.onClick(event);
                    if (this.state.indexOfOpenEkspanderbartpanel !== index) {
                        this.setState({indexOfOpenEkspanderbartpanel: index});
                    } else {
                        this.setState({indexOfOpenEkspanderbartpanel: NO_PANEL});
                    }
                },
                apen: index === this.state.indexOfOpenEkspanderbartpanel
            });
        });

        return (
            <div className="ekspanderbartPanelGruppe__wrapper">
                {childrenWithModifiedOnClickAndApenProps}
            </div>
        );
    }
}