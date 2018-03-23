import * as React from 'react';
import { Collapse, CollapseProps } from 'react-collapse';

export interface StortEkspanderbartpanelBasePureProps {
    heading: React.ReactNode;
    className?: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    ariaTittel: string;
    apen: boolean;
    children?: React.ReactNode;
    collapseProps?: Partial<CollapseProps>;
}

const cls = (props: StortEkspanderbartpanelBasePureProps, className?: string) => {
    return className + ' ' + (props.apen ? 'stortEkspanderbartPanel--apen' : 'stortEkspanderbartPanel--lukket');
};

class StortEkspanderbartpanelBasePure extends React.Component<StortEkspanderbartpanelBasePureProps, {}> {
    private isCloseAnimation: boolean = false;

    componentWillReceiveProps(nextProps: StortEkspanderbartpanelBasePureProps) {
        if (this.props.apen && !nextProps.apen) {
            this.isCloseAnimation = true;
        }
    }
    onRestProxy = () => {
        this.isCloseAnimation = false;

        const { collapseProps } = this.props;
        if (collapseProps && collapseProps.onRest) {
            collapseProps.onRest();
        }
    };

    tabHandler(event: React.KeyboardEvent<EventTarget>) {
        const { keyCode } = event;
        const isTab = keyCode === 9;

        if (isTab && this.isCloseAnimation) {
            event.preventDefault();
        }
    }

    render() {
        const {
            className,
            children,
            apen,
            heading,
            ariaTittel,
            onClick,
            collapseProps,
            ...renderProps
        }: StortEkspanderbartpanelBasePureProps = this.props;

        return (
            <div className={cls(this.props, className)} { ...renderProps }>
                <button
                    className="stortEkspanderbartPanel__hode"
                    onKeyDown={this.tabHandler}
                    onClick={onClick}
                    aria-expanded={apen}
                >
                    <div className="stortEkspanderbartPanel__flex-wrapper">
                        {heading}
                    </div>
                </button>
                <Collapse isOpened={apen} onRest={this.onRestProxy} {...collapseProps} >
                    <article aria-label={ariaTittel} className="stortEkspanderbartPanel__innhold">{children}</article>
                </Collapse>
            </div>
        );
    }
}

export default StortEkspanderbartpanelBasePure;
