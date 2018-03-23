import * as React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import StortEkspanderbartpanel from './stort-ekspanderbartpanel/src';
import {injectIntl, InjectedIntlProps} from 'react-intl';

interface DummyProp {
    dummy?: string; //TypeScript klager hvis props kun er InjectedIntlProps
}
type Props = DummyProp & InjectedIntlProps

/*
TODO
Skal kunne configge farge
Teksten skal få understrek og forbli hvit ved :hover
Flytt chevron til venstre slik at den passer med underpanelene
 */

class InformasjonsmodulDagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        return (
            <React.Fragment>
                <div className="test-test"/>
                <StortEkspanderbartpanel
                    tittel={intl.messages['informasjonsmodul-dagpenger-tittel']}
                    undertekst={intl.messages['informasjonsmodul-dagpenger-undertekst']}
                    figur="utklippstavle"
                    onClick={() => {
                    }}
                >
                    panel
                    <Ekspanderbartpanel
                        tittel="Slik ser et panel ut"
                        tittelProps="element"
                        onClick={() => {
                        }}
                    >
                        panel inni panel
                    </Ekspanderbartpanel>
                </StortEkspanderbartpanel>
            </React.Fragment>
        );
    }
}

export default injectIntl(InformasjonsmodulDagpenger);