import * as React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Html from '../../../komponenter/html';

const RettPaAapInnhold: React.SFC<InjectedIntlProps> = (props?: InjectedIntlProps) => {

    const { messages } = props!.intl;

    const tekster = {
        innhold: messages['aap-rett-pa-innhold'],
        relatertTittel: messages['aap-rett-pa-relatertinnhold-tittel'],
        relatertInnhold: messages['aap-rett-pa-relatertinnhold-innhold'],
        rettTilAapIngress: messages['aap-rett-pa-undertittel-ingress'],
    };

    return (
        <div className="panel-innhold rett-pa-aap-innhold">
            <div className="hovedinnhold">
                <Normaltekst className="blokk-s">
                    {tekster.rettTilAapIngress}
                </Normaltekst>
                <div className="sjekkboks-liste">
                    <Normaltekst>
                        <Html html={tekster.innhold}/>
                    </Normaltekst>
                </div>
            </div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Element tag="h2">
                        {tekster.relatertTittel}
                    </Element>
                </div>
                <Normaltekst className="relatert-innhold-lenkeliste">
                   <Html html={tekster.relatertInnhold}/>
                </Normaltekst>
            </div>
        </div>
    );
};

export default injectIntl(RettPaAapInnhold);
