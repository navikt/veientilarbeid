import * as React from 'react';
import { EkspanderbartpanelPureProps } from '../../../../@types/ekspanderbartpanel-pure';
import { InformasjonsmodulPureProps } from '../informasjonsmodul/src/informasjonsmodul-pure';

interface Props {
    indexOfOpenEkspanderbartpanel?: number;
    children: React.ReactElement<EkspanderbartpanelPureProps | InformasjonsmodulPureProps>[];
}

interface State {
    indexOfOpenEkspanderbartpanel: number;
}

const ALL_PANELS_CLOSED = -1;

export default class EkspanderbartpanelGruppe extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        const indexFromProps = props.indexOfOpenEkspanderbartpanel;
        this.state = {
            indexOfOpenEkspanderbartpanel: (indexFromProps !== undefined) ? indexFromProps : ALL_PANELS_CLOSED
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
            // tslint:disable-next-line
            const childAsElement = child as React.ReactElement<EkspanderbartpanelPureProps | InformasjonsmodulPureProps>;
            return React.cloneElement(childAsElement, {
                onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => {
                    childAsElement.props.onClick(event);
                    if (this.state.indexOfOpenEkspanderbartpanel !== index) {
                        this.setState({indexOfOpenEkspanderbartpanel: index});
                    } else {
                        this.setState({indexOfOpenEkspanderbartpanel: ALL_PANELS_CLOSED});
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