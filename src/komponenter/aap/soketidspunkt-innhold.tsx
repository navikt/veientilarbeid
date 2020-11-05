import * as React from 'react';
import Parser from 'html-react-parser';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';

const SoketidspunktInnhold = () => {
    // TODO Dra ut html fra tekstfil (aap-rad-soketidspunkt-innhold) - kan fjerne react-html-parser
    return (
        <div className="panel-innhold">
            <div className="hovedinnhold">{Parser(tekster['aap-rad-soketidspunkt-innhold'])}</div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Element tag="h2">{tekster['aap-rad-soketidspunkt-relatertinnhold-tittel']}</Element>
                </div>
                <Normaltekst tag="div" className="relatert-innhold-lenkeliste">
                    {Parser(tekster['aap-rad-soketidspunkt-relatertinnhold-innhold'])}
                </Normaltekst>
            </div>
        </div>
    );
};

export default SoketidspunktInnhold;
