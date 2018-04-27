import * as React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import InformasjonsmodulBasePure from './informasjonsmodul-base-pure';
import { Figur } from './index';

export interface InformasjonsmodulPureProps {
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    undertekst: string;
    figur?: Figur;
    apen: boolean;
}

class InformasjonsmodulPure extends React.PureComponent<InformasjonsmodulPureProps> {
    render() {
        const { tittel, undertekst, figur, ...renderProps } = this.props;
        const figurComponent = figur ? (
            <div className="informasjonsmodul__figur-wrapper">
                <img src={require(`./${figur}.svg`)} alt="informasjonsmodul-illustrasjon" className="figur"/>
            </div>
        ) : (null);

        const heading = (
            <>
                {figurComponent}
                <div className="informasjonsmodul__heading-wrapper">
                    <Systemtittel tag="h2" className="informasjonsmodul__heading blokk-s">
                        {tittel}
                    </Systemtittel>
                    <div className="informasjonsmodul__underheading-wrapper">
                        <Normaltekst className="informasjonsmodul__heading">
                            {undertekst}
                        </Normaltekst>
                        <div>
                            <span className="informasjonsmodul__indikator" />
                        </div>
                    </div>
                </div>
            </>
        );

        return (
            <InformasjonsmodulBasePure {...renderProps} heading={heading} ariaTittel={tittel} />
        );
    }
}

export default InformasjonsmodulPure;
