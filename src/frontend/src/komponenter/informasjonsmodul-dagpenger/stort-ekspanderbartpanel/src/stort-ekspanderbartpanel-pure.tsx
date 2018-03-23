import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import StortEkspanderbartpanelBasePure from './stort-ekspanderbartpanel-base-pure';
import {Figur} from "./index";


export interface StortEkspanderbartpanelPureProps {
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    undertekst: string;
    figur?: Figur;
    apen: boolean;
}

class StortEkspanderbartpanelPure extends React.PureComponent<StortEkspanderbartpanelPureProps> {
    render() {
        const { tittel, undertekst, figur, ...renderProps } = this.props;
        //const heading = <Typografi type={'element'} tag="span" className="ekspanderbartPanel__heading">{tittel}</Typografi>;
        const figurComponent = figur ? (
            <div className="figur__wrapper">
                <img src={require(`./${figur}.svg`)} className="figur"/>
            </div>
        ) : (null);

        const heading = (
            <React.Fragment>
                {figurComponent}
                <div className="stortEkspanderbartPanel__heading-wrapper">
                    <Systemtittel tag="span" className="stortEkspanderbartPanel__heading">
                        {tittel}
                    </Systemtittel>
                    <div className="stortEkspanderbartPanel__underheading-wrapper">
                        <Normaltekst tag="div" className="stortEkspanderbartPanel__heading">
                            {undertekst}
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
