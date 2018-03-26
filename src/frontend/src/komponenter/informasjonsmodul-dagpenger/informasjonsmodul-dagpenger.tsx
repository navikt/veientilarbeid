import * as React from 'react';
import StortEkspanderbartpanel from './stort-ekspanderbartpanel/src';
import {injectIntl, InjectedIntlProps} from 'react-intl';
import EkspanderbartpanelGruppe from "./ekspanderbartpanel-gruppe/ekspanderbartpanel-gruppe";
import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel';
import {Ingress} from "nav-frontend-typografi";


interface DummyProp {
    dummy?: string; //TypeScript klager hvis props kun er InjectedIntlProps
}
type Props = DummyProp & InjectedIntlProps

class InformasjonsmodulDagpenger extends React.Component<Props> {
    render() {
        const intl = this.props.intl;
        const fellesEkspanderbartpanelProps = {
            tittelProps: "element",
            onClick: () => {},
            apen: false
        };
        return (
            <React.Fragment>
                <div className="test-test"/>
                <StortEkspanderbartpanel
                    tittel={intl.messages['informasjonsmodul-dagpenger-tittel']}
                    undertekst={intl.messages['informasjonsmodul-dagpenger-undertekst']}
                    figur="utklippstavle"
                    onClick={() => {}}
                    apen={true}
                >
                    <Ingress>
                    Dagpenger er en delvis erstatning for tapt arbeidsinntekt når du mister jobben.
                    </Ingress>
                    <EkspanderbartpanelGruppe>
                        <EkspanderbartpanelPure
                            tittel={intl.messages['informasjonsmodul-dagpenger-del-1-tittel']}
                            {...fellesEkspanderbartpanelProps}
                        >
                            {intl.messages['informasjonsmodul-dagpenger-del-1-tekst']}
                        </EkspanderbartpanelPure>
                        <EkspanderbartpanelPure
                            tittel={intl.messages['informasjonsmodul-dagpenger-del-2-tittel']}
                            {...fellesEkspanderbartpanelProps}
                        >
                            {intl.messages['informasjonsmodul-dagpenger-del-2-tekst']}
                        </EkspanderbartpanelPure>
                        <EkspanderbartpanelPure
                            tittel={intl.messages['informasjonsmodul-dagpenger-del-2-tittel']}
                            {...fellesEkspanderbartpanelProps}
                        >
                            {intl.messages['informasjonsmodul-dagpenger-del-3-tekst']}
                        </EkspanderbartpanelPure>
                    </EkspanderbartpanelGruppe>
                </StortEkspanderbartpanel>
            </React.Fragment>
        );
    }
}

export default injectIntl(InformasjonsmodulDagpenger);