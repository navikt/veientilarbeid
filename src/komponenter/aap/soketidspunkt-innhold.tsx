import * as React from 'react';
import Parser from 'html-react-parser';
import tekster from '../../tekster/tekster';

const SoketidspunktInnhold = () => {

    // TODO Dra ut html fra tekstfil (aap-rad-soketidspunkt-innhold)
    return (
        <div className="panel-innhold">
            {Parser(tekster['aap-rad-soketidspunkt-innhold'])}
        </div>
    );
};

export default SoketidspunktInnhold;
