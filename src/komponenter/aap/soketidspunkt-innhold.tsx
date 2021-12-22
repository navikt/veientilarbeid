import { Label } from '@navikt/ds-react';
import Parser from 'html-react-parser';
import tekster from '../../tekster/tekster';

const SoketidspunktInnhold = () => {
    // TODO Dra ut html fra tekstfil (aap-rad-soketidspunkt-innhold) - kan fjerne react-html-parser
    return (
        <div className="panel-innhold">
            <div className="hovedinnhold">{Parser(tekster['aap-rad-soketidspunkt-innhold'])}</div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Label>{tekster['aap-rad-soketidspunkt-relatertinnhold-tittel']}</Label>
                </div>
                <div className="relatert-innhold-lenkeliste">
                    {Parser(tekster['aap-rad-soketidspunkt-relatertinnhold-innhold'])}
                </div>
            </div>
        </div>
    );
};

export default SoketidspunktInnhold;
