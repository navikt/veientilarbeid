import * as React from 'react';
import {Element, Systemtittel} from 'nav-frontend-typografi';
import StortEkspanderbartpanelBasePure from './stort-ekspanderbartpanel-base-pure';

export interface StortEkspanderbartpanelPureProps {
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    tittelProps?: string;
    apen: boolean;
}

class StortEkspanderbartpanelPure extends React.PureComponent<StortEkspanderbartpanelPureProps> {
    static defaultProps: Partial<StortEkspanderbartpanelPureProps> = {
        tittelProps: 'undertittel',
    };

    render() {
        const { tittel, tittelProps, ...renderProps } = this.props;
        //const heading = <Typografi type={'element'} tag="span" className="ekspanderbartPanel__heading">{tittel}</Typografi>;
        const heading = (
            <React.Fragment>
                <Systemtittel tag="span">
                    Informasjon om dagpenger
                </Systemtittel>
                <Element tag="span" className="stortEkspanderbartPanel__heading">
                    Les mer om dagpenger og når du må søke
                </Element>
            </React.Fragment>
        );

        return (
            <StortEkspanderbartpanelBasePure {...renderProps} heading={heading} ariaTittel={tittel} />
        );
    }
}

export default StortEkspanderbartpanelPure;
