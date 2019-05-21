import * as React from 'react';
import Parser from 'html-react-parser';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Element, Normaltekst } from 'nav-frontend-typografi';

const RettPaAapInnhold: React.FunctionComponent<InjectedIntlProps> = (props?: InjectedIntlProps) => {

    const {messages} = props!.intl;

    // TODO Dra ut html fra tekstfil (aap-rett-pa-relatertinnhold-innhold)
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
                <Normaltekst tag="div" className="sjekkboks-liste">
                    {Parser(tekster.innhold)}
                </Normaltekst>
            </div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Element tag="h2">
                        {tekster.relatertTittel}
                    </Element>
                </div>
                <Normaltekst tag="div" className="relatert-innhold-lenkeliste">
                    {Parser(tekster.relatertInnhold)}
                </Normaltekst>
            </div>
        </div>
    );
};

export default injectIntl(RettPaAapInnhold);
