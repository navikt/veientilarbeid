import { BodyShort, Label } from '@navikt/ds-react';
import Parser from 'html-react-parser';
import tekster from '../../tekster/tekster';

const RettPaAapInnhold = () => {
    // TODO Dra ut html fra tekstfil (aap-rett-pa-relatertinnhold-innhold) - kan fjerne react-html-parser
    return (
        <div className="panel-innhold rett-pa-aap-innhold">
            <div className="hovedinnhold">
                <BodyShort className="blokk-s">{tekster['aap-rett-pa-undertittel-ingress']}</BodyShort>
                <div className="sjekkboks-liste">{Parser(tekster['aap-rett-pa-innhold'])}</div>
            </div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Label>{tekster['aap-rett-pa-relatertinnhold-tittel']}</Label>
                </div>
                <div className="relatert-innhold-lenkeliste">
                    {Parser(tekster['aap-rett-pa-relatertinnhold-innhold'])}
                </div>
            </div>
        </div>
    );
};

export default RettPaAapInnhold;
