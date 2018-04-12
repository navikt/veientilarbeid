import * as React from 'react';
import { Collapse, CollapseProps } from 'react-collapse';

export interface InformasjonsmodulBasePureProps {
    heading: React.ReactNode;
    className?: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    ariaTittel: string;
    apen: boolean;
    children?: React.ReactNode;
    collapseProps?: Partial<CollapseProps>;
}

const cls = (props: InformasjonsmodulBasePureProps, className?: string) => {
    return (className ? className + ' ' : '') + (props.apen ? 'informasjonsmodul--apen' : 'informasjonsmodul--lukket');
};

class InformasjonsmodulBasePure extends React.Component<InformasjonsmodulBasePureProps, {}> {
    private isCloseAnimation: boolean = false;

    componentWillReceiveProps(nextProps: InformasjonsmodulBasePureProps) {
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
    }

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
        }: InformasjonsmodulBasePureProps = this.props;

        return (
            <div className={cls(this.props, className)}{...renderProps}>
                <button
                    className="informasjonsmodul__hode"
                    onKeyDown={event => this.tabHandler(event)}
                    onClick={onClick}
                    aria-expanded={apen}
                >
                    <div className="informasjonsmodul">
                        {heading}
                    </div>
                </button>
                <Collapse isOpened={apen} onRest={this.onRestProxy} {...collapseProps} >
                    <article aria-label={ariaTittel} className="informasjonsmodul__innhold">{children}</article>
                </Collapse>
            </div>
        );
    }
}

export default InformasjonsmodulBasePure;
