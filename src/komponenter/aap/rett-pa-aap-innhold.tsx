import Parser from 'html-react-parser';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import tekster from '../../tekster/tekster';

const RettPaAapInnhold = () => {
    // TODO Dra ut html fra tekstfil (aap-rett-pa-relatertinnhold-innhold) - kan fjerne react-html-parser
    return (
        <div className="panel-innhold rett-pa-aap-innhold">
            <div className="hovedinnhold">
                <Normaltekst className="blokk-s">{tekster['aap-rett-pa-undertittel-ingress']}</Normaltekst>
                <Normaltekst tag="div" className="sjekkboks-liste">
                    {Parser(tekster['aap-rett-pa-innhold'])}
                </Normaltekst>
            </div>
            <div className="relatert-innhold-boks">
                <div className="relatert-innhold panel">
                    <Element tag="h2">{tekster['aap-rett-pa-relatertinnhold-tittel']}</Element>
                </div>
                <Normaltekst tag="div" className="relatert-innhold-lenkeliste">
                    {Parser(tekster['aap-rett-pa-relatertinnhold-innhold'])}
                </Normaltekst>
            </div>
        </div>
    );
};

export default RettPaAapInnhold;
