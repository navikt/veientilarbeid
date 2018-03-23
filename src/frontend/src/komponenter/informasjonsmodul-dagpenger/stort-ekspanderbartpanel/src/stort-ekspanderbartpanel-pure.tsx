import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import StortEkspanderbartpanelBasePure from './stort-ekspanderbartpanel-base-pure';
const utklippstavleSvg = require('./utklippstavle.svg');


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
                <div className="figur__wrapper">
                    <img src={utklippstavleSvg} className="figur"/>
                </div>
                <div className="stortEkspanderbartPanel__heading-wrapper">
                    <Systemtittel tag="span" className="stortEkspanderbartPanel__heading">
                        Informasjon om dagpenger
                    </Systemtittel>
                    <div className="stortEkspanderbartPanel__underheading-wrapper">
                        <Normaltekst tag="div" className="stortEkspanderbartPanel__heading">
                            Les mer om dagpenger og når du må søke
                        </Normaltekst>
                        <div>
                            <span className="stortEkspanderbartPanel__indikator" />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

        return (
            <StortEkspanderbartpanelBasePure {...renderProps} heading={heading} ariaTittel={tittel} />
        );
    }
}

export default StortEkspanderbartpanelPure;
